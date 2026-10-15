/* ============================================================================
   MATCHROOM engine — ONE recommender for the whole app + the GUARDRAILS.
   Mirrors VIBES LAB Music Director `lib/recommend.ts` (the redesign page uses the same engine):

     brief + slot            →  target    "what this posting slot should feel like"
     roster                  →  filter    hard rules: brand rules · banned tags · brand said "not this" ·
                                          Director said no · over the per-post cap
     each creator vs target  →  7 part-scores, each 0–1, weighted 3/2/2/2/2/1/1 → total 0–1
     ranked list             →  rerank    ≤2 per agency, no same agency back-to-back, keep the brand's Thai share

   ONE engine — every place that picks creators calls rankFor():
     Studio → Recommend tab · Studio → shortlist "AI build" · Studio → AI drafts a day / the week
     · Pool variants (softer / bolder) · Guardrails demo.
   The "AI" never invents a creator: it can only rank ids that exist in ROSTER, and every reason
   is built from a roster field. Brands never see a score — only "แนะนำ" + a plain reason.
   ============================================================================ */
(function () {
  const R = () => window.ROSTER;
  const byId = (id) => R().find((c) => c.id === id) || null;
  const fmtK = (n) => (n >= 1e6 ? (n / 1e6).toFixed(1) + "M" : n >= 1e3 ? Math.round(n / 1e3) + "K" : String(n));
  const baht = (n) => "฿" + Math.round(n).toLocaleString("en-US");
  const clamp = (x, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, x));
  const uniq = (a) => a.filter((x, i) => a.indexOf(x) === i);
  // language for every string the engine writes (reasons, cautions, rules) — the app calls setLang (MD: L(th, en))
  let LANG = "th";
  const L = (th, en) => (LANG === "en" ? en : th);
  const setLang = (l) => (LANG = l === "en" ? "en" : "th");
  const cap = (s) => String(s).charAt(0).toUpperCase() + String(s).slice(1);

  // ---- time / dates -------------------------------------------------------------
  const toMin = (s) => { const [h, m] = s.split(":").map(Number); return h * 60 + m; };
  const fromMin = (n) => { n = ((Math.round(n) % 1440) + 1440) % 1440; return String(Math.floor(n / 60)).padStart(2, "0") + ":" + String(n % 60).padStart(2, "0"); };
  const span = (a, b) => { const d = (toMin(b) - toMin(a) + 1440) % 1440; return d === 0 ? 1440 : d; };
  const dateKey = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const slotAt = (slots, d) => { const now = d.getHours() * 60 + d.getMinutes(); return slots.find((s) => (now - toMin(s.start) + 1440) % 1440 < span(s.start, s.end)) || null; };

  // ---- brief parsing (offline lexicon; a real LLM would return the same hint shape) ----
  function parseBrief(text) {
    const t = " " + String(text || "").toLowerCase() + " ";
    return Object.keys(window.LEXICON).filter((tag) => window.LEXICON[tag].some((w) => t.includes(w.toLowerCase())));
  }
  /** Brief → target hint: tags, an energy nudge and an ER range if typed (MD: targetFromBrief). */
  function targetFromBrief(text) {
    const p = " " + String(text || "").toLowerCase() + " ";
    const hint = { tags: parseBrief(text) };
    if (/(soft|calm|chill|slow|นุ่ม|ละมุน|สบาย|ชิล|ช้า|เงียบ|ซอฟต์)/.test(p)) hint.energy = 2;
    if (/(hype|bold|energetic|party|loud|ปัง|มันส์|คึก|สนุก|ปาร์ตี้|ฮาร์ดเซล)/.test(p)) hint.energy = 4;
    const er = p.match(/er\s*(\d{1,2}(?:\.\d)?)\s*[-–]\s*(\d{1,2}(?:\.\d)?)/);
    if (er) { hint.erMin = Number(er[1]); hint.erMax = Number(er[2]); }
    return hint;
  }

  // ---- brand rules (machine-checkable) --------------------------------------------
  /** Returns null if the creator may work with the brand, else the rule it breaks. */
  function ruleBreak(c, brand) {
    const r = brand.rules || {};
    if (r.noAlcohol && c.alcohol) return L("แบรนด์ห้ามคอนเทนต์แอลกอฮอล์ (creator.alcohol = true)", "No alcohol content for this brand (creator.alcohol = true)");
    if (r.familySafe && !c.familySafe) return L("แบรนด์ต้องการ family-safe (creator.familySafe = false)", "Brand needs family-safe creators (creator.familySafe = false)");
    if (r.adultOnly && c.tags.includes("family")) return L("แบรนด์ 20+ ห้ามครีเอเตอร์สายครอบครัว (tag: family)", "20+ brand: no family creators (tag: family)");
    if (r.conflict && c.exclusive === r.conflict) return L(`ติดสัญญา exclusive หมวด ${r.conflict}`, `Under an exclusive ${r.conflict} contract`);
    if (brand.minFemale && c.female < brand.minFemale) return L(`ผู้ชมผู้หญิง ${c.female}% < เกณฑ์ ${brand.minFemale}%`, `Female audience ${c.female}% < required ${brand.minFemale}%`);
    if (c.er < (brand.minER || 0)) return L(`ER ${c.er}% ต่ำกว่าเกณฑ์แบรนด์ ${brand.minER}%`, `ER ${c.er}% is below the brand minimum ${brand.minER}%`);
    return null;
  }

  // ---- target -------------------------------------------------------------------------
  /** Slot vibe → energy + content tags (MD: MOOD_TARGET). */
  const VIBE = {
    calm: { energy: 1.6, tags: ["wellness", "lifestyle"], th: "สงบ ละมุน", en: "Calm" },
    cozy: { energy: 2.2, tags: ["cafe", "lifestyle", "pet"], th: "อบอุ่น เป็นกันเอง", en: "Cozy" },
    fresh: { energy: 3, tags: ["food", "local", "lifestyle"], th: "สดใส", en: "Fresh" },
    stylish: { energy: 2.8, tags: ["fashion", "luxury", "beauty"], th: "มีสไตล์", en: "Stylish" },
    lively: { energy: 3.8, tags: ["food", "nightlife", "music"], th: "คึกคัก", en: "Lively" },
    hype: { energy: 4.4, tags: ["nightlife", "music", "fitness"], th: "ปังเต็มที่", en: "Hype" },
  };
  /** Daypart → one content tag (MD: DAYPART_TAG). */
  const DAYPART_TAG = { morning: "cafe", afternoon: "food", evening: "lifestyle", night: "nightlife" };
  const daypartAt = (hhmm) => { const h = Number(hhmm.split(":")[0]); return h >= 5 && h < 12 ? "morning" : h >= 12 && h < 18 ? "afternoon" : h >= 18 && h < 22 ? "evening" : "night"; };
  /** ER range when a slot doesn't set one (MD: BPM from the mood). */
  const STAGE_ER = { awareness: [3, 6], consideration: [4, 8], conversion: [5, 10], loyalty: [6, 12] };

  /** Pool variants: the same slot, a little softer or bolder (MD: Soft / Lift playlists). */
  const POOL = { normal: 0, soft: -1, lift: 1 };

  function buildTarget(slot, brand, hint = {}) {
    const v = VIBE[slot.vibe] || VIBE.fresh;
    const m = String(slot.er || "").match(/(\d{1,2}(?:\.\d)?)\D+(\d{1,2}(?:\.\d)?)/);
    const [sMin, sMax] = m ? [Number(m[1]), Number(m[2])] : STAGE_ER[slot.stage] || STAGE_ER.consideration;
    const daypart = daypartAt(slot.start);
    const tagged = [
      ...(hint.tags || []).map((tag) => ({ tag, from: "brief" })),
      ...v.tags.map((tag) => ({ tag, from: "slot" })),
      { tag: DAYPART_TAG[daypart], from: "daypart" },
      ...brand.tags.map((tag) => ({ tag, from: "brand" })),
    ];
    const tags = tagged.filter((x, i) => tagged.findIndex((y) => y.tag === x.tag) === i).slice(0, 5);
    const energyBase = hint.energy != null ? hint.energy : v.energy;
    const shift = POOL[slot.pool || "normal"] || 0;
    return {
      target: { erMin: hint.erMin != null ? hint.erMin : Math.max(sMin, brand.minER || 0), erMax: hint.erMax != null ? hint.erMax : sMax, energy: Math.round(clamp(energyBase + shift, 1, 5) * 10) / 10, tags: tags.map((x) => x.tag), daypart },
      trace: { tags, energyBase, energyFrom: hint.energy != null ? "brief" : "slot", poolShift: shift, erFrom: hint.erMin != null ? "brief" : m ? "slot" : "stage" },
    };
  }
  const targetFor = (slot, brand, hint) => buildTarget(slot, brand, hint).target;
  const traceTarget = (slot, brand, hint) => buildTarget(slot, brand, hint).trace;

  /** Target learned from an existing shortlist ("more like this"; MD: targetFromTracks). */
  function targetFromList(ids, daypart) {
    const cs = ids.map(byId).filter(Boolean);
    if (!cs.length) return null;
    const ers = cs.map((c) => c.er).sort((a, b) => a - b);
    const q = (f) => ers[Math.min(ers.length - 1, Math.round(f * (ers.length - 1)))];
    const freq = new Map();
    for (const c of cs) for (const t of c.tags) freq.set(t, (freq.get(t) || 0) + 1);
    const top = [...freq.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([t]) => t);
    return { erMin: Math.max(0, q(0.25) - 1), erMax: q(0.75) + 1, energy: Math.round((cs.reduce((s, c) => s + c.energy, 0) / cs.length) * 10) / 10, tags: top.slice(0, 5), daypart: daypart || "afternoon" };
  }

  // ---- scoring ------------------------------------------------------------------------
  const PARTS = ["fit", "energy", "er", "signature", "history", "lang", "trend"];
  /** Starting weights — same as Music Director (mood 3 · energy 2 · bpm 2 · scent 2 · history 2 · lang 1 · trend 1). */
  const DEFAULT_WEIGHTS = { fit: 3, energy: 2, er: 2, signature: 2, history: 2, lang: 1, trend: 1 };
  const PART_TH = { fit: "แนวคอนเทนต์", energy: "โทน/พลังงาน", er: "ER อยู่ในเป้า", signature: "ลายเซ็นแบรนด์", history: "ชอบ/ไม่เอา", lang: "ภาษา", trend: "กระแส" };

  function percentiles(val) {
    const arr = R().map((c) => ({ id: c.id, v: val(c) })).sort((a, b) => a.v - b.v);
    const out = new Map();
    arr.forEach((x, i) => out.set(x.id, arr.length > 1 ? i / (arr.length - 1) : 0.5));
    return out;
  }
  function trendParts(c, fPct, erPct) {
    const viral = clamp(0.5 + Math.log2(c.growth || 1) / 4); // ×1 → 0.5, ×2 → 0.75, ×4 → 1
    return { reach: fPct, er: erPct, viral, score: 0.5 * fPct + 0.2 * erPct + 0.3 * viral };
  }

  /**
   * The engine itself: filter → score → rerank against any target.
   * o = { weights, trend, feedback: {id: Director likes − dislikes}, blocked: [ids the brand said "not this"],
   *       n, maxRate, platforms, avoid }
   */
  function rankFor(target, brand, o = {}) {
    const weights = o.weights || DEFAULT_WEIGHTS, feedback = o.feedback || {}, blocked = o.blocked || [], avoid = o.avoid || [], recent = o.recent || [];
    // 1) hard filter
    const excluded = [];
    const pool = R().filter((c) => {
      if (avoid.includes(c.id)) return false;
      const rb = ruleBreak(c, brand);
      if (rb) return excluded.push({ c, reason: "rule", why: rb }), false;
      const bad = c.tags.find((t) => (brand.banned || []).includes(t));
      if (bad) return excluded.push({ c, reason: "banned", why: L(`แท็กต้องห้ามของแบรนด์: ${tagName(bad)}`, `Tag the brand bans: ${tagName(bad)}`) }), false;
      if (blocked.includes(c.id)) return excluded.push({ c, reason: "brand", why: L("แบรนด์กด “ไม่เอาคนนี้” ไว้", "The brand pressed “Not this creator”") }), false;
      if ((feedback[c.id] || 0) <= -2) return excluded.push({ c, reason: "director", why: L("Director ไม่เอา (ติดลบ 2 ครั้ง)", "The Director said no (−2)") }), false;
      if (o.platforms && o.platforms.length && !o.platforms.includes(c.platform)) return excluded.push({ c, reason: "platform", why: L(`แพลตฟอร์ม ${c.platform} ไม่ได้เลือก`, `${c.platform} is not selected`) }), false;
      if (o.maxRate && c.rate > o.maxRate) return excluded.push({ c, reason: "budget", why: L(`เรต ${baht(c.rate)} เกินเพดานต่อโพสต์ ${baht(o.maxRate)}`, `Rate ${baht(c.rate)} is over the per-post cap ${baht(o.maxRate)}`) }), false;
      return true;
    });

    // 2) score
    const fPct = percentiles((c) => Math.log10(c.followers + 1));
    const erPct = percentiles((c) => c.er);
    const active = PARTS.filter((x) => (x === "trend" ? o.trend : true) && weights[x] > 0);
    const wSum = active.reduce((s, x) => s + weights[x], 0) || 1;
    const thai = brand.thaiShare != null ? brand.thaiShare : 0.5;
    const sig = (brand.signature && brand.signature.tags) || [];
    const ranked = pool.map((c) => {
      const hits = target.tags.filter((t) => c.tags.includes(t));
      const fitRaw = clamp(hits.length / Math.min(3, target.tags.length || 1));
      const conf = c.conf != null ? c.conf : 1;
      const dist = c.er < target.erMin ? target.erMin - c.er : 0; // ER is one-sided: higher than the target is fine (MD's BPM is two-sided)
      const langFit = c.lang === "th" ? thai : 1 - thai;
      const parts = {
        // tags are less certain than measured stats → shrink toward 0.5 by (1 − confidence)
        fit: conf * fitRaw + (1 - conf) * 0.5,
        energy: clamp(1 - Math.abs(c.energy - target.energy) / 4),
        er: clamp(1 - dist / 4),
        signature: sig.length ? clamp(sig.filter((t) => c.tags.includes(t)).length / Math.min(2, sig.length)) : 0.5,
        // liked before → up; posting in a nearby slot the same day → 0.25 (MD: a song playing ±2 h away)
        history: recent.includes(c.id) ? 0.25 : 0.5 + 0.5 * Math.tanh((feedback[c.id] || 0) / 3),
        lang: 0.5 + 0.5 * (langFit / Math.max(thai, 1 - thai)),
        trend: trendParts(c, fPct.get(c.id), erPct.get(c.id)).score,
      };
      let total = 0;
      const contrib = {};
      for (const x of PARTS) { const v = active.includes(x) ? (weights[x] * parts[x]) / wSum : 0; contrib[x] = v; total += v; }
      return { c, parts, total, contrib, hits };
    });
    ranked.sort((a, b) => b.total - a.total || a.c.id.localeCompare(b.c.id));

    // 3) rerank: ≤2 per agency (independents count alone), no same agency back-to-back, keep the Thai share
    const n = Math.min(o.n || 4, ranked.length);
    const thaiNeed = Math.round(n * thai);
    const picks = [];
    const agencyN = new Map();
    const rest = [...ranked];
    const agencyOf = (s) => (s.c.agency === "อิสระ" ? "solo:" + s.c.id : s.c.agency);
    while (picks.length < n && rest.length) {
      const thaiHave = picks.filter((s) => s.c.lang === "th").length;
      const mustThai = thaiNeed - thaiHave >= n - picks.length;
      const noMoreThai = thaiHave >= Math.max(thaiNeed, thai >= 0.5 ? n : thaiNeed);
      const prev = picks.length ? agencyOf(picks[picks.length - 1]) : null;
      const ok = (s, strict) => {
        const a = agencyOf(s);
        if ((agencyN.get(a) || 0) >= 2) return false;
        if (strict && a === prev) return false;
        if (mustThai && s.c.lang !== "th") return false;
        if (strict && noMoreThai && thai < 0.5 && s.c.lang === "th") return false;
        return true;
      };
      let i = rest.findIndex((s) => ok(s, true));
      if (i < 0) i = rest.findIndex((s) => ok(s, false));
      if (i < 0) i = 0;
      const [s] = rest.splice(i, 1);
      agencyN.set(agencyOf(s), (agencyN.get(agencyOf(s)) || 0) + 1);
      picks.push(s);
    }
    return { target, picks, ranked, excluded };
  }

  /** Rank for a posting slot (Program slot, Pool variant, or a bare daypart). */
  const recommend = (slot, brand, o, hint) => rankFor(targetFor(slot, brand, hint), brand, o);

  const TAG_TH = { cafe: "คาเฟ่", food: "อาหาร", lifestyle: "ไลฟ์สไตล์", wellness: "สุขภาพ", fitness: "ฟิตเนส", nightlife: "ไนท์ไลฟ์", music: "ดนตรี", luxury: "หรู", fashion: "แฟชั่น", beauty: "บิวตี้", travel: "ท่องเที่ยว", family: "ครอบครัว", local: "ท้องถิ่น", tech: "เทค", pet: "สัตว์เลี้ยง", art: "ศิลปะ" };
  const TAG_EN = { cafe: "café", food: "food", lifestyle: "lifestyle", wellness: "wellness", fitness: "fitness", nightlife: "nightlife", music: "music", luxury: "luxury", fashion: "fashion", beauty: "beauty", travel: "travel", family: "family", local: "local", tech: "tech", pet: "pets", art: "art" };
  /** Tag label in the current language (kept as tagTh for older callers). */
  const tagName = (t) => (LANG === "en" ? TAG_EN[t] : TAG_TH[t]) || t;
  const tagTh = tagName;
  const DP = { morning: ["เช้า", "morning"], afternoon: ["บ่าย", "afternoon"], evening: ["เย็น", "evening"], night: ["ค่ำ", "night"] };
  const dpName = (d) => (DP[d] ? L(DP[d][0], DP[d][1]) : "");
  const DP_TH = { morning: "เช้า", afternoon: "บ่าย", evening: "เย็น", night: "ค่ำ" };
  const energyWord = (e) => (e < 1.8 ? L("นุ่มมาก", "very soft") : e < 2.6 ? L("นุ่ม", "soft") : e < 3.4 ? L("กลาง ๆ", "medium") : e < 4.2 ? L("คึก", "lively") : L("ปังเต็มที่", "full hype"));
  const erWord = (t) => `ER ${t.erMin}–${t.erMax}%`;
  const vibeName = (k) => (VIBE[k] ? L(VIBE[k].th, VIBE[k].en) : k);
  const agencyName = (a) => (a === "อิสระ" ? L("อิสระ", "Independent") : a);

  /**
   * Plain reasons for a pick (MD: reasonOf) — the 2 strongest, built only from roster fields and the target.
   * `used` counts reasons already shown higher in the list, so the reasons vary down the list. No score is ever shown.
   */
  function reasonOf(s, target, brand, used = {}) {
    const c = s.c, sig = (brand && brand.signature) || { tags: [] }, out = [];
    if (s.hits.length) out.push(["fit", s.parts.fit, L("ตรงแนว ", "Fits ") + s.hits.slice(0, 2).map(tagName).join(" · ")]);
    if (s.parts.energy >= 0.8) out.push(["energy", s.parts.energy * 0.9, L(`โทน${energyWord(c.energy)} พอดีกับช่วง${dpName(target.daypart)}`, `${cap(energyWord(c.energy))} tone suits the ${dpName(target.daypart)}`)]);
    if (c.er >= target.erMin) out.push(["er", c.er > target.erMax ? 0.85 : 0.75, c.er > target.erMax ? L(`เอนเกจสูง ER ${c.er}%`, `High engagement, ER ${c.er}%`) : L(`ER ${c.er}% ถึงเป้า`, `ER ${c.er}% meets the target`)]);
    const sh = sig.tags.filter((t) => c.tags.includes(t));
    if (sh.length) out.push(["sig", 0.75 + sh.length * 0.1, L(`เข้ากับลายเซ็นแบรนด์ “${sig.name}”`, `Matches the brand signature “${sig.name}”`)]);
    if (s.parts.history > 0.7) out.push(["liked", 1.2, L("แบรนด์เคยกดชอบคนนี้", "The brand liked this creator")]);
    if (brand && brand.refs && brand.refs.includes(c.handle)) out.push(["ref", 1.05, L("อยู่ในรายชื่ออ้างอิงของแบรนด์", "On the brand's reference list")]);
    if ((c.growth || 1) >= 1.6 && s.contrib.trend > 0) out.push(["trend", 0.95, L(`กำลังโต ผู้ติดตาม ×${c.growth} ใน 30 วัน`, `Growing fast: followers ×${c.growth} in 30 days`)]);
    if (s.parts.history >= 0.5) out.push(["fresh", 0.5, L("ยังไม่ได้โพสต์ช่วงใกล้กันวันนี้", "Not posting near this slot today")]);
    if (s.parts.lang >= 0.99) out.push(["lang", 0.45, c.lang === "th" ? L("ช่วยคงสัดส่วนคอนเทนต์ไทย", "Keeps the share of Thai content") : L("ช่วยคงสัดส่วนคอนเทนต์อินเตอร์", "Keeps the share of English content")]);
    out.forEach((r) => (r[1] -= (used[r[0]] || 0) * 0.25));
    const top = out.sort((a, b) => b[1] - a[1]).slice(0, 2);
    top.forEach((r) => (used[r[0]] = (used[r[0]] || 0) + 1));
    return top.length ? top.map((r) => r[2]).join(" · ") : L("เข้ากับ VIBES ของแบรนด์โดยรวม", "Fits the brand's overall VIBES");
  }

  /** Plain caution for a weak fit (MD: cautionOf) — Studio only. */
  function cautionOf(c, target, brand) {
    const rb = ruleBreak(c, brand);
    if (rb) return L("ผิดกฎแบรนด์: ", "Breaks a brand rule: ") + rb;
    if ((brand.banned || []).some((t) => c.tags.includes(t))) return L("มีแท็กที่แบรนด์ห้าม", "Has a tag the brand bans");
    const d = c.energy - target.energy;
    if (d >= 1.5) return L("คึกไปสำหรับช่วงนี้", "Too lively for this slot");
    if (d <= -1.5) return L("นุ่มไปสำหรับช่วงนี้", "Too soft for this slot");
    if (c.er < target.erMin - 0.5) return L("ER ต่ำกว่าเป้าของช่วงนี้", "ER is below this slot's target");
    if (!c.tags.some((t) => target.tags.includes(t))) return L("แนวคอนเทนต์ไม่ตรงช่วงนี้", "Content doesn't fit this slot");
    return null;
  }

  /** Mean fit (0–100) of a set of creators against a result — Studio only, never shown to brands. */
  function fitScore(ids, res) {
    const by = new Map(res.ranked.map((r) => [r.c.id, r.total]));
    const vals = ids.map((id) => by.get(id)).filter((v) => v != null);
    return vals.length ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 100) : null;
  }

  // ---- rotation: who posts on a day ------------------------------------------------------
  /**
   * Creators in a slot's shortlist ROTATE day by day (MD: songs loop inside a slot, order reshuffled daily).
   * dn = day number (days since 1970, Bangkok calendar). Skips: unavailable that day · the brand said
   * "not this" · already posting in another slot today · posted for this brand in the last `gap` days
   * (MD rule "the same song is not repeated within 3 days" → a creator posts at most once per 3 days).
   * `recent` = Map(creatorId → last day number they posted for this brand). rotate=false → fixed order.
   */
  function poster(list, slotIdx, dn, opts = {}) {
    if (!list || !list.creatorIds.length) return null;
    const t = new Date(dn * 864e5);
    const dk = t.getUTCFullYear() + "-" + String(t.getUTCMonth() + 1).padStart(2, "0") + "-" + String(t.getUTCDate()).padStart(2, "0");
    const blocked = opts.blocked || [], recent = opts.recent || new Map(), gap = opts.gap || 3, used = opts.used || new Set();
    const ids = list.creatorIds.filter((id) => !blocked.includes(id));
    if (!ids.length) return null;
    const shift = opts.rotate === false ? 0 : dn + slotIdx;
    const ok = (c, strict) => c && !c.off.includes(dk) && !used.has(c.id) && (!strict || opts.rotate === false || !(recent.has(c.id) && dn - recent.get(c.id) < gap));
    for (const strict of [true, false]) {
      for (let i = 0; i < ids.length; i++) {
        const c = byId(ids[(shift + i) % ids.length]);
        if (ok(c, strict)) return { c, repeat: !strict };
      }
    }
    return null;
  }

  // ---- guardrails (treat any AI output as untrusted) -------------------------------------
  /**
   * Validate an AI reply (here: simulated raw LLM JSON) against the roster. Each claimed item: must exist,
   * quoted stats must equal the roster, must pass brand rules, and the running total must fit the budget.
   */
  function validateReply(reply, brand, budget) {
    const rows = [];
    let spent = 0;
    for (const item of reply.picks || []) {
      const c = R().find((x) => x.id === item.id || x.handle === item.handle);
      if (!c) { rows.push({ item, ok: false, why: L("ไม่มีครีเอเตอร์นี้ในฐานข้อมูล → AI แต่งขึ้นเอง (hallucination) — ตัดทิ้ง", "Not in the roster → the AI made it up (hallucination) — removed") }); continue; }
      const mism = [];
      if (item.followers != null && item.followers !== c.followers) mism.push(L(`followers อ้าง ${fmtK(item.followers)} แต่จริง ${fmtK(c.followers)}`, `followers claimed ${fmtK(item.followers)}, real ${fmtK(c.followers)}`));
      if (item.er != null && item.er !== c.er) mism.push(L(`ER อ้าง ${item.er}% แต่จริง ${c.er}%`, `ER claimed ${item.er}%, real ${c.er}%`));
      if (item.rate != null && item.rate !== c.rate) mism.push(L(`rate อ้าง ${baht(item.rate)} แต่จริง ${baht(c.rate)}`, `rate claimed ${baht(item.rate)}, real ${baht(c.rate)}`));
      const rb = ruleBreak(c, brand);
      if (rb) { rows.push({ item, c, ok: false, why: L(`ผิดกฎแบรนด์: ${rb} — ตัดทิ้ง`, `Breaks a brand rule: ${rb} — removed`) }); continue; }
      if (!c.tags.some((t) => brand.tags.includes(t))) { rows.push({ item, c, ok: false, why: L(`ไม่ตรงกลุ่มแบรนด์ (แท็ก ${c.tags.join(", ")} ไม่ตรงกับ ${brand.tags.join(", ")}) — ตัดทิ้ง`, `Off-brand (tags ${c.tags.join(", ")} don't match ${brand.tags.join(", ")}) — removed`) }); continue; }
      if (spent + c.rate > budget) { rows.push({ item, c, ok: false, why: L(`เกินงบ ${baht(budget)} — ตัดทิ้ง`, `Over the ${baht(budget)} budget — removed`) }); continue; }
      spent += c.rate;
      rows.push({ item, c, ok: true, fixed: mism, why: mism.length ? L("ผ่าน แต่ตัวเลขที่ AI อ้างผิด → ใช้ค่าจริงจากฐานข้อมูลแทน: ", "Passed, but the AI quoted wrong numbers → the roster values are used instead: ") + mism.join(" · ") : L("ผ่านทุกเงื่อนไข", "Passes every check") });
    }
    return { rows, spent };
  }

  /** A deliberately "bad" raw LLM reply used to demonstrate the guardrails. */
  function fakeLLMReply(brand) {
    const good = rankFor({ erMin: brand.minER || 0, erMax: 12, energy: 3, tags: brand.tags, daypart: "afternoon" }, brand, { n: 2 }).picks.map((p) => p.c);
    const breaker = R().find((c) => ruleBreak(c, brand));
    const fits = (c) => !ruleBreak(c, brand) && c.tags.some((t) => brand.tags.includes(t)) && !good.includes(c);
    const byRate = [...R()].filter(fits).sort((a, b) => b.rate - a.rate);
    const pricey = byRate[0], filler = byRate[1];
    const offTopic = R().find((c) => !ruleBreak(c, brand) && !c.tags.some((t) => brand.tags.includes(t)));
    return {
      model: "simulated-llm",
      picks: [
        good[0] && { id: good[0].id, handle: good[0].handle, followers: good[0].followers, er: good[0].er, note: L("ตัวเลขถูกต้อง", "numbers are right") },
        good[1] && { id: good[1].id, handle: good[1].handle, followers: Math.round(good[1].followers * 3.1), er: +(good[1].er + 4.2).toFixed(1), note: L("AI ปั้นยอดผู้ติดตาม/ER เกินจริง", "AI inflated followers / ER") },
        { id: "c99", handle: "@ghost.influencer", followers: 1250000, er: 12.5, rate: 9000, note: L("ครีเอเตอร์ที่ไม่มีอยู่จริง", "a creator who doesn't exist") },
        breaker && { id: breaker.id, handle: breaker.handle, note: L("ผิดกฎแบรนด์", "breaks a brand rule") },
        offTopic && { id: offTopic.id, handle: offTopic.handle, note: L("ไม่เกี่ยวกับแบรนด์เลย", "nothing to do with the brand") },
        pricey && { id: pricey.id, handle: pricey.handle, rate: pricey.rate, note: L("ราคาสูงสุดในกลุ่มที่ตรงแบรนด์", "the priciest on-brand creator") },
        filler && { id: filler.id, handle: filler.handle, rate: filler.rate, note: L("ใส่เพิ่มจนงบล้น", "added until the budget overflows") },
      ].filter(Boolean),
    };
  }

  window.ENGINE = {
    byId, fmtK, baht, clamp, uniq, toMin, fromMin, span, dateKey, slotAt, daypartAt,
    parseBrief, targetFromBrief, ruleBreak, VIBE, POOL, STAGE_ER, buildTarget, targetFor, traceTarget, targetFromList,
    PARTS, PART_TH, DEFAULT_WEIGHTS, trendParts, rankFor, recommend, reasonOf, cautionOf, fitScore, poster, validateReply, fakeLLMReply,
    TAG_TH, TAG_EN, tagTh, tagName, DP_TH, dpName, energyWord, erWord, vibeName, agencyName, setLang,
  };
})();
