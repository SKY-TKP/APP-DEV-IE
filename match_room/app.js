/* ============================================================================
   MATCHROOM — Influencer Director · redesign (mirrors VIBES LAB Music Director, CEO review V.5).
   Plain JS, no build, no network. Nothing is saved — a refresh resets the demo (same as MD),
   except the language choice (localStorage "mr-lang", like MD's "md-lang").

   Two sides (MD: shop ⇄ Studio):
     Brand side (3 tabs)  : วันนี้ · ตารางสัปดาห์ · บัญชี — the brand only watches; it can like, say "not this",
                            ask for a change and (Pool package) pick a tone per slot. It never picks creators.
     Studio (Director)    : คิวงาน · แบรนด์ · คลังครีเอเตอร์ · รายงาน (+ AI Guardrails, kept from the first mockup)
   Model: brand → branch (MD: zone) → day types × posting slots (open → close) → 1 slot = 1 shortlist id →
          creators rotate daily. Shortlists, package, status and feedback belong to the brand (all branches share them).
   Weekly cycle: ร่าง → รอ Director ตรวจ → เผยแพร่แล้ว; editing a published program needs approval again.
   ONE engine (engine.js) ranks creators everywhere; brands never see a score.
   Every string the user reads is L(thai, english) (MD: L). The first mockup is untouched in classic/.
   ============================================================================ */
(function () {
  const E = window.ENGINE;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pad = (n) => String(n).padStart(2, "0");
  const hh = (h) => (h === 24 ? "24:00" : pad(h % 24) + ":00");
  const hmm = (m) => (m >= 1440 ? "24:00" : pad(Math.floor(m / 60)) + ":" + pad(m % 60));
  const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9ก-๙]+/g, "-").replace(/^-|-$/g, "") || "list";
  const mod = (a, n) => ((a % n) + n) % n;

  /* ---------- language (MD: L / tx) ---------- */
  const store = { get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } } };
  let LANG = /(^|[#.&])en([.&]|$)/.test(location.hash) ? "en" : store.get("mr-lang") === "en" ? "en" : "th";
  const L = (th, en) => (LANG === "en" ? en : th);
  const tx = (v) => (Array.isArray(v) ? L(v[0], v[1]) : v ?? "");
  const DAY_ = [["จันทร์", "Monday"], ["อังคาร", "Tuesday"], ["พุธ", "Wednesday"], ["พฤหัสบดี", "Thursday"], ["ศุกร์", "Friday"], ["เสาร์", "Saturday"], ["อาทิตย์", "Sunday"]];
  const DS_ = [["จ.", "Mon"], ["อ.", "Tue"], ["พ.", "Wed"], ["พฤ.", "Thu"], ["ศ.", "Fri"], ["ส.", "Sat"], ["อา.", "Sun"]];
  const MON_ = [["ม.ค.", "Jan"], ["ก.พ.", "Feb"], ["มี.ค.", "Mar"], ["เม.ย.", "Apr"], ["พ.ค.", "May"], ["มิ.ย.", "Jun"], ["ก.ค.", "Jul"], ["ส.ค.", "Aug"], ["ก.ย.", "Sep"], ["ต.ค.", "Oct"], ["พ.ย.", "Nov"], ["ธ.ค.", "Dec"]];
  const DAY = (i) => tx(DAY_[i]), DS = (i) => tx(DS_[i]), MON = (i) => tx(MON_[i]);
  const YR = (y) => (LANG === "en" ? y : y + 543);
  const STAGE_ = Object.fromEntries(window.STAGES.map((s) => [s.id, [s.th, s.en]]));
  const stageName = (id) => tx(STAGE_[id] || id);
  const langSeg = () => `<div class="seg sm lang" role="group" aria-label="Language"><button class="${LANG === "th" ? "on" : ""}" data-act="lang" data-v="th">ไทย</button><button class="${LANG === "en" ? "on" : ""}" data-act="lang" data-v="en">EN</button></div>`;

  /* ---------- clock: real Bangkok time (MD: setNow) — pin with #t=2026-10-15T14:20 or window.MR_CLOCK ---------- */
  const CLK = { pin: null };
  const PIN = (() => {
    const m = location.hash.match(/t=(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)/) || String(window.MR_CLOCK || "").match(/(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)/);
    return m ? { dn: Date.UTC(+m[1], +m[2] - 1, +m[3]) / 864e5, min: +m[4] * 60 + +m[5] } : null;
  })();
  let NOW;
  function setNow() {
    let dn, min;
    if (PIN) { dn = PIN.dn; min = PIN.min; }
    else { const t = Date.now() + 7 * 36e5; dn = Math.floor(t / 864e5); min = Math.floor((t - dn * 864e5) / 6e4); }
    if (CLK.pin != null) min = CLK.pin;
    NOW = { dn, min, day: (new Date(dn * 864e5).getUTCDay() + 6) % 7 };
  }
  setNow();
  const WK = () => ({ this: NOW.dn - NOW.day, next: NOW.dn - NOW.day + 7 });
  const ymd = (dn) => { const t = new Date(dn * 864e5); return { y: t.getUTCFullYear(), m: t.getUTCMonth(), d: t.getUTCDate(), wd: (t.getUTCDay() + 6) % 7 }; };
  const dKey = (dn) => { const x = ymd(dn); return x.y + "-" + pad(x.m + 1) + "-" + pad(x.d); };
  const dLab = (dn) => { const x = ymd(dn); return `${DS(x.wd)} ${x.d} ${MON(x.m)}`; };
  /** A date label in both languages, for things stored now and read later in either language. */
  const dLab2 = (dn) => { const x = ymd(dn); return [`${DS_[x.wd][0]} ${x.d} ${MON_[x.m][0]}`, `${DS_[x.wd][1]} ${x.d} ${MON_[x.m][1]}`]; };
  const rangeLab = (dn0, year = true) => { const a = ymd(dn0), b = ymd(dn0 + 6), y = year ? " " + YR(b.y) : ""; return a.m === b.m ? `${a.d}–${b.d} ${MON(a.m)}${y}` : `${a.d} ${MON(a.m)} – ${b.d} ${MON(b.m)}${y}`; };
  const clockTxt = () => { const x = ymd(NOW.dn); return `${PIN || CLK.pin != null ? L("เวลาจำลอง", "Simulated time") : L("เวลาจริง", "Real time")}: ${DS(x.wd)} ${x.d} ${MON(x.m)} ${YR(x.y)} · ${hmm(NOW.min)} (${L("กรุงเทพ", "Bangkok")})`; };
  const daysLabel = (ds) => {
    const out = []; let i = 0;
    while (i < ds.length) { let j = i; while (j + 1 < ds.length && ds[j + 1] === ds[j] + 1) j++; out.push(j - i >= 2 ? DS(ds[i]) + "–" + DS(ds[j]) : ds.slice(i, j + 1).map((d) => DS(d)).join(", ")); i = j + 1; }
    return out.join(", ");
  };

  /* ---------- demo availability: three creators are booked on some days (relative to today) ---------- */
  E.byId("c03").off = [dKey(NOW.dn + 1), dKey(NOW.dn + 4)];
  E.byId("c07").off = [dKey(NOW.dn + 2)];
  E.byId("c11").off = [dKey(NOW.dn)];

  /* ---------- brands, branches (MD: zones) + holidays ---------- */
  const BR = Object.fromEntries(window.BRANDS.map((b) => [b.id, b]));
  const ORDER = window.BRANDS.map((b) => b.id);
  const brands = () => ORDER.map((id) => BR[id]);
  const zonesOf = (b) => b.zones || [["สาขาหลัก", "Main branch"]];
  /**
   * The brand as one branch sees it (MD: zoneView). A branch with its own program overrides hours, day types and
   * weeks and gets its own key for edits / rotation (ek); a branch without one shares the main program (sharedZone).
   */
  function zoneView(b, zi) {
    zi = zi > 0 && zi < zonesOf(b).length ? zi : 0;
    if (!zi) return b;
    const p = b.zoneProg && b.zoneProg[zi];
    if (!p) return Object.create(b, { zi: { value: zi }, sharedZone: { value: true } });
    return Object.create(b, { zi: { value: zi }, zkey: { value: b.id + "@" + zi }, open: { value: p.open }, close: { value: p.close }, types: { value: p.types }, week: { value: p.week }, nextWeek: { value: p.nextWeek }, relaxed: { value: p.relaxed }, special: { value: null } });
  }
  const ek = (b) => b.zkey || b.id;
  const zname = (b, zi) => tx(zonesOf(b)[zi ?? (b.zi || 0)]);
  const HOLI = window.HOLI.map((h) => ({ ...h, dn: Date.UTC(h.d[0], h.d[1] - 1, h.d[2]) / 864e5 }));
  const holOn = (dn) => HOLI.find((h) => h.dn === dn) || null;

  /* ---------- state (MD: S) ---------- */
  const QUICK = { soft: ["นุ่มลง", "Softer"], lift: ["ปังขึ้น", "Bolder"], event: ["มีแคมเปญพิเศษ", "Special campaign"], creator: ["คนนี้ไม่เหมาะ", "Wrong creator"], thai: ["ไทยมากขึ้น", "More Thai"], intl: ["อินเตอร์มากขึ้น", "More English"] };
  const ST = { draft: ["ร่าง", "Draft"], review: ["รอ Director ตรวจ", "Awaiting Director review"], live: ["เผยแพร่แล้ว", "Published"] };
  const VAR = [{ k: "normal", n: ["ปกติ", "Normal"], sfx: "" }, { k: "soft", n: ["นุ่มลง", "Softer"], sfx: " · Soft" }, { k: "lift", n: ["ปังขึ้น", "Bolder"], sfx: " · Lift" }];
  const S = {
    side: "brand", brand: "mori", tab: "today", wk: "this", weekMode: innerWidth < 760 ? "day" : "grid", dayPick: NOW.day,
    pack: Object.fromEntries(window.BRANDS.map((b) => [b.id, b.pack])), status: Object.fromEntries(window.BRANDS.map((b) => [b.id, b.status])),
    zone: {}, hold: { paperplane: true }, late: { kora: true }, notified: {},
    variant: 0, varKey: null, liked: new Set(), disliked: new Set(), feedback: [], requests: [],
    edits: {}, src: {}, rotate: {}, diff: true, fest: {}, SL: {}, VARL: {}, runs: [], sim: null,
    stab: "queue", ws: null, wstab: "program", rtab: "overview", aiBusy: null,
    lib: { q: "", brand: "", agency: "", sort: "name" }, cl: { q: "", kind: "", f: "all" }, recent: [],
    modal: null, rc: null,
  };
  const B = () => zoneView(BR[S.brand], S.zone[S.brand]);
  const wsB = () => zoneView(BR[S.ws], S.zone[S.ws]);

  /* ---------- feedback helpers (per brand: every branch shares them) ---------- */
  const blockedOf = (b) => [...S.disliked].filter((k) => k.startsWith(b.id + "|")).map((k) => k.split("|")[1]);
  const likedMap = (b) => Object.fromEntries([...S.liked].filter((k) => k.startsWith(b.id + "|")).map((k) => [k.split("|")[1], 3]));

  /* ---------- shortlists per brand (MD: playlists per shop, shared by every zone; a slot points at a shortlist id) ---------- */
  const engSlot = (sl) => ({ start: hh(sl.s), vibe: sl.vibe, stage: sl.stage, pool: sl.pool });
  function draftIds(b, sl, n = 4, extra = {}) {
    const counts = {};
    Object.values(S.SL[b.id] || {}).forEach((l) => l.creatorIds.forEach((id) => (counts[id] = (counts[id] || 0) + 1)));
    // spread creators across lists: skip anyone already in 2+ lists when there are enough others, else just rank them lower
    const heavy = Object.keys(counts).filter((id) => counts[id] >= 2);
    const o = { n, blocked: blockedOf(b), feedback: likedMap(b), ...extra };
    const spread = E.recommend(engSlot(sl), b, { ...o, avoid: [...(extra.avoid || []), ...heavy] }).picks;
    return (spread.length >= n ? spread : E.recommend(engSlot(sl), b, { ...o, recent: [...(extra.recent || []), ...heavy] }).picks).map((p) => p.c.id);
  }
  function addSlotLists(b, L, types) {
    for (const tk of Object.keys(types)) types[tk].slots.forEach((x) => {
      const id = slug(x[2]);
      if (L[id]) return;
      const sl = { s: x[0], e: x[1], vibe: x[4], stage: x[5] };
      const seed = b.seed && b.seed[x[2]];
      L[id] = { id, name: x[2], mood: x[3], vibe: x[4], stage: x[5], hour: x[0], creatorIds: seed ? [...seed] : draftIds(b, sl), by: seed ? "MD" : "AI", note: seed ? ["Director จัดเอง (จากม็อกอัปแรก)", "Made by the Director (first mockup)"] : ["AI ร่างจาก VIBES ของแบรนด์ · Director อนุมัติแล้ว", "AI draft from the brand's VIBES · approved by the Director"] };
    });
  }
  function slOf(b) {
    const base = BR[b.id];
    if (S.SL[base.id]) return S.SL[base.id];
    const L = (S.SL[base.id] = {});
    addSlotLists(base, L, base.types);
    Object.values(base.zoneProg || {}).forEach((p) => addSlotLists(base, L, p.types));
    if (base.special) {
      const sp = base.special, id = slug(sp.name);
      L[id] = { id, name: sp.name, mood: sp.mood, vibe: sp.vibe, stage: sp.stage, hour: sp.s, creatorIds: draftIds(base, { s: sp.s, vibe: sp.vibe, stage: sp.stage }), by: "MD", note: ["วันพิเศษตามคำขอแบรนด์", "Special day requested by the brand"] };
    }
    (window.SEED_SHORTLISTS[base.id] || []).forEach((x) => { if (!L[x.id]) L[x.id] = { id: x.id, name: x.name, mood: ["ชุดจากม็อกอัปแรก", "Set from the first mockup"], vibe: "fresh", stage: "consideration", hour: null, creatorIds: [...x.creatorIds], by: "MD", note: ["ชุดที่ Director จัดไว้ในม็อกอัปแรก", "Set the Director made in the first mockup"] }; });
    return L;
  }
  const listOf = (b, id) => slOf(b)[id] || null;
  function varList(b, sl, v) {
    const base = listOf(b, sl.slId);
    if (!v || !base) return base;
    const k = `${b.id}|${sl.slId}|${v}`;
    if (!S.VARL[k]) {
      // a softer / bolder set: prefer other creators than the normal list, energy counts double
      const o = { weights: { ...E.DEFAULT_WEIGHTS, energy: 4 } };
      let ids = draftIds(b, { ...sl, pool: VAR[v].k }, 4, { ...o, avoid: base.creatorIds });
      if (ids.length < 3) ids = draftIds(b, { ...sl, pool: VAR[v].k }, 4, { ...o, recent: base.creatorIds });
      S.VARL[k] = { id: k, name: base.name + VAR[v].sfx, mood: VAR[v].n, creatorIds: ids, by: "AI", note: ["Pool · Director อนุมัติแล้ว", "Pool · approved by the Director"] };
    }
    return S.VARL[k];
  }

  /* ---------- program: day type × slots, resolved per day (MD: daySlots) ---------- */
  const typeOf = (b, di, wk) => (wk === "next" ? b.nextWeek : b.week)[di];
  const ekey = (b, wk, di, i) => `${ek(b)}|${wk}|${di}|${i}`;
  function daySlots(b, di, wk) {
    const tk = typeOf(b, di, wk), L = slOf(b);
    return b.types[tk].slots.map((x, i) => {
      const o = { s: x[0], e: x[1], name: x[2], mood: x[3], vibe: x[4], stage: x[5], i, di, wk, tk, slId: slug(x[2]), special: false };
      const sp = b.special;
      if (wk === "this" && sp && sp.day === di && sp.s === x[0]) Object.assign(o, { slId: slug(sp.name), special: true, vibe: sp.vibe || o.vibe, stage: sp.stage || o.stage });
      const ed = wk !== "past" && S.edits[ekey(b, wk, di, i)];
      if (ed) o.slId = ed.sl;
      const l = L[o.slId];
      o.empty = !l;
      if (l) { o.name = l.name; o.mood = l.mood; o.vibe = l.vibe || o.vibe; }
      return o;
    });
  }
  const wkOf = (dn) => { const w = WK(); return dn >= w.next ? "next" : dn >= w.this ? "this" : "past"; };
  const slotsOn = (b, dn) => daySlots(b, mod(dn - WK().this, 7), wkOf(dn) === "past" ? "this" : wkOf(dn)).map((s) => (wkOf(dn) === "past" && s.special ? { ...s, slId: slug(b.types[s.tk].slots[s.i][2]), special: false } : s));
  const srcOf = (b, sl) => S.src[ekey(b, sl.wk, sl.di, sl.i)] || (listOf(b, sl.slId) || {}).by || "MD";
  const typeName = (b, tk) => tx(b.types[tk].name);
  function reapprove(b) {
    if (S.status[b.id] === "live") { S.status[b.id] = "review"; return L(" · ต้องอนุมัติใหม่ก่อนแบรนด์เห็น", " · needs approval again before the brand sees it"); }
    return "";
  }
  /** Where a shortlist is used next week in this branch (MD: usage). */
  function usage(b, id) {
    const out = [];
    for (let di = 0; di < 7; di++) daySlots(b, di, "next").forEach((sl) => { if (sl.slId === id) out.push(sl); });
    return out;
  }
  const usageTxt = (b, id) => {
    const u = usage(b, id);
    if (!u.length) return L("ยังไม่ได้ใช้ในสัปดาห์หน้า", "Not used next week");
    const byTime = {};
    u.forEach((sl) => (byTime[hh(sl.s)] = byTime[hh(sl.s)] || []).push(sl.di));
    return L(`ใช้ ${u.length} ช่อง: `, `Used in ${u.length} slots: `) + Object.entries(byTime).map(([t, ds]) => `${daysLabel([...new Set(ds)].sort())} ${t}`).join(" · ");
  };

  /* ---------- posts: who posts when (MD: the song playing is derived from the clock) ---------- */
  let POSTS = {};
  const POST_AT = 30; // each slot's post goes out 30 min after the slot starts
  function postsOf(b) {
    if (POSTS[ek(b)]) return POSTS[ek(b)];
    const w = WK(), out = new Map(), recent = {}, rot = S.rotate[ek(b)] !== false, blocked = blockedOf(b);
    for (let dn = w.this - 15; dn <= w.next + 6; dn++) {
      const used = new Set(), day = [];
      slotsOn(b, dn).forEach((sl, i) => {
        const at = sl.s * 60 + POST_AT, r = (recent[sl.s] = recent[sl.s] || new Map());
        const future = dn > NOW.dn || (dn === NOW.dn && at > NOW.min); // "not this" applies from the next post on
        const p = sl.empty ? null : E.poster(listOf(b, sl.slId), i, dn, { blocked: future ? blocked : [], recent: r, used, rotate: rot });
        if (p) { used.add(p.c.id); r.set(p.c.id, dn); }
        day.push({ dn, slot: sl, c: p ? p.c : null, repeat: !!(p && p.repeat), at });
      });
      out.set(dn, day);
    }
    return (POSTS[ek(b)] = out);
  }
  const postsOn = (b, dn) => postsOf(b).get(dn) || [];
  function nowOf(b) {
    const sls = daySlots(b, NOW.day, "this");
    const i = sls.findIndex((sl) => sl.s * 60 <= NOW.min && NOW.min < sl.e * 60);
    if (i < 0) return null;
    const sl = sls[i], key = `${ek(b)}|${NOW.dn}|${i}`;
    let post = postsOn(b, NOW.dn)[i];
    const v = S.pack[b.id] === "pool" && S.varKey === key ? S.variant : 0;
    if (v && !sl.empty) {
      const used = new Set(postsOn(b, NOW.dn).filter((p, j) => j !== i && p.c).map((p) => p.c.id));
      const p = E.poster(varList(b, sl, v), i, NOW.dn, { blocked: post.at > NOW.min ? blockedOf(b) : [], used, rotate: S.rotate[ek(b)] !== false });
      post = { ...post, c: p ? p.c : null };
    }
    return { sl, i, key, post, v, next: sls[i + 1] || null, list: v ? varList(b, sl, v) : listOf(b, sl.slId) };
  }
  /** Live posting status for Studio (MD: player heartbeat), for the brand's main branch. */
  function postInfo(b) {
    const n = nowOf(b);
    if (!n) return { st: "closed", pill: L("นอกช่วงโพสต์", "Off hours"), txt: L(`ช่วงโพสต์ ${hh(b.open)}–${hh(b.close)}`, `Posting hours ${hh(b.open)}–${hh(b.close)}`) };
    if (S.hold[b.id]) return { st: "hold", pill: L("พักโพสต์", "On hold"), txt: L(`แบรนด์กดพักโพสต์ชั่วคราว · ${n.sl.name}`, `The brand paused posting · ${n.sl.name}`) };
    const p = n.post;
    if (!p.c) return { st: "late", pill: L("ไม่มีคนโพสต์", "Nobody posting"), txt: L(`ช่อง ${n.sl.name} ไม่มีครีเอเตอร์ว่าง`, `No creator is free for ${n.sl.name}`) };
    if (NOW.min < p.at) return { st: "wait", pill: L("รอโพสต์", "Scheduled"), txt: L(`${p.c.handle} โพสต์ ${hmm(p.at)} · ${n.sl.name}`, `${p.c.handle} posts at ${hmm(p.at)} · ${n.sl.name}`) };
    if (S.late[b.id]) return { st: "late", pill: L("โพสต์ล่าช้า", "Late post"), txt: L(`${p.c.handle} ยังไม่โพสต์ · เลยเวลามา ${NOW.min - p.at} นาที · ${n.sl.name}`, `${p.c.handle} hasn't posted · ${NOW.min - p.at} min late · ${n.sl.name}`) };
    return { st: "on", pill: L("โพสต์แล้ว", "Posted"), txt: L(`${p.c.handle} โพสต์ ${hmm(p.at)} · ${n.sl.name}`, `${p.c.handle} posted at ${hmm(p.at)} · ${n.sl.name}`) };
  }

  /* ---------- seed queue items (MD: two requests + two "not this" in the queue) ---------- */
  (function seed() {
    const w = WK(), fri = dLab2(w.next + 4);
    S.requests.push({ b: "lumen", k: "lift", when: [fri[0] + " 21:00–24:00", fri[1] + " 21:00–24:00"], text: ["มีโปรโมชันสุดสัปดาห์ ขอโพสต์ปังขึ้นช่วงพีค", "Weekend promotion — please make the peak-hour posts bolder"], state: "new" });
    S.requests.push({ b: "kora", k: "soft", when: ["จ.–ศ. 08:00–11:00", "Mon–Fri 08:00–11:00"], text: ["ลูกค้าบอกว่าโพสต์ช่วงเช้าขายของแรงไป ขอนุ่มลงอีก", "Customers say the morning posts sell too hard — please make them softer"], state: "new" });
    const k1 = listOf(BR.kora, "afternoon-reset").creatorIds[1], k2 = listOf(BR.somtam, "dinner-crowd").creatorIds[2];
    S.disliked.add("kora|" + k1); S.feedback.push({ b: "kora", id: k1, when: ["วันนี้ 10:27", "Today 10:27"] });
    S.disliked.add("somtam|" + k2); S.feedback.push({ b: "somtam", id: k2, when: ["เมื่อวาน 16:05", "Yesterday 16:05"] });
    S.liked.add("mori|c03");
  })();

  /* ---------- small render helpers ---------- */
  const hue = (id) => { let h = 0; for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) % 360; return h; };
  const av = (c, cls = "") => `<i class="av ${cls}" style="background:linear-gradient(135deg,hsl(${hue(c.id)} 70% 72%),hsl(${(hue(c.id) + 50) % 360} 70% 60%))" title="${esc(c.handle)}">${esc(c.name.split(" ").map((w) => w[0]).join("").slice(0, 2))}</i>`;
  const dot = (b) => `<span class="dot" style="background:${b.color}"></span>`;
  const band = (h) => (h < 11 ? "am" : h < 16 ? "mid" : h < 20 ? "pm" : "nt");
  const cover = (name, h, cls = "") => `<div class="cover ${band(h == null ? 14 : h)} ${cls}"><span>MATCHROOM</span><b>${esc(name)}</b></div>`;
  const pill = (t, cls = "") => `<span class="pill ${cls}">${esc(t)}</span>`;
  const stPill = (b) => pill(L("สัปดาห์หน้า: ", "Next week: ") + tx(ST[S.status[b.id]]), S.status[b.id] === "live" ? "ok" : S.status[b.id] === "review" ? "warn" : "");
  const packName = (b) => (S.pack[b.id] === "pool" ? L("Pool · พรีเมียม", "Pool · premium") : "Autopilot");
  const packPill = (b) => pill(packName(b), S.pack[b.id] === "pool" ? "acc" : "");
  const kindOf = (b) => tx(b.kind);
  const I = {
    spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l1.6 4.6L18 9l-4.4 1.4L12 15l-1.6-4.6L6 9l4.4-1.4z"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/></svg>',
    heartF: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.8"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 13V4H4v9h3Zm0 0 4 7c1.5 0 2.5-1 2.3-2.5L13 14h5.3a2 2 0 0 0 2-2.3l-1-6A2 2 0 0 0 17.3 4H7"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5v14l12-7z"/></svg>',
    msg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5h16v11H9l-5 4V5Z"/></svg>',
    dl: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v12M8 11l4 4 4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>',
    x: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/></svg>',
    today: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/></svg>',
    week: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v3M16 3v3"/></svg>',
    acct: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6"/></svg>',
    queue: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 6h16M4 12h16M4 18h10"/></svg>',
    brands: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 9.5 12 4l8 5.5V20H4z"/><path d="M9 20v-6h6v6"/></svg>',
    lib: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/></svg>',
    rep: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
    guard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
  };
  const btn = (act, label, cls = "", v = "", extra = "") => `<button class="btn ${cls}" data-act="${act}"${v !== "" ? ` data-v="${esc(v)}"` : ""} ${extra}>${label}</button>`;

  /* ======================================================================================
     MOCKUP BAR (MD: mockBar) — not part of the product, only for the demo
     ====================================================================================== */
  function mockBar() {
    const pinOpts = [["", L("ตามเวลาจริง", "Real time")], ...[510, 690, 860, 1170, 1350].map((m) => [m, L("ลองดูตอน ", "Try ") + hmm(m)])];
    return `<div class="mock"><span class="tag">MOCKUP</span>
      <div class="seg sm"><button class="${S.side === "brand" ? "on" : ""}" data-act="side" data-v="brand">${L("ฝั่งแบรนด์", "Brand side")}</button><button class="${S.side === "studio" ? "on" : ""}" data-act="side" data-v="studio">${L("ฝั่ง Director · Studio", "Director · Studio")}</button></div>
      <select id="mock-brand" aria-label="${L("แบรนด์ตัวอย่าง", "Sample brand")}">${brands().map((b) => `<option value="${b.id}" ${b.id === S.brand ? "selected" : ""}>${esc(b.name)}</option>`).join("")}</select>
      ${S.side === "brand" ? `<div class="seg sm"><button class="${S.pack[S.brand] !== "pool" ? "on" : ""}" data-act="pack" data-v="auto">Autopilot</button><button class="${S.pack[S.brand] === "pool" ? "on" : ""}" data-act="pack" data-v="pool">${L("Pool · พรีเมียม", "Pool · premium")}</button></div>` : ""}
      <span class="clock">${esc(clockTxt())}</span>
      <select id="mock-clock" aria-label="${L("เวลา", "Time")}">${pinOpts.map(([v, l]) => `<option value="${v}" ${String(CLK.pin ?? "") === String(v) ? "selected" : ""}>${l}</option>`).join("")}</select>
      <a class="lnk" href="classic/index.html">${L("Matchroom เดิม (classic)", "First Matchroom (classic)")}</a>
      <button class="lnk" data-act="notes">${L("โน้ต mockup", "Mockup notes")}</button></div>`;
  }

  /* ======================================================================================
     BRAND SIDE (MD: shop / Player) — 3 tabs
     ====================================================================================== */
  const CTABS = [["today", ["วันนี้", "Today"], I.today], ["week", ["ตารางสัปดาห์", "Weekly schedule"], I.week], ["account", ["บัญชี", "Account"], I.acct]];
  function brandApp() {
    const b = B(), zs = zonesOf(b);
    const body = { today: viewToday, week: viewWeek, account: viewAccount }[S.tab]();
    const zsel = zs.length > 1 ? `<select id="zone-sel" aria-label="${L("สาขา", "Branch")}">${zs.map((z, i) => `<option value="${i}" ${i === (b.zi || 0) ? "selected" : ""}>${esc(tx(z))}</option>`).join("")}</select>` : "";
    return `<div class="capp"><header class="chead"><div class="cbrand"><div class="logo"><b>MATCH<i>ROOM</i></b><span>INFLUENCER DIRECTOR</span></div>
        <div class="cname"><b>${esc(b.name)}</b><span>${esc(kindOf(b))} · ${L("แพ็ก", "Package")} ${S.pack[b.id] === "pool" ? "Pool" : "Autopilot"}</span>${zsel}</div></div>
        <div class="chead-r"><nav class="ctabs">${CTABS.map(([k, l]) => `<button class="${S.tab === k ? "on" : ""}" data-act="tab" data-v="${k}">${tx(l)}</button>`).join("")}</nav>${langSeg()}</div></header>
      <main class="cmain">${body}</main>${miniBar()}
      <nav class="mtabs">${CTABS.map(([k, l, ic]) => `<button class="${S.tab === k ? "on" : ""}" data-act="tab" data-v="${k}">${ic}<span>${tx(l)}</span></button>`).join("")}</nav></div>`;
  }

  function greet() { return NOW.min < 720 ? L("อรุณสวัสดิ์", "Good morning") : NOW.min < 1020 ? L("สวัสดีตอนบ่าย", "Good afternoon") : L("สวัสดีตอนเย็น", "Good evening"); }
  function postState(p) {
    if (!p || !p.c) return { cls: "", t: L("ไม่มีครีเอเตอร์ว่าง", "No creator free") };
    if (S.hold[S.brand] && p.dn === NOW.dn && p.at > NOW.min) return { cls: "", t: L("พักไว้", "On hold") };
    if (p.dn < NOW.dn || (p.dn === NOW.dn && p.at <= NOW.min)) return { cls: "ok", t: L("โพสต์แล้ว ", "Posted ") + hmm(p.at) };
    return { cls: "", t: L("โพสต์ ", "Posts at ") + hmm(p.at) };
  }

  function viewToday() {
    const b = B(), n = nowOf(b), sls = daySlots(b, NOW.day, "this"), x = ymd(NOW.dn), tk = typeOf(b, NOW.day, "this");
    const head = `<div class="hello"><h1>${greet()}</h1><p>${DAY(x.wd)} ${x.d} ${MON(x.m)} · ${L("วันนี้ใช้แบบ", "Today's day type:")} “${esc(typeName(b, tk))}” · ${hh(b.open)}–${hh(b.close)}</p></div>`;
    const shelf = `<section><div class="sec-h"><div><h2>${L("โปรแกรมวันนี้", "Today's program")}</h2><span>${L(`${sls.length} ช่วงโพสต์ ครอบตั้งแต่ ${hh(b.open)} ถึง ${hh(b.close)}`, `${sls.length} posting slots from ${hh(b.open)} to ${hh(b.close)}`)}</span></div><button class="lnk" data-act="tab" data-v="week">${L("ดูทั้งสัปดาห์", "See the week")}</button></div>
      <div class="shelf" id="shelf">${sls.map((sl, i) => {
        const p = postsOn(b, NOW.dn)[i], cur = n && n.i === i, past = sl.e * 60 <= NOW.min;
        return `<button class="dcard ${cur ? "now" : past ? "past" : ""}" data-act="slview" data-v="this|${NOW.day}|${i}">${cover(sl.name, sl.s)}<b>${esc(sl.name)}</b><span>${hh(sl.s)}–${hh(sl.e)}</span><em>${cur ? L("กำลังโพสต์", "Posting now") : past ? (p && p.c ? L("โพสต์แล้ว · ", "Posted · ") + esc(p.c.handle) : L("จบช่วงแล้ว", "Slot ended")) : esc(tx(sl.mood))}</em></button>`;
      }).join("")}</div></section>`;
    if (!n) {
      const first = sls[0], done = NOW.min >= b.close * 60;
      return head + `<div class="hero closed"><div class="hero-b"><div class="eyebrow">${done ? L("ปิดช่วงโพสต์วันนี้แล้ว", "Posting has ended for today") : L("ยังไม่ถึงช่วงโพสต์", "Posting hasn't started yet")}</div><h2>${done ? L("พรุ่งนี้เริ่ม ", "Tomorrow from ") + hh(b.open) : L(`เริ่มโพสต์ ${hh(b.open)} · เริ่มด้วย ${esc(first.name)}`, `Posting starts ${hh(b.open)} · first up: ${esc(first.name)}`)}</h2><p class="muted">${L("โพสต์จะออกเองตามเวลา ไม่ต้องกดอะไร", "Posts go out on time by themselves — nothing to press")}</p></div></div>` + shelf;
    }
    const { sl, post, list } = n, prog = (NOW.min - sl.s * 60) / ((sl.e - sl.s) * 60), left = sl.e * 60 - NOW.min, c = post.c;
    const held = !!S.hold[b.id], ps = postState(post), liked = c && S.liked.has(b.id + "|" + c.id);
    const hero = `<div class="hero"><div class="hero-art">${cover(list ? list.name : sl.name, sl.s, "lg")}</div><div class="hero-b">
        <div class="eyebrow"><i class="live-dot ${held ? "" : "on"}"></i>${held ? L("พักโพสต์อยู่", "Posting on hold") : L("กำลังโพสต์", "Posting now")} · ${hh(sl.s)}–${hh(sl.e)}</div>
        <h2>${esc(list ? list.name : sl.name)}</h2>
        <p class="muted">${L("จัดโดย MATCHROOM Influencer Director", "Curated by MATCHROOM Influencer Director")} · ${list ? list.creatorIds.length : 0} ${L("คน", "creators")} · ${esc(tx(list ? list.mood : sl.mood))}</p>
        <div class="prog"><i style="width:${Math.round(prog * 100)}%"></i></div>
        <p class="muted sm">${L(`เหลืออีก ${left} นาที`, `${left} min left`)}${n.next ? L(` · ต่อไป ${esc(n.next.name)} ${hh(n.next.s)}`, ` · next: ${esc(n.next.name)} at ${hh(n.next.s)}`) : L(" · จบช่วงโพสต์ของวันนี้", " · last slot of the day")}</p>
        <div class="poster">${c ? `${av(c, "lg")}<div><b>${esc(c.handle)}</b><span>${esc(c.platform)} · ${E.fmtK(c.followers)} ${L("ผู้ติดตาม", "followers")}</span><span class="pill ${ps.cls}">${held ? L("พักไว้ · ยังไม่ปล่อยโพสต์", "On hold · not posted yet") : esc(ps.t)}</span></div>` : `<span class="muted">${L("ช่วงนี้ไม่มีครีเอเตอร์ว่าง · Director กำลังจัดให้", "No creator is free for this slot · the Director is on it")}</span>`}</div>
        <div class="hero-acts">
          <button class="round pri" data-act="hold" title="${held ? L("โพสต์ต่อ", "Resume posting") : L("พักโพสต์", "Pause posting")}" aria-label="${held ? L("โพสต์ต่อ", "Resume posting") : L("พักโพสต์", "Pause posting")}">${held ? I.play : I.pause}</button>
          ${c ? `<button class="round ${liked ? "on" : ""}" data-act="like" data-v="${c.id}" title="${L("ชอบ", "Like")}" aria-label="${L("ชอบ", "Like")}">${liked ? I.heartF : I.heart}</button>
          <button class="round" data-act="dislike" data-v="${c.id}" title="${L("ไม่เอาคนนี้", "Not this creator")}" aria-label="${L("ไม่เอาคนนี้", "Not this creator")}">${I.down}</button>` : ""}
          ${btn("req", I.msg + L("ขอปรับ", "Ask for a change"))}
        </div>
        <div class="quick"><span>${L("ขอเร็ว", "Quick ask")}</span>${["soft", "lift", "event", "creator"].map((k) => `<button data-act="req" data-v="${k}">${tx(QUICK[k])}</button>`).join("")}</div>
      </div></div>`;
    const pool = S.pack[b.id] === "pool"
      ? `<section><div class="sec-h"><div><h2>${L("เลือกโทนช่วงนี้", "Pick this slot's tone")} ${pill(L("แพ็ก Pool", "Pool package"), "acc")}</h2><span>${L(`ทั้ง 3 ชุด Director อนุมัติแล้ว · กลับเป็น “ปกติ” เองตอน ${hh(sl.e)}`, `All 3 sets are approved by the Director · back to “Normal” at ${hh(sl.e)}`)}</span></div></div>
         <div class="vars">${VAR.map((v, i) => { const l = varList(b, sl, i); return `<button class="var ${n.v === i ? "on" : ""}" data-act="variant" data-v="${i}">${cover(l ? l.name : sl.name, sl.s, "xs")}<div class="grow"><b>${tx(v.n)}</b><span>${esc(l ? l.name : "")}</span><div class="avs">${(l ? l.creatorIds : []).slice(0, 4).map((id) => av(E.byId(id), "sm")).join("")}</div></div></button>`; }).join("")}</div></section>`
      : `<div class="lockline">${I.lock}<span>${L("แพ็ก Autopilot · โพสต์ตามโปรแกรมที่ Director จัดให้", "Autopilot package · posts follow the Director's program")} <em>${L("อยากเลือกโทนเองต่อช่วง (ปกติ / นุ่มลง / ปังขึ้น) ใช้แพ็ก Pool", "To pick the tone per slot (Normal / Softer / Bolder), use the Pool package")}</em></span></div>`;
    const past = [];
    for (const dn of [NOW.dn, NOW.dn - 1]) postsOn(b, dn).forEach((p) => { if (p.c && (dn < NOW.dn || p.at <= NOW.min)) past.push(p); });
    past.sort((a, z) => z.dn - a.dn || z.at - a.at);
    const nToday = postsOn(b, NOW.dn).filter((p) => p.c && p.at <= NOW.min).length;
    const recent = `<section><div class="sec-h"><div><h2>${L("เพิ่งโพสต์ไป", "Recently posted")}</h2><span>${L("ตอบทีมได้ทันทีว่า “โพสต์เมื่อกี้ใครทำ”", "Answer “who made that last post?” right away")}</span></div><button class="lnk" data-act="hist">${L(`ดูทั้งวัน · ${nToday} โพสต์`, `Whole day · ${nToday} posts`)}</button></div>
      <div class="rows">${past.slice(0, 4).map((p) => histRow(b, p)).join("") || `<div class="muted">${L("วันนี้ยังไม่มีโพสต์", "No posts yet today")}</div>`}</div></section>`;
    const inList = `<section><div class="sec-h"><div><h2>${L("ใน shortlist นี้", "In this shortlist")}</h2><span>${L("หมุนเวียนกันโพสต์ทีละวันอัตโนมัติ · แบรนด์เลือกคนเองไม่ได้", "Creators take turns, one a day, automatically · brands can't pick creators")}</span></div></div>
      <div class="rows">${(list ? list.creatorIds : []).map((id, k) => { const cc = E.byId(id), out = S.disliked.has(b.id + "|" + id); return `<div class="row ${c && c.id === id ? "cur" : ""}"><span class="n">${c && c.id === id ? '<i class="eq"><b></b><b></b><b></b></i>' : k + 1}</span>${av(cc)}<div class="grow"><b>${esc(cc.handle)}</b><span>${esc(cc.platform)} · ${esc(cc.name)}</span></div>${out ? pill(L("ไม่ใช้กับแบรนด์นี้แล้ว", "No longer used for this brand"), "bad") : c && c.id === id ? pill(L("วันนี้", "Today")) : ""}</div>`; }).join("")}</div></section>`;
    return head + hero + pool + recent + shelf + inList;
  }
  function histRow(b, p) {
    const out = S.disliked.has(b.id + "|" + p.c.id);
    return `<div class="row"><span class="t">${p.dn < NOW.dn ? L("เมื่อวาน ", "Yest. ") : ""}${hmm(p.at)}</span>${av(p.c)}<div class="grow"><b>${esc(p.c.handle)}</b><span>${esc(p.c.platform)} · ${esc(p.slot.name)}</span></div>${out ? pill(L("ไม่ใช้แล้ว", "Removed"), "bad") : `<button class="icon" data-act="dislike" data-v="${p.c.id}" title="${L("ไม่เอาคนนี้", "Not this creator")}" aria-label="${L("ไม่เอาคนนี้", "Not this creator")}">${I.down}</button>`}</div>`;
  }
  function miniBar() {
    const b = B(), n = nowOf(b);
    if (!n || !n.post.c) return "";
    const c = n.post.c, liked = S.liked.has(b.id + "|" + c.id);
    return `<div class="mini">${av(c)}<div class="grow"><b>${esc(c.handle)}</b><span>${esc(n.list ? n.list.name : n.sl.name)} · ${hh(n.sl.s)}–${hh(n.sl.e)}</span></div>
      <button class="icon ${liked ? "on" : ""}" data-act="like" data-v="${c.id}" aria-label="${L("ชอบ", "Like")}">${liked ? I.heartF : I.heart}</button>
      <button class="icon" data-act="dislike" data-v="${c.id}" aria-label="${L("ไม่เอาคนนี้", "Not this creator")}">${I.down}</button>
      <button class="round pri sm" data-act="hold" aria-label="${S.hold[b.id] ? L("โพสต์ต่อ", "Resume posting") : L("พักโพสต์", "Pause posting")}">${S.hold[b.id] ? I.play : I.pause}</button></div>`;
  }

  /* ---------- weekly schedule (MD: viewWeek + gridHTML + dayList) ---------- */
  function viewWeek() {
    const b = B(), w = WK(), wk = S.wk, dn0 = wk === "next" ? w.next : w.this, locked = wk === "next" && S.status[b.id] !== "live";
    const head = `<div class="sec-h big"><div><h1>${L("ตารางโพสต์ประจำสัปดาห์", "Weekly posting schedule")}</h1><span>${esc(b.name)} · ${zonesOf(b).length > 1 ? esc(zname(b)) + " · " : ""}${L("1 ช่อง = 1 shortlist ครีเอเตอร์หมุนเวียนกันโพสต์", "1 slot = 1 shortlist; its creators take turns posting")}</span></div>
      <div class="acts">${["pdf", "xls", "img"].map((f) => `<button class="btn" data-act="exp" data-v="${f}" ${locked ? "disabled" : ""}>${I.dl}${{ pdf: "PDF", xls: "Excel", img: L("รูปภาพ", "Image") }[f]}</button>`).join("")}</div></div>
      <div class="bar"><div class="seg"><button class="${wk === "this" ? "on" : ""}" data-act="wk" data-v="this">${L("สัปดาห์นี้", "This week")} · ${rangeLab(w.this, false)}</button><button class="${wk === "next" ? "on" : ""}" data-act="wk" data-v="next">${L("สัปดาห์หน้า", "Next week")} · ${rangeLab(w.next, false)}</button></div>
        <div class="seg"><button class="${S.weekMode === "grid" ? "on" : ""}" data-act="wmode" data-v="grid">${L("ตาราง", "Grid")}</button><button class="${S.weekMode === "day" ? "on" : ""}" data-act="wmode" data-v="day">${L("รายวัน", "By day")}</button></div></div>`;
    if (locked) return head + `<div class="empty-card">${I.lock}<h3>${L("Director กำลังจัดโปรแกรมสัปดาห์หน้า", "The Director is preparing next week's program")}</h3><p class="muted">${L(`ตารางสัปดาห์ ${rangeLab(w.next)} จะขึ้นที่นี่ทันทีที่ Director เผยแพร่ (ปกติภายในวันอาทิตย์)`, `The schedule for ${rangeLab(w.next)} appears here as soon as the Director publishes it (usually by Sunday)`)}</p></div>`;
    return head + legend(b, wk) + (S.weekMode === "grid" ? gridHTML(b, wk, false) : dayList(b, wk, dn0));
  }
  function legend(b, wk) {
    const arr = wk === "next" ? b.nextWeek : b.week, w = WK(), dn0 = wk === "next" ? w.next : w.this;
    const items = Object.keys(b.types).filter((tk) => arr.includes(tk)).map((tk) => `<span><i style="background:${b.types[tk].color}"></i>${esc(typeName(b, tk))} · ${daysLabel(arr.map((t, d) => (t === tk ? d : -1)).filter((d) => d >= 0))}</span>`);
    if (wk === "this" && b.special) items.push(`<span><i class="sp"></i>${L("วันพิเศษ", "Special day")} · ${DS(b.special.day)} (${L("คำขอแบรนด์", "brand request")})</span>`);
    for (let d = 0; d < 7; d++) { const h = holOn(dn0 + d); if (h) items.push(`<span class="hol"><i></i>${DS(d)} ${esc(tx(h.n))}</span>`); }
    return `<div class="legend">${items.join("")}</div>`;
  }
  /** Timetable: rows = hours open→close, columns = days, a cell spans its slot (MD: gridHTML). */
  function gridHTML(b, wk, edit) {
    const w = WK(), dn0 = wk === "next" ? w.next : w.this, rows = b.close - b.open;
    let cells = "";
    for (let di = 0; di < 7; di++) {
      const dn = dn0 + di, tk = typeOf(b, di, wk), h = holOn(dn), isToday = dn === NOW.dn;
      cells += `<div class="gh ${isToday ? "today" : ""}" style="grid-column:${di + 2}"><b>${DS(di)} ${ymd(dn).d}${isToday ? L(" · วันนี้", " · today") : ""}</b><span><i style="background:${b.types[tk].color}"></i>${esc(typeName(b, tk))}</span>${h ? `<em>${esc(tx(h.n))}</em>` : ""}</div>`;
      const thisSl = edit ? daySlots(b, di, "this") : null;
      daySlots(b, di, wk).forEach((sl) => {
        const p = postsOn(b, dn)[sl.i], now = isToday && NOW.min >= sl.s * 60 && NOW.min < sl.e * 60;
        const changed = edit && S.diff && (!thisSl[sl.i] || thisSl[sl.i].slId !== sl.slId || typeOf(b, di, "this") !== tk);
        const tags = [now ? `<i class="t now">${L("กำลังโพสต์", "Posting")}</i>` : "", sl.special ? `<i class="t sp">${L("คำขอแบรนด์", "Brand request")}</i>` : "", changed ? `<i class="t ch">${L("เปลี่ยน", "Changed")}</i>` : "", edit ? `<i class="t src">${srcOf(b, sl) === "AI" ? L("AI ร่าง", "AI draft") : L("Director จัด", "By Director")}</i>` : ""].join("");
        cells += `<button class="gc ${isToday ? "today" : ""} ${sl.empty ? "empty" : ""} ${changed ? "chg" : ""}" style="grid-column:${di + 2};grid-row:${sl.s - b.open + 2} / span ${sl.e - sl.s};--tc:${b.types[tk].color}" data-act="${edit ? "sp" : "slview"}" data-v="${wk}|${di}|${sl.i}">
          <b>${sl.empty ? L("ยังไม่ได้เลือก shortlist", "No shortlist yet") : esc(sl.name)}</b>${sl.e - sl.s > 1 ? `<span class="tm">${hh(sl.s)}–${hh(sl.e)}</span><span class="md">${esc(tx(sl.mood))}</span>` : ""}${sl.empty ? `<span>${L("กดเพื่อเลือก", "Tap to choose")}</span>` : p && p.c ? `<span class="who">${esc(p.c.handle)}</span>` : `<span class="who off">${L("ไม่มีคนว่างวันนี้", "Nobody free that day")}</span>`}<div class="tags">${tags}</div></button>`;
      });
    }
    let times = "";
    for (let r = 0; r < rows; r++) times += `<div class="gt" style="grid-row:${r + 2}">${hh(b.open + r)}</div>`;
    const nowLine = dn0 === WK().this && NOW.min >= b.open * 60 && NOW.min < b.close * 60 ? `<div class="nowline" style="grid-column:${NOW.day + 2};grid-row:2 / span ${rows};--p:${((NOW.min / 60 - b.open) / rows) * 100}%"></div>` : "";
    return `<div class="gwrap"><div class="grid7" style="grid-template-rows:auto repeat(${rows}, minmax(46px, auto))">${times}${cells}${nowLine}</div></div>`;
  }
  function dayList(b, wk, dn0) {
    const di = S.dayPick;
    return `<div class="daychips">${DS_.map((d, i) => `<button class="${i === di ? "on" : ""} ${dn0 + i === NOW.dn ? "today" : ""}" data-act="dpick" data-v="${i}" style="--tc:${b.types[typeOf(b, i, wk)].color}"><b>${DS(i)}</b><span>${ymd(dn0 + i).d}</span></button>`).join("")}</div>
      <div class="rows">${daySlots(b, di, wk).map((sl) => { const p = postsOn(b, dn0 + di)[sl.i]; return `<button class="row" data-act="slview" data-v="${wk}|${di}|${sl.i}"><span class="t">${hh(sl.s)}–${hh(sl.e)}</span>${cover(sl.name, sl.s, "xs")}<div class="grow"><b>${esc(sl.name)}</b><span>${esc(tx(sl.mood))} · ${(listOf(b, sl.slId) || { creatorIds: [] }).creatorIds.length} ${L("คน", "creators")}${p && p.c ? L(" · โพสต์โดย ", " · posted by ") + esc(p.c.handle) : ""}</span></div>${sl.special ? pill(L("คำขอแบรนด์", "Brand request"), "warn") : ""}</button>`; }).join("")}</div>`;
  }

  /* ---------- account (MD: viewAccount) ---------- */
  function viewAccount() {
    const b = B(), pool = S.pack[b.id] === "pool", reqs = S.requests.filter((r) => r.b === b.id), zs = zonesOf(b);
    const feat = [[L("โพสต์ตามโปรแกรมที่ Director จัด", "Posts follow the Director's program"), true], [L("ดูและส่งออกตารางสัปดาห์", "See and export the weekly schedule"), true], [L("กด ชอบ / ไม่เอาคนนี้", "Like / Not this creator"), true], [L("ขอปรับผ่าน Director", "Ask the Director for changes"), true], [L("เลือกโทนต่อช่วง (ปกติ / นุ่มลง / ปังขึ้น)", "Pick the tone per slot (Normal / Softer / Bolder)"), pool]];
    return `<div class="sec-h big"><div><h1>${L("บัญชี", "Account")}</h1><span>${esc(b.name)}</span></div>${langSeg()}</div><div class="cards2">
      <div class="card"><div class="card-h"><h2>${L("แพ็กเกจ", "Package")}</h2>${packPill(b)}</div><ul class="checks">${feat.map(([t, ok]) => `<li><span class="ic ${ok ? "ok" : "no"}">${ok ? "✓" : "–"}</span>${esc(t)}</li>`).join("")}<li><span class="ic no">–</span>${L("สร้าง shortlist หรือค้นหาครีเอเตอร์เอง (ไม่มีในทุกแพ็กเกจ)", "Build shortlists or search creators yourself (not in any package)")}</li></ul>
        <p class="muted sm">${L(`ราคาฐาน + เพิ่มตามจำนวนสาขา · แบรนด์นี้ครอบคลุม ${zs.length} สาขา: ${zs.map(tx).join(", ")} · บัญชี ${b.accounts.join(", ")}`, `Base price + per branch · this brand covers ${zs.length} ${zs.length > 1 ? "branches" : "branch"}: ${zs.map(tx).join(", ")} · accounts ${b.accounts.join(", ")}`)}</p>${btn("req", L("คุยกับ Director เรื่องแพ็กเกจ", "Talk to the Director about the package"), "", "event")}</div>
      <div class="card"><div class="card-h"><h2>${L("สิทธิ์ใช้คอนเทนต์ & การระบุโฆษณา", "Content rights & ad disclosure")}</h2>${pill(L("ใช้ได้", "Valid"), "ok")}</div>
        <dl class="kv"><dt>${L("แบรนด์", "Brand")}</dt><dd>${esc(b.name)}</dd><dt>${L("ผู้ดูแลสัญญา", "Contract handled by")}</dt><dd>${L("MATCHROOM (ตัวแทนแบรนด์)", "MATCHROOM (on the brand's behalf)")}</dd><dt>${L("สิทธิ์", "Rights")}</dt><dd>${L("รีโพสต์บนบัญชีแบรนด์ได้ 90 วัน", "Repost on the brand's accounts for 90 days")}</dd><dt>${L("การระบุโฆษณา", "Ad disclosure")}</dt><dd>${L("ทุกโพสต์ติด #โฆษณา / Paid partnership", "Every post is tagged #ad / Paid partnership")}</dd><dt>${L("ใช้ได้ถึง", "Valid until")}</dt><dd>${L("31 ธ.ค. 2569", "31 Dec 2026")}</dd></dl>
        ${btn("cert", L("เปิดให้ทีมกฎหมายดู", "Show it to the legal team"))}</div>
      <div class="card"><div class="card-h"><h2>${L("คำขอปรับ", "Change requests")}</h2>${btn("req", L("ขอปรับ", "Ask for a change"), "sm")}</div>
        <div class="rows">${reqs.map((r) => `<div class="row"><div class="grow"><b>${r.k ? tx(QUICK[r.k]) : L("คำขอ", "Request")} · ${esc(tx(r.when))}</b><span>${esc(tx(r.text) || "-")}</span></div>${pill(r.state === "done" ? L("Director ปรับแล้ว", "Done by the Director") : L("Director ได้รับแล้ว", "Received by the Director"), r.state === "done" ? "ok" : "")}</div>`).join("") || `<div class="muted sm">${L("ยังไม่มีคำขอ", "No requests yet")}</div>`}</div>
        <p class="muted sm">${L("ผู้ดูแล: ทีม MATCHROOM Influencer Director", "Your team: MATCHROOM Influencer Director")}</p></div>
      <div class="card"><div class="card-h"><h2>${L("ข้อมูลที่เราใช้จัดครีเอเตอร์ให้คุณ", "What we use to pick your creators")}</h2></div><ul class="checks">
        <li><span class="ic ok">✓</span>${L("Brand book และ VIBES ของแบรนด์ (กฎแบรนด์ที่ตรวจด้วยโค้ด)", "Your brand book and VIBES (brand rules checked by code)")}</li><li><span class="ic ok">✓</span>${L("ช่วงเวลาโพสต์ของแต่ละสาขา", "Each branch's posting hours")}</li><li><span class="ic ok">✓</span>${L("ชอบ / ไม่เอา / คำขอ", "Likes / not this / requests")}</li>
        <li><span class="ic bad">✕</span>${L("ไม่เก็บข้อมูลผู้ติดตามรายบุคคล หรือข้อมูลลูกค้าของคุณ", "We don't keep data on individual followers or your customers")}</li></ul></div></div>`;
  }

  /* ======================================================================================
     STUDIO (MD: studioApp) — Queue · Brands · Library · Reports (+ AI Guardrails)
     ====================================================================================== */
  const SNAV = [["queue", ["คิวงาน", "Queue"], I.queue], ["brands", ["แบรนด์", "Brands"], I.brands], ["library", ["คลังครีเอเตอร์", "Creator library"], I.lib], ["reports", ["รายงาน", "Reports"], I.rep], ["guard", ["AI Guardrails", "AI Guardrails"], I.guard]];
  function todoItems() {
    const out = [];
    brands().forEach((b) => { const pi = postInfo(b); if (pi.st === "late") out.push({ b, k: "late", h: L(`โพสต์ล่าช้า · ${b.name}`, `Late post · ${b.name}`), t: pi.txt, a: S.notified[b.id] ? pill(L("ทักแล้ว · รอโพสต์", "Messaged · waiting")) : btn("notify", L("ทักครีเอเตอร์ทาง LINE", "Message the creator on LINE"), "sm", b.id) }); });
    brands().forEach((b) => { if (S.status[b.id] === "review") out.push({ b, k: "review", h: L(`ตรวจและอนุมัติโปรแกรม · ${b.name}`, `Review and approve the program · ${b.name}`), t: L("AI ร่างครบ 7 วันแล้ว รอ Director ตรวจ", "AI drafted all 7 days · waiting for the Director"), a: btn("open", L("ตรวจโปรแกรม", "Review program"), "sm pri", b.id) }); });
    brands().forEach((b) => { if (S.status[b.id] === "draft") { const n = Math.min(7, 3 + Object.keys(S.src).filter((k) => k.startsWith(b.id + "|next|")).length); out.push({ b, k: "draft", h: L(`จัดโปรแกรมให้ครบ · ${b.name}`, `Finish the program · ${b.name}`), t: L(`Director จัดแล้ว ${n} จาก 7 วัน`, `The Director has done ${n} of 7 days`), a: btn("open", L("จัดต่อ", "Continue"), "sm", b.id) }); } });
    S.requests.forEach((r) => { if (r.state === "new") out.push({ b: BR[r.b], k: "req", h: `${r.k ? `<i class="qk">${esc(tx(QUICK[r.k]))}</i> ` : ""}${L("คำขอจาก ", "Request from ")}${esc(BR[r.b].name)}`, raw: true, t: `${tx(r.when)} · “${tx(r.text)}”`, a: btn("open", L("ดูและปรับ", "Review and adjust"), "sm", r.b) }); });
    S.feedback.forEach((f) => out.push({ b: BR[f.b], k: "fb", h: L(`${BR[f.b].name} กดไม่เอา ${E.byId(f.id).handle}`, `${BR[f.b].name} said no to ${E.byId(f.id).handle}`), t: L(`${tx(f.when)} · ตัดออกจากการหมุนเวียนของแบรนด์นี้อัตโนมัติแล้ว`, `${tx(f.when)} · removed from this brand's rotation automatically`), a: btn("open", L("ดู shortlist", "See shortlists"), "sm", f.b + "|lists") }));
    return out;
  }
  function studioApp() {
    const todo = todoItems().length;
    const view = S.ws ? viewWorkspace() : { queue: viewQueue, brands: viewBrands, library: viewLibrary, reports: viewReports, guard: viewGuard }[S.stab]();
    return `<div class="sapp"><aside class="side"><div class="logo"><b>MATCH<i>ROOM</i></b><span>STUDIO · DIRECTOR</span></div>
        <button class="search" data-act="qs">${I.search}<span>${L("ค้นหาแบรนด์", "Find a brand")}</span><kbd>⌘K</kbd></button>
        ${SNAV.map(([k, l, ic]) => `<button class="nav ${S.stab === k && !S.ws ? "on" : ""} ${S.stab === k && S.ws ? "half" : ""}" data-act="stab" data-v="${k}">${ic}<span>${tx(l)}</span>${k === "queue" && todo ? `<em>${todo}</em>` : ""}</button>`).join("")}
        <div class="sp"></div>${langSeg()}<div class="mock-note"><b>${L("ของเดิมย้ายมารวม ไม่ได้ลบ", "Nothing was deleted, only moved")}</b><br>${L("Planner → โปรแกรม · Shortlists + AI จับคู่ → Shortlists / แนะนำครีเอเตอร์ · รายชื่อครีเอเตอร์ → คลังครีเอเตอร์ · Audience / Peak / Funnel อยู่ใน", "Planner → Program · Shortlists + AI match → Shortlists / Recommend · Creator list → Creator library · Audience / Peak / Funnel live in")} <a href="classic/index.html">${L("Matchroom เดิม", "the first Matchroom")}</a></div></aside>
      <main class="smain">${view}</main></div>`;
  }
  const stCls = (st) => (st === "on" ? "ok" : st === "late" ? "bad" : st === "hold" ? "warn" : "");

  function viewQueue() {
    const w = WK(), live = brands().filter((b) => S.status[b.id] === "live").length, items = todoItems();
    const infos = brands().map((b) => ({ b, pi: postInfo(b) }));
    const order = { late: 0, hold: 1, wait: 2, on: 3, closed: 4 };
    infos.sort((a, z) => order[a.pi.st] - order[z.pi.st]);
    const cnt = (st) => infos.filter((x) => x.pi.st === st).length;
    const x = ymd(NOW.dn);
    return `<div class="sec-h big"><div><h1>${L("คิวงาน", "Queue")}</h1><span>${DAY(x.wd)} ${x.d} ${MON(x.m)} ${YR(x.y)} · ${L("สิ่งที่ Director ต้องทำวันนี้", "What the Director needs to do today")}</span></div></div>
      <div class="banner"><div><b>${L("โปรแกรมสัปดาห์หน้า", "Next week's programs")} ${rangeLab(w.next)}</b><span>${L(`เผยแพร่ครบ ${live} จาก ${ORDER.length} แบรนด์ · กำหนดส่ง ${dLab(w.next - 1)} 18:00`, `${live} of ${ORDER.length} brands published · due ${dLab(w.next - 1)} 18:00`)}</span></div><div class="meter"><i style="width:${(live / ORDER.length) * 100}%"></i></div></div>
      <div class="qgrid"><div class="card"><div class="card-h"><h2>${L("ต้องทำ", "To do")}</h2>${pill(L(`${items.length} รายการ`, `${items.length} items`))}</div>
        <div class="todo">${items.map((it) => `<div class="ti ${it.k}">${dot(it.b)}<div class="grow"><b>${it.raw ? it.h : esc(it.h)}</b><span>${esc(it.t)}</span></div>${it.a}</div>`).join("") || `<div class="muted">${L("ไม่มีงานค้าง", "Nothing waiting")}</div>`}</div></div>
      <div class="card"><div class="card-h"><h2>${L("การโพสต์วันนี้ · สด", "Today's posting · live")}</h2><span class="livebadge">LIVE</span></div>
        <p class="muted sm">${L(`โพสต์แล้ว ${cnt("on")} · รอโพสต์ ${cnt("wait")} · ล่าช้า ${cnt("late")} · พัก ${cnt("hold")} · นอกช่วง ${cnt("closed")}`, `Posted ${cnt("on")} · scheduled ${cnt("wait")} · late ${cnt("late")} · on hold ${cnt("hold")} · off hours ${cnt("closed")}`)}</p>
        <div class="rows">${infos.slice(0, S.devAll ? 99 : 5).map(({ b, pi }) => `<div class="row"><span class="st ${pi.st}"></span><div class="grow"><b>${esc(b.name)} ${pill(pi.pill, stCls(pi.st))}</b><span>${esc(pi.txt)}</span></div>${pi.st === "late" && !S.notified[b.id] ? btn("notify", L("แจ้งทาง LINE", "LINE them"), "sm", b.id) : ""}</div>`).join("")}</div>
        ${infos.length > 5 && !S.devAll ? `<button class="lnk" data-act="devall">${L(`ดูอีก ${infos.length - 5} แบรนด์`, `Show ${infos.length - 5} more`)}</button>` : ""}
        <p class="muted sm">${L("ครีเอเตอร์ยืนยันโพสต์ผ่านลิงก์ของแต่ละช่อง · ถ้าเลยเวลาเกิน 15 นาทีขึ้นเตือนที่นี่และส่ง LINE ถึง Director", "Creators confirm each post through the slot's link · 15 min late shows here and LINEs the Director")}</p></div></div>`;
  }

  function needsWork(b) { return S.status[b.id] !== "live" || postInfo(b).st === "late" || S.requests.some((r) => r.b === b.id && r.state === "new"); }
  function viewBrands() {
    const q = S.cl.q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const all = brands(), kinds = [...new Set(all.map((b) => kindOf(b)))];
    const hay = (b) => [b.name, ...[].concat(b.kind), b.accounts.join(" "), b.tags.join(" "), ...zonesOf(b).flat()].join(" ").toLowerCase();
    const list = all.filter((b) => q.every((t) => hay(b).includes(t)) && (!S.cl.kind || kindOf(b) === S.cl.kind) && (S.cl.f === "all" || (S.cl.f === "work" ? needsWork(b) : ["late", "hold"].includes(postInfo(b).st))));
    return `<div class="sec-h big"><div><h1>${L("แบรนด์", "Brands")}</h1><span>${L(`${all.length} แบรนด์ · แต่ละแบรนด์มี VIBES และแบบวันของตัวเอง`, `${all.length} brands · each has its own VIBES and day types`)}</span></div>${btn("ob", L("เพิ่มแบรนด์ใหม่", "Add a brand"), "pri")}</div>
      <div class="filters"><input id="cl-q" placeholder="${L("ค้นหาแบรนด์ หรือสาขา", "Search brands or branches")}" value="${esc(S.cl.q)}"><select id="cl-kind"><option value="">${L("ทุกประเภท", "All types")}</option>${kinds.map((k) => `<option ${S.cl.kind === k ? "selected" : ""}>${esc(k)}</option>`).join("")}</select>
        <div class="seg">${[["all", L("ทั้งหมด", "All")], ["work", L("มีงานต้องทำ", "Needs work")], ["issue", L("การโพสต์มีปัญหา", "Posting issues")]].map(([k, l]) => `<button class="${S.cl.f === k ? "on" : ""}" data-act="clf" data-v="${k}">${l}</button>`).join("")}</div></div>
      <p class="muted sm">${L(`แสดง ${list.length} จาก ${all.length} แบรนด์`, `Showing ${list.length} of ${all.length} brands`)}</p>
      <div class="bgrid">${list.map((b) => { const pi = postInfo(b), zs = zonesOf(b); return `<button class="bcard" data-act="open" data-v="${b.id}"><div class="bh">${dot(b)}<b>${esc(b.name)}</b>${pill(pi.pill, stCls(pi.st))}</div>
        <span class="muted sm">${esc(kindOf(b))} · ${zs.length > 1 ? L(`${zs.length} สาขา`, `${zs.length} branches`) : esc(tx(zs[0]))} · ${hh(b.open)}–${hh(b.close)}</span><p>${esc(tx(b.vibe))}</p>
        <div class="wbar">${b.week.map((tk, d) => `<i style="background:${b.types[tk].color}" title="${DS(d)} ${esc(typeName(b, tk))}">${DS(d)}</i>`).join("")}</div>
        <div class="bf">${packPill(b)}${stPill(b)}</div></button>`; }).join("") || `<div class="muted">${L("ไม่พบแบรนด์", "No brands found")}</div>`}</div>`;
  }

  /* ---------- workspace (MD: viewWorkspace + zoneBar) ---------- */
  const WSTABS = [["program", ["โปรแกรม", "Program"]], ["lists", ["Shortlists", "Shortlists"]], ["rec", ["แนะนำครีเอเตอร์", "Recommend"]], ["brand", ["แบรนด์ & กฎ", "Brand & rules"]], ["pack", ["แพ็กเกจ & สิทธิ์", "Package & rights"]]];
  function zoneBar(b) {
    const zs = zonesOf(b);
    if (zs.length < 2) return "";
    const zi = b.zi || 0;
    return `<div class="zonebar"><span class="muted sm">${L("สาขา", "Branch")}</span><div class="seg">${zs.map((z, i) => `<button class="${i === zi ? "on" : ""}" data-act="zone" data-v="${i}">${esc(tx(z))}</button>`).join("")}</div>
      ${b.sharedZone ? `<span class="muted sm">${L(`สาขานี้ใช้ตารางเดียวกับ ${esc(zname(b, 0))}`, `This branch uses the same schedule as ${esc(zname(b, 0))}`)}</span>${btn("zsplit", L("แยกตารางให้สาขานี้", "Give this branch its own schedule"), "sm", `${b.id}|${zi}`)}` : zi ? `<span class="muted sm">${L("สาขานี้มีตารางของตัวเอง · shortlist ใช้ร่วมกันทั้งแบรนด์", "This branch has its own schedule · shortlists are shared by the whole brand")}</span>` : ""}</div>`;
  }
  function viewWorkspace() {
    const b = wsB();
    const body = { program: wsProgram, lists: wsLists, rec: wsRecommend, brand: wsBrand, pack: wsPack }[S.wstab](b);
    return `<button class="lnk back" data-act="stab" data-v="brands">‹ ${L("แบรนด์ทั้งหมด", "All brands")}</button>
      <div class="sec-h big"><div><h1>${dot(b)} ${esc(b.name)}</h1><span>${esc(kindOf(b))} · ${zonesOf(b).length > 1 ? esc(zname(b)) + " · " : ""}${hh(b.open)}–${hh(b.close)} · ${esc(tx(b.vibe))}</span></div><div class="acts">${packPill(b)}${stPill(b)}</div></div>
      ${zoneBar(b)}<nav class="wtabs">${WSTABS.map(([k, l]) => `<button class="${S.wstab === k ? "on" : ""}" data-act="wstab" data-v="${k}">${tx(l)}</button>`).join("")}</nav>${body}`;
  }

  function diffNext(b) {
    const out = [];
    for (let di = 0; di < 7; di++) {
      const a = daySlots(b, di, "this"), n = daySlots(b, di, "next");
      n.forEach((sl, i) => { if (!a[i] || a[i].slId !== sl.slId) out.push({ di, sl, from: a[i] ? a[i].name : "-" }); });
    }
    return out;
  }
  const typeChanges = (b) => b.nextWeek.map((t, d) => (t !== b.week[d] ? d : -1)).filter((d) => d >= 0);
  function wsProgram(b) {
    const st = S.status[b.id], steps = ["draft", "review", "live"], w = WK(), d = diffNext(b), tc = typeChanges(b), busy = S.aiBusy === b.id;
    const aiBtn = (again) => btn("ai", busy ? L("AI กำลังร่าง…", "AI is drafting…") : I.spark + (again ? L("ให้ AI ร่างใหม่", "Redraft with AI") : L("ให้ AI ร่างให้ครบ", "Let AI draft the rest")), "", b.id, busy ? "disabled" : "");
    const acts = st === "draft" ? aiBtn(false) + btn("submit", L("ส่งให้ Director ตรวจ", "Send for Director review"), "pri", b.id)
      : st === "review" ? aiBtn(true) + btn("pubask", L("อนุมัติและเผยแพร่", "Approve and publish"), "pri", b.id)
      : btn("asbrand", L("ดูแบบที่แบรนด์เห็น", "See it as the brand"), "", b.id);
    const reqs = S.requests.filter((r) => r.b === b.id);
    const hol = HOLI.filter((h) => h.dn >= NOW.dn && h.dn < NOW.dn + 90).slice(0, 4);
    const diffTxt = d.length || tc.length ? L(`เปลี่ยนจากสัปดาห์นี้ ${d.length} ช่อง · แบบวันเปลี่ยน ${tc.length} วัน`, `${d.length} slot${d.length === 1 ? "" : "s"} changed from this week · ${tc.length} day type${tc.length === 1 ? "" : "s"} changed`) : L("เหมือนสัปดาห์นี้ทุกช่อง", "Same as this week in every slot");
    return `<div class="card"><div class="stepper">${steps.map((s, i) => `<span class="${s === st ? "on" : steps.indexOf(st) > i ? "done" : ""}">${i + 1}. ${tx(ST[s])}</span>`).join("<i>→</i>")}</div>
        <div class="card-h"><div><h2>${L("โปรแกรมสัปดาห์หน้า", "Next week's program")} · ${rangeLab(w.next)}${zonesOf(b).length > 1 ? " · " + esc(zname(b)) : ""}</h2><span class="muted sm">${L("AI ร่างได้ แต่แบรนด์เห็นเฉพาะที่ Director อนุมัติและเผยแพร่แล้ว", "AI can draft, but the brand only sees what the Director approves and publishes")}</span></div><div class="acts">${acts}</div></div>
        <div class="tools">${btn("copyweek", L("คัดลอกจากสัปดาห์นี้", "Copy from this week"), "sm", b.id)}<span class="muted sm">${diffTxt}</span>
          ${btn("diff", S.diff ? L("ซ่อนไฮไลต์", "Hide highlights") : L("ไฮไลต์ช่องที่เปลี่ยน", "Highlight changes"), "sm")}
          <label class="chk"><input type="checkbox" id="rot" ${S.rotate[ek(b)] !== false ? "checked" : ""}> ${L("หมุนเวียนครีเอเตอร์ทุกวัน · คนเดียวกันไม่โพสต์ช่วงเดิมซ้ำภายใน 3 วัน", "Rotate creators daily · nobody posts in the same slot twice within 3 days")}</label></div>
        <h3 class="mini-h">${L("แบบวัน", "Day types")} <span class="muted sm">${L("กดเพื่อสลับ", "tap to switch")}</span></h3>
        <div class="daytypes">${b.nextWeek.map((tk, di) => { const h = holOn(w.next + di); return `<button data-act="cycle" data-v="${di}" style="--tc:${b.types[tk].color}" title="${esc(typeName(b, tk))}${h ? " · " + esc(tx(h.n)) : ""}"><b>${DS(di)} ${ymd(w.next + di).d}</b><span>${esc(typeName(b, tk))}</span>${h ? `<em>${esc(tx(h.n))}</em>` : ""}</button>`; }).join("")}</div>
        <h3 class="mini-h">${L("ตาราง", "Schedule")} <span class="muted sm">${L("กดช่องเพื่อเลือก shortlist", "tap a slot to choose its shortlist")}</span></h3>${gridHTML(b, "next", true)}</div>
      <div class="cards3">
        <div class="card"><h2>${L("วันสำคัญที่กำลังมา", "Coming up")}</h2><div class="rows">${hol.map((h) => holRow(b, h)).join("") || `<div class="muted sm">${L("ไม่มีใน 90 วัน", "Nothing in the next 90 days")}</div>`}</div></div>
        <div class="card"><h2>${L("AI ร่างจากอะไร", "What the AI drafts from")}</h2><ul class="checks"><li><span class="ic ok">✓</span>${L("VIBES และกฎของแบรนด์ (ตรวจด้วยโค้ด)", "The brand's VIBES and rules (checked by code)")}</li><li><span class="ic ok">✓</span>${L("แบบวันและช่วงโพสต์", "Day types and posting slots")}</li><li><span class="ic ok">✓</span>${L("ชอบ / ไม่เอา ของแบรนด์", "The brand's likes / not this")}</li><li><span class="ic ok">✓</span>${L("เลือกได้เฉพาะครีเอเตอร์ในคลังเท่านั้น", "Only creators in the library")}</li></ul><p class="muted sm">${L("เฟส production: Brand Profile จาก brand book ผ่าน AI แบบเสียเงินที่ไม่นำข้อมูลไปเทรน (PDPA)", "Production phase: a Brand Profile from the brand book, through a paid AI that doesn't train on the data (PDPA)")}</p></div>
        <div class="card"><h2>${L("คำขอจากแบรนด์นี้", "Requests from this brand")}</h2><div class="rows">${reqs.map((r) => `<div class="row"><div class="grow"><b>${r.k ? tx(QUICK[r.k]) : L("คำขอ", "Request")} · ${esc(tx(r.when))}</b><span>${esc(tx(r.text))}</span></div>${pill(r.state === "done" ? L("ปรับแล้ว", "Done") : L("ใหม่", "New"), r.state === "done" ? "ok" : "warn")}</div>`).join("") || `<div class="muted sm">${L("ไม่มีคำขอ", "No requests")}</div>`}</div></div></div>`;
  }
  function holRow(b, h) {
    const w = WK(), inNext = h.dn >= w.next && h.dn < w.next + 7, di = h.dn - w.next;
    let a;
    if (h.k === "off" && inNext) a = b.nextWeek[di] === b.relaxed ? pill(L("ตั้งแล้ว", "Set"), "ok") : btn("holtype", L(`ใช้แบบ “${esc(typeName(b, b.relaxed))}”`, `Use “${esc(typeName(b, b.relaxed))}”`), "sm", h.dn);
    else if (h.k === "fest") a = (S.fest[b.id] || {})[h.d.join("-")] ? btn("pe", L("เตรียมแล้ว · ดูชุด", "Ready · see the set"), "sm", S.fest[b.id][h.d.join("-")]) : btn("holprep", L("เตรียมชุดเทศกาล", "Prepare a festive set"), "sm", h.dn);
    else a = btn("remind", L("เตือนล่วงหน้า", "Remind me"), "sm", h.dn);
    return `<div class="row"><div class="grow"><b>${esc(tx(h.n))}</b><span>${dLab(h.dn)} · ${h.k === "off" ? L("วันหยุด", "Holiday") : L("เทศกาล / วันช้อปปิ้ง", "Festival / shopping day")}</span></div>${a}</div>`;
  }

  function wsLists(b) {
    const Ls = Object.values(slOf(b)), f = S.plf || "all", q = (S.plq || "").toLowerCase();
    const shown = Ls.filter((l) => (!q || (l.name + " " + [].concat(l.mood).join(" ") + " " + l.creatorIds.map((id) => E.byId(id).handle).join(" ")).toLowerCase().includes(q)) && (f === "all" || (f === "used" ? usage(b, l.id).length : f === "unused" ? !usage(b, l.id).length : l.by === f)));
    return `<div class="sec-h"><div><h2>${L(`Shortlists ของ ${esc(b.name)}`, `${esc(b.name)} shortlists`)}</h2><span>${L("ช่วงโพสต์ในโปรแกรมชี้มาที่ shortlist เหล่านี้ · แก้ที่นี่ทุกช่องที่ใช้เปลี่ยนตาม · ใช้ร่วมกันทุกสาขา", "Program slots point at these shortlists · edit one here and every slot using it changes · shared by all branches")}</span></div><div class="acts">${btn("pe", L("สร้าง shortlist", "New shortlist"), "", "")}${btn("plai", I.spark + L("ให้ AI สร้าง", "Let AI build one"), "pri", "")}</div></div>
      <div class="filters"><input id="pl-q" placeholder="${L("ค้นหาชื่อ แนว หรือครีเอเตอร์", "Search name, mood or creator")}" value="${esc(S.plq || "")}"><div class="seg">${[["all", L("ทั้งหมด", "All")], ["used", L("ใช้อยู่", "In use")], ["unused", L("ยังไม่ใช้", "Unused")], ["MD", L("Director สร้าง", "By Director")], ["AI", L("AI สร้าง", "By AI")]].map(([k, l]) => `<button class="${f === k ? "on" : ""}" data-act="plf" data-v="${k}">${l}</button>`).join("")}</div></div>
      <div class="lgrid">${shown.map((l) => { const iss = l.creatorIds.map(E.byId).filter((c) => E.ruleBreak(c, b)); const u = usage(b, l.id).length; return `<button class="lcard" data-act="pe" data-v="${l.id}">${cover(l.name, l.hour)}<div><b>${esc(l.name)}</b><span>${l.creatorIds.length} ${L("คน", "creators")} · ${u ? L(`ใช้ ${u} ช่อง`, `in ${u} slots`) : L("ยังไม่ใช้", "unused")} · ${l.by === "AI" ? L("AI สร้าง", "by AI") : L("Director สร้าง", "by Director")}</span><div class="avs">${l.creatorIds.slice(0, 5).map((id) => av(E.byId(id), "sm")).join("")}</div>${iss.length ? `<span class="pill bad">${L(`${iss.length} คนผิดกฎแบรนด์`, `${iss.length} break brand rules`)}</span>` : ""}</div></button>`; }).join("") || `<div class="muted">${L("ไม่พบ shortlist", "No shortlists found")}</div>`}</div>`;
  }

  /* ---------- recommend tab (MD: wsRecommend) — one engine, "แนะนำ" + plain reason, never a score ---------- */
  function rcState(b) {
    if (!S.rc || S.rc.b !== ek(b)) S.rc = { b: ek(b), di: 0, i: 0, brief: "", trend: false, sel: [], showIn: false, explain: false };
    return S.rc;
  }
  function rcRun(b) {
    const rc = rcState(b), sls = daySlots(b, rc.di, "next"), sl = sls[Math.min(rc.i, sls.length - 1)];
    const hint = E.targetFromBrief(rc.brief), tt = E.buildTarget(engSlot(sl), b, hint);
    const others = sls.filter((x) => x !== sl && Math.abs(x.s - sl.s) <= 2).flatMap((x) => (listOf(b, x.slId) || { creatorIds: [] }).creatorIds);
    const res = E.rankFor(tt.target, b, { n: 14, trend: rc.trend, feedback: likedMap(b), blocked: blockedOf(b), recent: others });
    return { rc, sl, tt, res, list: listOf(b, sl.slId) };
  }
  function wsRecommend(b) {
    const { rc, sl, tt, res, list } = rcRun(b), T = tt.target, w = WK();
    const inIds = list ? list.creatorIds : [];
    const shown = res.picks.filter((p) => rc.showIn || !inIds.includes(p.c.id)).slice(0, 8);
    const used = {}, groups = {};
    res.excluded.forEach((x) => (groups[x.reason] = (groups[x.reason] || 0) + 1));
    const GR = { rule: L("ผิดกฎแบรนด์", "break brand rules"), banned: L("มีแท็กที่แบรนด์ห้าม", "have banned tags"), brand: L("แบรนด์กดไม่เอา", "the brand said no"), director: L("Director ไม่เอา", "the Director said no"), budget: L("เกินเพดานเรต", "over the rate cap"), platform: L("แพลตฟอร์มไม่ตรง", "wrong platform") };
    const SRC = { brief: L("บรีฟ", "brief"), slot: L("ช่วงโพสต์", "slot"), daypart: L("ช่วงของวัน", "time of day"), brand: L("แบรนด์", "brand") };
    const thaiN = Math.round((b.thaiShare || 0) * 10);
    const chips = [["+ ปังขึ้น", "+ bolder", "ปังขึ้น"], ["+ นุ่มลง", "+ softer", "นุ่มลง"], ["+ สายสุขภาพ", "+ wellness", "wellness"], ["+ คาเฟ่", "+ café", "cafe"], ["+ แฟชั่น", "+ fashion", "fashion"]];
    return `<div class="card"><h3 class="mini-h">${L("เลือกช่องในสัปดาห์หน้า", "Pick a slot next week")}</h3>
        <div class="daychips">${DS_.map((d, i) => `<button class="${i === rc.di ? "on" : ""}" data-act="rcday" data-v="${i}" style="--tc:${b.types[typeOf(b, i, "next")].color}"><b>${DS(i)}</b><span>${ymd(w.next + i).d}</span></button>`).join("")}</div>
        <div class="chips">${daySlots(b, rc.di, "next").map((x, i) => `<button class="${i === rc.i ? "on" : ""}" data-act="rcslot" data-v="${i}">${hh(x.s)} ${esc(x.name)}</button>`).join("")}</div></div>
      <div class="cards2"><div class="card"><h2>${L("ช่วงนี้ควรเป็นครีเอเตอร์แบบไหน", "What this slot needs")}</h2>
        <dl class="kv"><dt>${L("แนวคอนเทนต์", "Content")}</dt><dd>${T.tags.map(E.tagName).join(" · ")}</dd><dt>${L("โทน", "Tone")}</dt><dd>${E.energyWord(T.energy)}</dd><dt>${L("เป้า ER", "ER target")}</dt><dd>${L(`ตั้งแต่ ${T.erMin}% ขึ้นไป`, `${T.erMin}% or more`)}</dd><dt>${L("ภาษา", "Language")}</dt><dd>${L(`คอนเทนต์ไทยราว ${thaiN} ใน 10 คน`, `About ${thaiN} in 10 creators make Thai content`)}</dd><dt>${L("ลายเซ็นแบรนด์", "Brand signature")}</dt><dd>${esc(b.signature.name)} (${b.signature.tags.map(E.tagName).join(", ")})</dd><dt>${L("ตอนนี้ใช้", "Now using")}</dt><dd>${list ? esc(list.name) + " · " + list.creatorIds.length + L(" คน", " creators") : L("ยังไม่ได้เลือก", "Nothing yet")}</dd></dl></div>
        <div class="card"><h2>${L("อยากได้อะไรเพิ่ม", "Anything else?")} <span class="muted sm">${L("(ไม่บังคับ)", "(optional)")}</span></h2><input id="rc-brief" placeholder="${L("เช่น ขอนุ่มลง เน้นสายสุขภาพ", "e.g. softer, more wellness")}" value="${esc(rc.brief)}">
          <div class="chips">${chips.map((c) => `<button data-act="rcchip" data-v="${c[2]}">${L(c[0], c[1])}</button>`).join("")}</div>
          <label class="chk"><input type="checkbox" id="rc-trend" ${rc.trend ? "checked" : ""}> ${L("เน้นครีเอเตอร์ที่กำลังมาแรงช่วงนี้", "Favour creators who are trending now")}</label>
          <button class="lnk" data-act="rcexp">${rc.explain ? L("ซ่อน", "Hide") : L("AI เลือกครีเอเตอร์ยังไง", "How the AI picks creators")}</button>
          ${rc.explain ? `<div class="explain"><p><b>${L("ที่มาของเป้าหมาย", "Where the target comes from")}</b></p><div class="chips static">${tt.trace.tags.map((x) => `<span>${E.tagName(x.tag)} <em>${SRC[x.from]}</em></span>`).join("")}</div>
            <p>${L(`โทนมาจาก${tt.trace.energyFrom === "brief" ? "บรีฟ" : "ช่วงโพสต์"} · เป้า ER มาจาก${{ brief: "บรีฟ", slot: "ช่วงโพสต์", stage: `ขั้น ${stageName(sl.stage)}` }[tt.trace.erFrom]}`, `Tone from the ${tt.trace.energyFrom === "brief" ? "brief" : "slot"} · ER target from the ${{ brief: "brief", slot: "slot", stage: `${stageName(sl.stage)} stage` }[tt.trace.erFrom]}`)}</p>
            <p><b>${L("สูตรเดียวกับ Music Director", "Same formula as Music Director")}</b> ${L("แนวคอนเทนต์ ×3 · โทน ×2 · ER ×2 · ลายเซ็นแบรนด์ ×2 · ชอบ/ไม่เอา ×2 · ภาษา ×1 · กระแส ×1 (นับเมื่อติ๊ก)", "content ×3 · tone ×2 · ER ×2 · brand signature ×2 · likes/not this ×2 · language ×1 · trend ×1 (when ticked)")}</p>
            <p>${L("จากนั้นจัดลำดับใหม่: เอเจนซีเดียวกันไม่เกิน 2 คน ไม่ติดกัน และรักษาสัดส่วนคอนเทนต์ไทยของแบรนด์ · AI เลือกได้เฉพาะคนในคลัง ตัวเลขทุกตัวมาจากคลัง (ดู AI Guardrails)", "Then a rerank: at most 2 per agency, never back to back, and the brand's Thai share kept · the AI can only pick creators in the library, and every number comes from it (see AI Guardrails)")}</p></div>` : ""}</div></div>
      <div class="card"><div class="card-h"><div><h2>${L("ครีเอเตอร์ที่แนะนำ", "Recommended creators")}</h2><span class="muted sm">${rc.showIn ? L("รวมคนที่อยู่ใน shortlist แล้ว", "Including creators already in the shortlist") : L("ซ่อนคนที่อยู่ใน shortlist แล้ว", "Hiding creators already in the shortlist")}</span></div><div class="acts">${btn("rcin", rc.showIn ? L("ซ่อนคนที่มีแล้ว", "Hide those already in") : L("แสดงคนที่มีแล้ว", "Show those already in"), "sm")}${btn("rcall", L("เลือก 4 คนแรก", "Pick the top 4"), "sm")}</div></div>
        <div id="rc-res" class="rows">${shown.map((p) => `<label class="row pick"><input type="checkbox" data-rc="${p.c.id}" ${rc.sel.includes(p.c.id) ? "checked" : ""}>${av(p.c)}<div class="grow"><b>${esc(p.c.handle)} <i class="rtag">${I.spark}${L("แนะนำ", "Recommended")}</i>${inIds.includes(p.c.id) ? pill(L("อยู่ใน shortlist แล้ว", "Already in")) : ""}</b><span>${esc(p.c.platform)} · ${E.fmtK(p.c.followers)} · ${esc(E.agencyName(p.c.agency))}</span><span class="why-t">${esc(E.reasonOf(p, T, b, used))}</span></div></label>`).join("") || `<div class="muted">${L("ไม่มีคนที่ผ่านเกณฑ์เพิ่ม", "Nobody else passes the checks")}</div>`}</div>
        ${res.excluded.length ? `<details class="excl"><summary>${L(`ไม่แนะนำ ${res.excluded.length} คน เพราะ `, `${res.excluded.length} not recommended: `)}${Object.entries(groups).map(([k, n]) => `${GR[k]} ${n}`).join(" · ")}</summary>${res.excluded.map((x) => `<div class="rej"><b>${esc(x.c.handle)}</b> — ${esc(x.why)}</div>`).join("")}</details>` : ""}
        <div class="actbar"><span class="muted sm">${L(`เลือกแล้ว ${rc.sel.length} คน`, `${rc.sel.length} selected`)}</span>${btn("rcadd", L(`เพิ่มเข้า “${esc(list ? list.name : "-")}”`, `Add to “${esc(list ? list.name : "-")}”`), "", "", rc.sel.length && list ? "" : "disabled")}${btn("rcnew", L("สร้าง shortlist ใหม่ + ใช้กับช่องนี้", "New shortlist + use it here"), "pri", "", rc.sel.length >= 3 ? "" : "disabled")}</div>
        <p class="muted sm">${L("AI แนะนำเท่านั้น ไม่เปลี่ยนครีเอเตอร์เอง Director เป็นคนกดเพิ่มหรือสร้าง shortlist เสมอ", "The AI only recommends; it never changes creators itself — the Director always adds or builds the shortlist")}</p></div>`;
  }

  function wsBrand(b) {
    const r = b.rules || {}, rules = [r.familySafe && L("ต้อง family-safe", "Family-safe only"), r.noAlcohol && L("ห้ามคอนเทนต์แอลกอฮอล์", "No alcohol content"), r.adultOnly && L("ผู้ชม 20+ ห้ามสายครอบครัว", "20+ audience, no family creators"), r.conflict && L(`ห้ามติด exclusive หมวด ${r.conflict}`, `No exclusive ${r.conflict} contracts`), b.minFemale && L(`ผู้ชมผู้หญิง ≥ ${b.minFemale}%`, `Female audience ≥ ${b.minFemale}%`), b.minER && `ER ≥ ${b.minER}%`, (b.banned || []).length && L(`แท็กต้องห้าม: `, `Banned tags: `) + b.banned.map(E.tagName).join(", ")].filter(Boolean);
    const zs = zonesOf(b);
    return `<div class="cards2"><div class="card"><h2>VIBES</h2><p>${esc(tx(b.vibe))}</p><dl class="kv"><dt>${L("กลุ่มผู้ชม", "Audience")}</dt><dd>${esc(tx(b.audience))}</dd><dt>${L("ครีเอเตอร์อ้างอิง", "Reference creators")}</dt><dd>${esc(b.refs)}</dd><dt>${L("ลายเซ็นแบรนด์", "Brand signature")}</dt><dd>${esc(b.signature.name)} · ${b.signature.tags.map(E.tagName).join(", ")}</dd><dt>${L("แนวหลัก", "Core content")}</dt><dd>${b.tags.map(E.tagName).join(", ")}</dd><dt>${L("คอนเทนต์ไทย", "Thai content")}</dt><dd>${L(`ราว ${Math.round(b.thaiShare * 10)} ใน 10 คน`, `About ${Math.round(b.thaiShare * 10)} in 10 creators`)}</dd><dt>${L("สาขา", "Branches")}</dt><dd>${zs.map((z, i) => esc(tx(z)) + (i && !(BR[b.id].zoneProg || {})[i] ? L(" (ตารางร่วม)", " (shared schedule)") : "")).join(", ")}</dd></dl>
        <button class="btn" disabled>${L("อัปโหลด Brand book (เฟส production)", "Upload the brand book (production phase)")}</button></div>
      <div class="card"><h2>${L("กฎแบรนด์ (โค้ดตรวจ ไม่ได้ให้ AI จำเอง)", "Brand rules (checked by code, not remembered by the AI)")}</h2><ul class="checks">${rules.map((x) => `<li><span class="ic ok">✓</span>${esc(x)}</li>`).join("")}</ul><h3 class="mini-h">${L("โน้ตจากแบรนด์", "Notes from the brand")}</h3><ul class="notes">${b.notes.map((n) => `<li>${esc(tx(n))}</li>`).join("")}</ul></div>
      <div class="card"><h2>${L("แบบวัน", "Day types")}${zs.length > 1 ? " · " + esc(zname(b)) : ""}</h2>${Object.entries(b.types).map(([tk, t]) => `<div class="tblock" style="--tc:${t.color}"><b>${esc(tx(t.name))}</b> <span class="muted sm">${esc(tx(t.mood))} · ${L("สัปดาห์นี้", "this week")} ${daysLabel(b.week.map((x, d) => (x === tk ? d : -1)).filter((d) => d >= 0)) || "-"}</span><div class="rows">${t.slots.map((x) => `<div class="row"><span class="t">${hh(x[0])}–${hh(x[1])}</span><div class="grow"><b>${esc(x[2])}</b><span>${esc(tx(x[3]))} · ${E.vibeName(x[4])} · ${stageName(x[5])}</span></div></div>`).join("")}</div></div>`).join("")}</div>
      <div class="card"><h2>${L("ข้อมูลที่เก็บของแบรนด์นี้", "What we keep for this brand")}</h2><ul class="checks"><li><span class="ic ok">✓</span>${L("โปรไฟล์ กฎ และช่วงโพสต์ของแต่ละสาขา", "Profile, rules and each branch's posting hours")}</li><li><span class="ic ok">✓</span>${L("Post log เพื่อจ่ายค่าตอบแทนครีเอเตอร์ (ไม่ใช่ข้อมูลส่วนบุคคล)", "Post log to pay creators (not personal data)")}</li><li><span class="ic ok">✓</span>${L("ชอบ / ไม่เอา / คำขอ", "Likes / not this / requests")}</li><li><span class="ic bad">✕</span>${L("ไม่เก็บข้อมูลผู้ติดตามรายบุคคล", "No data on individual followers")}</li></ul></div></div>`;
  }
  function weekCost(b, wk) {
    const w = WK(), dn0 = wk === "next" ? w.next : w.this;
    let s = 0;
    zonesOf(b).forEach((z, zi) => { const v = zoneView(BR[b.id], zi); if (zi && v.sharedZone) return; for (let d = 0; d < 7; d++) postsOn(v, dn0 + d).forEach((p) => { if (p.c) s += p.c.rate; }); });
    return s;
  }
  function wsPack(b) {
    const cost = weekCost(b, "next"), zs = zonesOf(b);
    return `<div class="cards2"><div class="card"><h2>${L("แพ็กเกจ", "Package")}</h2><div class="seg"><button class="${S.pack[b.id] !== "pool" ? "on" : ""}" data-act="wpack" data-v="auto">${L("Autopilot · แพ็กฐาน", "Autopilot · base")}</button><button class="${S.pack[b.id] === "pool" ? "on" : ""}" data-act="wpack" data-v="pool">${L("Pool · พรีเมียม", "Pool · premium")}</button></div>
        <p class="muted sm">${L(`ราคา: ฐาน + เพิ่มตามจำนวนสาขา (ยังไม่สรุปตัวเลข) · ครอบคลุม ${zs.length} สาขา · Pool = แบรนด์เลือกโทนต่อช่วงได้ 3 แบบที่ Director อนุมัติแล้ว`, `Price: base + per branch (numbers not final) · covers ${zs.length} ${zs.length > 1 ? "branches" : "branch"} · Pool = the brand can pick one of 3 Director-approved tones per slot`)}</p></div>
      <div class="card"><h2>${L("งบค่าตอบแทนครีเอเตอร์", "Creator fee budget")}</h2><div class="big-n ${cost > b.budget ? "bad" : ""}">${E.baht(cost)} <small>/ ${E.baht(b.budget)} ${L("ต่อสัปดาห์", "a week")}</small></div><div class="meter"><i class="${cost > b.budget ? "over" : ""}" style="width:${Math.min(100, (cost / b.budget) * 100)}%"></i></div><p class="muted sm">${L("คิดจากโปรแกรมสัปดาห์หน้าของทุกสาขา: ค่าใช้จ่าย = เรตต่อโพสต์ × จำนวนโพสต์", "From next week's program in every branch: cost = rate per post × posts")} ${cost > b.budget ? `· <b class='bad'>${L("เกินงบ", "Over budget")}</b>` : L("· อยู่ในงบ", "· within budget")}</p></div>
      <div class="card"><h2>${L("สิทธิ์ใช้คอนเทนต์ & การระบุโฆษณา", "Content rights & ad disclosure")}</h2><dl class="kv"><dt>${L("สถานะ", "Status")}</dt><dd>${L("ใช้ได้ถึง 31 ธ.ค. 2569", "Valid until 31 Dec 2026")}</dd><dt>${L("ผู้ดูแลสัญญา", "Contract handled by")}</dt><dd>${L("MATCHROOM ในนามแบรนด์", "MATCHROOM on the brand's behalf")}</dd><dt>${L("ต่อสัญญา", "Renewal")}</dt><dd>${esc(tx(b.rep.renew))} · ${L("ระบบเตือนล่วงหน้า 30 วัน", "reminder 30 days ahead")}</dd></dl></div></div>`;
  }

  /* ---------- library (MD: viewLibrary) ---------- */
  function usedBy(id) { const out = []; brands().forEach((b) => Object.values(slOf(b)).forEach((l) => { if (l.creatorIds.includes(id)) out.push({ b, l }); })); return out; }
  function viewLibrary() {
    const F = S.lib, q = F.q.toLowerCase(), fb = F.brand ? BR[F.brand] : null, agencies = [...new Set(window.ROSTER.map((c) => c.agency))];
    let rows = window.ROSTER.filter((c) => (!q || (c.handle + " " + c.name + " " + c.tags.join(" ") + " " + c.tags.map(E.tagName).join(" ")).toLowerCase().includes(q)) && (!F.agency || c.agency === F.agency) && (!fb || usedBy(c.id).some((u) => u.b === fb)));
    rows = rows.sort(F.sort === "used" ? (a, z) => new Set(usedBy(z.id).map((u) => u.b)).size - new Set(usedBy(a.id).map((u) => u.b)).size : (a, z) => a.handle.localeCompare(z.handle));
    return `<div class="sec-h big"><div><h1>${L("คลังครีเอเตอร์", "Creator library")}</h1><span>${L(`คลังเดโม ${window.ROSTER.length} คน · ฐานข้อมูลเดียวที่ AI เลือกได้ ตัวเลขทุกตัวในแอปมาจากที่นี่`, `Demo library of ${window.ROSTER.length} creators · the only data the AI can pick from; every number in the app comes from here`)}</span></div></div>
      <div class="filters"><input id="lib-q" placeholder="${L("ค้นหา handle ชื่อ หรือแนว", "Search handle, name or content")}" value="${esc(F.q)}"><select id="lib-brand"><option value="">${L("ทุกแบรนด์", "All brands")}</option>${brands().map((b) => `<option value="${b.id}" ${F.brand === b.id ? "selected" : ""}>${esc(b.name)}</option>`).join("")}</select>
        <select id="lib-ag"><option value="">${L("ทุกเอเจนซี", "All agencies")}</option>${agencies.map((a) => `<option value="${esc(a)}" ${F.agency === a ? "selected" : ""}>${esc(E.agencyName(a))}</option>`).join("")}</select>
        <div class="seg"><button class="${F.sort === "name" ? "on" : ""}" data-act="libsort" data-v="name">${L("ชื่อ", "Name")}</button><button class="${F.sort === "used" ? "on" : ""}" data-act="libsort" data-v="used">${L("ใช้หลายแบรนด์ที่สุด", "Used by most brands")}</button></div></div>
      <div class="card"><div class="scroll-x"><table class="tbl"><thead><tr><th>${L("ครีเอเตอร์", "Creator")}</th><th>${L("เอเจนซี", "Agency")}</th><th>${L("แนว · โทน · ER", "Content · tone · ER")}</th><th class="r">${L("ผู้ติดตาม", "Followers")}</th><th class="r">${L("เรต/โพสต์", "Rate/post")}</th>${fb ? `<th>${L("กับ", "With")} ${esc(fb.name)}</th>` : ""}<th>${L("ใช้กับแบรนด์", "Used by")}</th></tr></thead><tbody>
      ${rows.map((c) => { const u = usedBy(c.id), bs = [...new Set(u.map((x) => x.b))]; const rb = fb && E.ruleBreak(c, fb); return `<tr><td><div class="who">${av(c)}<div><b>${esc(c.handle)}</b><span>${esc(c.name)} · ${esc(c.platform)}</span></div></div></td><td>${esc(E.agencyName(c.agency))}</td><td>${c.tags.map(E.tagName).join(", ")} · ${E.energyWord(c.energy)} · ER ${c.er}%</td><td class="r num">${E.fmtK(c.followers)}</td><td class="r num">${E.baht(c.rate)}</td>${fb ? `<td>${rb ? `<span class="pill bad" title="${esc(rb)}">${L("ผิดกฎ", "Breaks rules")}</span>` : `<span class="pill ok">${L("ใช้ได้", "OK")}</span>`}</td>` : ""}<td><button class="usedby" data-act="usedby" data-v="${c.id}">${bs.slice(0, 3).map(dot).join("")}<span>${bs.length ? L(`${bs.length} แบรนด์`, `${bs.length} brands`) : L("ยังไม่ใช้", "Unused")}</span></button></td></tr>`; }).join("")}
      </tbody></table></div></div>`;
  }

  /* ---------- reports (MD: viewReports) — last 14 days, every branch ---------- */
  function period() { const a = NOW.dn - 14, z = NOW.dn - 1; return { a, z, lab: `${dLab(a)} – ${dLab(z)}` }; }
  /** Every branch with its own program (shared branches post through the main one). */
  const progViews = (b) => zonesOf(b).map((z, zi) => zoneView(BR[b.id], zi)).filter((v) => !v.sharedZone);
  function postsIn(b, a, z) { const out = []; progViews(b).forEach((v) => { for (let dn = a; dn <= z; dn++) postsOn(v, dn).forEach((p) => p.c && out.push(p)); }); return out; }
  const pct = (r) => (r[1] ? Math.round((r[0] / r[1]) * 100) + "%" : "-");
  function health() {
    const out = [];
    brands().forEach((b) => {
      const [n, t] = b.rep.onTime;
      if (t && n / t < 0.95) out.push(["crit", L(`${b.name} โพสต์ตรงเวลา ${Math.round((n / t) * 100)}% (ต่ำกว่า 95%)`, `${b.name} posted on time ${Math.round((n / t) * 100)}% (below 95%)`)]);
      if (S.status[b.id] !== "live") out.push(["warn", L(`${b.name} · โปรแกรมสัปดาห์หน้ายัง${tx(ST[S.status[b.id]])}`, `${b.name} · next week's program is still: ${tx(ST[S.status[b.id]])}`)]);
      if (S.requests.some((r) => r.b === b.id && r.state === "new")) out.push(["warn", L(`${b.name} มีคำขอที่ยังไม่ได้ปรับ`, `${b.name} has open requests`)]);
      if (S.pack[b.id] !== "pool" && b.rep.reqPast >= 3) out.push(["info", L(`${b.name} ขอปรับ ${b.rep.reqPast} ครั้งใน 14 วัน · ลองเสนอแพ็ก Pool`, `${b.name} asked for ${b.rep.reqPast} changes in 14 days · offer the Pool package`)]);
    });
    const kora = E.rankFor({ erMin: 0, erMax: 99, energy: 3, tags: [], daypart: "afternoon" }, BR.kora, { n: 99 }).picks.length;
    out.push(["warn", L(`คลังครีเอเตอร์ ${window.ROSTER.length} คน · แบรนด์ที่กฎเข้มอย่าง Kora Skin Lab มีคนผ่านเกณฑ์แค่ ${kora} คน`, `The library has ${window.ROSTER.length} creators · a strict brand like Kora Skin Lab has only ${kora} who pass`)]);
    out.push(["info", L("สัญญาสิทธิ์ใช้คอนเทนต์ของทุกแบรนด์หมดอายุ 31 ธ.ค. 2569", "Every brand's content-rights contract ends 31 Dec 2026")]);
    return out;
  }
  function viewReports() {
    const P = period(), tabs = [["overview", L("ภาพรวม", "Overview")], ["brands", L("แบรนด์", "Brands")], ["creators", L("ครีเอเตอร์", "Creators")], ["pay", L("ค่าตอบแทน", "Creator fees")]];
    const body = { overview: repOverview, brands: repBrands, creators: repCreators, pay: repPay }[S.rtab](P);
    return `<div class="sec-h big"><div><h1>${L("รายงาน", "Reports")}</h1><span>${P.lab} (${L("14 วันที่ผ่านมา · คำนวณจากโปรแกรมจริงของแต่ละวันและแต่ละสาขา", "last 14 days · from each day's and each branch's real program")})</span></div>${btn("csv", I.dl + L("ส่งออก CSV", "Export CSV"))}</div>
      <nav class="wtabs">${tabs.map(([k, l]) => `<button class="${S.rtab === k ? "on" : ""}" data-act="rtab" data-v="${k}">${l}</button>`).join("")}</nav>${body}`;
  }
  function repOverview(P) {
    const all = brands(), posts = all.flatMap((b) => postsIn(b, P.a, P.z));
    const onN = all.reduce((s, b) => s + b.rep.onTime[0], 0), onT = all.reduce((s, b) => s + b.rep.onTime[1], 0);
    const likes = all.reduce((s, b) => s + b.rep.likes, 0) + S.liked.size;
    let ai = 0, tot = 0;
    all.forEach((b) => progViews(b).forEach((v) => { for (let d = 0; d < 7; d++) daySlots(v, d, "next").forEach((sl) => { tot++; if (srcOf(v, sl) === "AI") ai++; }); }));
    const daily = [];
    for (let dn = P.a; dn <= P.z; dn++) daily.push({ dn, n: all.reduce((s, b) => s + progViews(b).reduce((t, v) => t + postsOn(v, dn).filter((p) => p.c).length, 0), 0), t: all.reduce((s, b) => s + progViews(b).reduce((t, v) => t + slotsOn(v, dn).length, 0), 0) });
    const mx = Math.max(...daily.map((d) => d.t));
    const hrs = Math.round(all.reduce((s, b) => s + b.rep.reqHrs, 0) / all.length);
    const tiles = [[L("โพสต์ทั้งหมด", "Posts"), posts.length], [L("โพสต์ตรงเวลา", "On time"), pct([onN, onT])], [L("แบรนด์กดชอบ", "Brand likes"), likes], [L(`คำขอ · ตอบใน ~${hrs} ชม.`, `Requests · answered in ~${hrs} h`), S.requests.length], [L("AI ช่วยร่าง", "AI-drafted"), Math.round((ai / Math.max(1, tot)) * 100) + "%"], [L("ความจุ Director", "Director capacity"), L(`~${Math.floor(2400 / 45)} แบรนด์/คน`, `~${Math.floor(2400 / 45)} brands each`)]];
    return `<div class="tiles">${tiles.map(([l, v]) => `<div class="tile"><span>${l}</span><b>${v}</b></div>`).join("")}</div>
      <div class="cards2"><div class="card"><h2>${L("ต้องดูแล", "Needs attention")}</h2><div class="rows">${health().map(([k, t]) => `<div class="row"><span class="st ${k === "crit" ? "late" : k === "warn" ? "hold" : "on"}"></span><div class="grow"><b>${esc(t)}</b></div></div>`).join("")}</div></div>
      <div class="card"><h2>${L("โพสต์รายวัน", "Posts per day")}</h2><div class="chart">${daily.map((d) => `<i style="height:${(d.n / mx) * 100}%" title="${dLab(d.dn)} · ${L(`${d.n} จาก ${d.t} ช่อง`, `${d.n} of ${d.t} slots`)}"><em style="bottom:${(d.t / mx) * 100}%"></em></i>`).join("")}</div><div class="axis"><span>${dLab(P.a)}</span><span>${dLab(P.z)}</span></div><p class="muted sm">${L("แท่ง = โพสต์ที่ออกจริง · เส้น = ช่องโพสต์ทั้งหมดของวัน (ช่องที่ไม่มีคนว่างจะไม่มีโพสต์)", "Bars = posts that went out · line = all slots that day (a slot with nobody free has no post)")}</p></div></div>`;
  }
  function repBrands(P) {
    return `<div class="card"><div class="scroll-x"><table class="tbl"><thead><tr><th>${L("แบรนด์", "Brand")}</th><th class="r">${L("โพสต์", "Posts")}</th><th class="r">${L("ตรงเวลา", "On time")}</th><th class="r">${L("กดชอบ", "Likes")}</th><th class="r">${L("คำขอ", "Requests")}</th><th>${L("สัปดาห์หน้า", "Next week")}</th><th></th></tr></thead><tbody>
      ${brands().map((b) => `<tr><td>${dot(b)} ${esc(b.name)}</td><td class="r num">${postsIn(b, P.a, P.z).length}</td><td class="r num">${pct(b.rep.onTime)}</td><td class="r num">${b.rep.likes}</td><td class="r num">${S.requests.filter((r) => r.b === b.id).length}</td><td>${pill(tx(ST[S.status[b.id]]), S.status[b.id] === "live" ? "ok" : "warn")}</td><td>${btn("crep", L("รายงานถึงแบรนด์", "Report to the brand"), "sm", b.id)}</td></tr>`).join("")}</tbody></table></div></div>`;
  }
  function agg(posts) {
    const m = {};
    posts.forEach((p) => { const a = (m[p.c.id] = m[p.c.id] || { c: p.c, n: 0 }); a.n++; });
    return Object.values(m).map((a) => ({ ...a, views: a.c.avgViews * a.n, eng: Math.round((a.c.avgViews * a.n * a.c.er) / 100), cost: a.c.rate * a.n })).sort((x, y) => y.n - x.n || y.eng - x.eng);
  }
  const FORMULA = () => `<div class="formula">${L("สูตร (ไม่มีตัวเลขที่ AI สร้างเอง):", "Formulas (no number is made up by the AI):")} <code>views = avgViews × ${L("โพสต์", "posts")}</code> · <code>engagements = views × ER%</code> · <code>${L("ค่าใช้จ่าย", "cost")} = rate × ${L("โพสต์", "posts")}</code></div>`;
  function repCreators(P) {
    const rows = agg(brands().flatMap((b) => postsIn(b, P.a, P.z)));
    const need = brands().map((b) => { const have = E.rankFor({ erMin: 0, erMax: 99, energy: 3, tags: [], daypart: "afternoon" }, b, { n: 99, blocked: blockedOf(b) }).picks.length; const per = Math.max(...progViews(b).flatMap((v) => Object.values(v.types).map((t) => t.slots.length))); return { b, have, need: per * 3 }; });
    const removed = [...S.disliked].map((k) => k.split("|"));
    return `<div class="cards2"><div class="card"><h2>${L("คลังพอสำหรับกฎ “ไม่ซ้ำช่วงเดิมภายใน 3 วัน” ไหม", "Is the library big enough for the 3-day rule?")}</h2><div class="rows">${need.map((x) => `<div class="row">${dot(x.b)}<div class="grow"><b>${esc(x.b.name)}</b><span>${L(`ผ่านกฎแบรนด์ ${x.have} คน · ต้องใช้ราว ${x.need} คน`, `${x.have} pass the brand rules · about ${x.need} needed`)}</span></div>${pill(x.have >= x.need ? L("พอ", "Enough") : L("ไม่พอ", "Too few"), x.have >= x.need ? "ok" : "bad")}</div>`).join("")}</div><p class="muted sm">${L("ต้องใช้ = จำนวนช่องต่อวัน × 3 · ถ้าไม่พอ ระบบยอมให้ซ้ำและขึ้นว่าช่องนั้นไม่มีคนว่าง · เฟส production ต้องเพิ่มครีเอเตอร์ในคลัง", "Needed = slots per day × 3 · when there are too few, repeats are allowed and the slot shows nobody free · production needs a bigger library")}</p></div>
      <div class="card"><h2>${L("ถูกตัดออกโดยแบรนด์", "Removed by brands")}</h2><div class="rows">${removed.map(([bid, id]) => `<div class="row">${av(E.byId(id))}<div class="grow"><b>${esc(E.byId(id).handle)}</b><span>${L(`${esc(BR[bid].name)} กด “ไม่เอาคนนี้”`, `${esc(BR[bid].name)} pressed “Not this creator”`)}</span></div></div>`).join("") || `<div class="muted sm">${L("ยังไม่มี", "None yet")}</div>`}</div></div></div>
      <div class="card"><h2>${L("รายครีเอเตอร์ · ทุกแบรนด์", "By creator · all brands")}</h2><div class="scroll-x"><table class="tbl"><thead><tr><th>${L("ครีเอเตอร์", "Creator")}</th><th class="r">${L("โพสต์", "Posts")}</th><th class="r">Views</th><th class="r">Engagements</th><th class="r">${L("ค่าใช้จ่าย", "Cost")}</th><th class="r">฿/Eng.</th></tr></thead><tbody>
      ${rows.map((r) => `<tr><td><div class="who">${av(r.c)}<div><b>${esc(r.c.handle)}</b><span>${esc(E.agencyName(r.c.agency))}</span></div></div></td><td class="r num">${r.n}</td><td class="r num">${r.views.toLocaleString()}</td><td class="r num">${r.eng.toLocaleString()}</td><td class="r num">${E.baht(r.cost)}</td><td class="r num">${E.baht(r.cost / Math.max(1, r.eng))}</td></tr>`).join("")}</tbody></table></div>${FORMULA()}</div>`;
  }
  function repPay(P) {
    const per = brands().map((b) => ({ b, cost: postsIn(b, P.a, P.z).reduce((s, p) => s + p.c.rate, 0) }));
    const total = per.reduce((s, x) => s + x.cost, 0), ag = {};
    brands().forEach((b) => postsIn(b, P.a, P.z).forEach((p) => { const a = (ag[p.c.agency] = ag[p.c.agency] || { n: 0, cost: 0 }); a.n++; a.cost += p.c.rate; }));
    return `<div class="tiles"><div class="tile"><span>${L("ค่าตอบแทนรวม 14 วัน", "Creator fees, 14 days")}</span><b>${E.baht(total)}</b></div><div class="tile"><span>${L("จำนวนเอเจนซี", "Agencies")}</span><b>${Object.keys(ag).length}</b></div><div class="tile"><span>${L("งบรวม 2 สัปดาห์", "Budget, 2 weeks")}</span><b>${E.baht(brands().reduce((s, b) => s + b.budget * 2, 0))}</b></div></div>
      <div class="cards2"><div class="card"><h2>${L("แยกตามเอเจนซี", "By agency")}</h2><table class="tbl"><thead><tr><th>${L("เอเจนซี", "Agency")}</th><th class="r">${L("โพสต์", "Posts")}</th><th class="r">${L("ยอดจ่าย", "To pay")}</th></tr></thead><tbody>${Object.entries(ag).sort((a, z) => z[1].cost - a[1].cost).map(([a, x]) => `<tr><td>${esc(E.agencyName(a))}</td><td class="r num">${x.n}</td><td class="r num">${E.baht(x.cost)}</td></tr>`).join("")}</tbody></table></div>
      <div class="card"><h2>${L("แยกตามแบรนด์ (เทียบงบ)", "By brand (against budget)")}</h2><table class="tbl"><thead><tr><th>${L("แบรนด์", "Brand")}</th><th class="r">${L("ใช้ไป", "Spent")}</th><th class="r">${L("งบ 2 สัปดาห์", "2-week budget")}</th></tr></thead><tbody>${per.map((x) => `<tr><td>${dot(x.b)} ${esc(x.b.name)}</td><td class="r num ${x.cost > x.b.budget * 2 ? "bad" : ""}">${E.baht(x.cost)}</td><td class="r num">${E.baht(x.b.budget * 2)}</td></tr>`).join("")}</tbody></table></div>
      <div class="card"><h2>${L("ต้องส่ง", "Due")}</h2><div class="rows"><div class="row"><div class="grow"><b>${L("สรุปค่าตอบแทนส่งเอเจนซี", "Fee summary to agencies")}</b><span>${L("ภายในสิ้นเดือน · CSV รายโพสต์", "By month end · CSV per post")}</span></div></div><div class="row"><div class="grow"><b>${L("รายงานโพสต์ + หลักฐานการระบุโฆษณา ส่งแบรนด์", "Post report + ad-disclosure proof to brands")}</b><span>${L("ภายในวันที่ 5 ของเดือนถัดไป", "By the 5th of the next month")}</span></div></div></div></div></div>${FORMULA()}`;
  }

  /* ---------- AI Guardrails (kept from the first mockup) ---------- */
  function viewGuard() {
    const b = B(), last = S.runs.slice(-6).reverse();
    const P7 = [
      [L("เลือกได้แค่จากคลัง", "Library only"), L("AI ตอบเป็น id ครีเอเตอร์เท่านั้น id ที่ไม่มีอยู่จริงถูกตัดทิ้ง", "The AI answers with creator ids only; ids that don't exist are dropped")],
      [L("ตัวเลขต้องตรงคลัง", "Numbers must match"), L("followers / ER / rate ที่ AI อ้าง ถ้าไม่ตรงใช้ค่าจริงแทนและบันทึกไว้", "Followers / ER / rate the AI quotes are replaced by the real values and logged")],
      [L("กฎแบรนด์ตรวจด้วยโค้ด", "Brand rules in code"), L("ไม่ใช่ให้ AI “จำ” เอง (ห้ามแอลกอฮอล์, exclusive, ผู้ชมหญิง ≥ 70%)", "Not left for the AI to “remember” (no alcohol, exclusives, female audience ≥ 70%)")],
      [L("งบรวมต้องไม่เกิน", "Budget can't overflow"), L("นับสะสมทีละคน คนที่ทำให้เกินงบถูกตัด", "Counted one by one; whoever pushes it over is dropped")],
      [L("วันว่างจริง", "Real availability"), L("คนที่ไม่ว่างวันไหน ระบบข้ามไปคนถัดไปใน shortlist", "A creator who is busy that day is skipped for the next one in the shortlist")],
      [L("เหตุผลอ้างอิงข้อมูล", "Reasons from data"), L("ทุกเหตุผลสร้างจากฟิลด์จริง และแบรนด์ไม่เห็นคะแนน", "Every reason is built from real fields, and brands never see a score")],
      [L("AI แนะนำ Director ตัดสิน", "AI suggests, Director decides"), L("ทุกอย่างที่ AI ร่างต้องผ่านการอนุมัติก่อนแบรนด์เห็น", "Everything the AI drafts is approved before the brand sees it")],
    ];
    return `<div class="sec-h big"><div><h1>AI Guardrails</h1><span>${L(`AI ถูกกันไม่ให้ “แต่งข้อมูล” อย่างไร · ใช้แบรนด์ ${esc(b.name)} (เปลี่ยนได้ที่แถบบนสุด)`, `How the AI is kept from “making things up” · using ${esc(b.name)} (change it in the top bar)`)}</span></div></div>
      <div class="cards2"><div class="card"><h2>${L("หลักการ", "Principles")}</h2><ul class="checks">${P7.map(([h, t], i) => `<li><span class="ic ok">${i + 1}</span><span><b>${h}</b> — ${t}</span></li>`).join("")}</ul></div>
      <div class="card"><h2>${L("บันทึกการทำงานของ AI", "AI activity log")}</h2><div class="rows">${last.map((r) => `<div class="row"><div class="grow"><b>${esc(tx(r.kind))} · ${esc(r.brand)}</b><span>${esc(r.at)} · ${esc(tx(r.summary))}</span></div></div>`).join("") || `<div class="muted sm">${L("ยังไม่มีการรัน AI", "The AI hasn't run yet")}</div>`}</div></div></div>
      <div class="card"><div class="card-h"><div><h2>${L("ทดสอบ: จำลองคำตอบ LLM ที่ “มั่ว”", "Test: a made-up LLM answer")}</h2><span class="muted sm">${L(`มีครีเอเตอร์ปลอม ตัวเลขเกินจริง คนผิดกฎ และงบล้น · งบทดสอบ ${E.baht(Math.round(b.budget * 0.2))} = 20% ของงบสัปดาห์`, `With a fake creator, inflated numbers, rule breakers and an overflowing budget · test budget ${E.baht(Math.round(b.budget * 0.2))} = 20% of a week`)}</span></div>${btn("sim", I.spark + L("จำลองคำตอบ", "Simulate"), "pri")}</div>${S.sim === b.id ? simHtml(b) : ""}</div>`;
  }
  function simHtml(b) {
    const cap = Math.round(b.budget * 0.2), raw = E.fakeLLMReply(b), res = E.validateReply(raw, b, cap), kept = res.rows.filter((r) => r.ok).length;
    return `<p class="muted sm">${L("คำตอบดิบจาก “LLM” (ยังไม่ผ่านการตรวจ):", "Raw “LLM” answer (not checked yet):")}</p><pre class="raw">${esc(JSON.stringify(raw, null, 2))}</pre>
      <p class="muted sm">${L(`ผลการตรวจ: ผ่าน ${kept}/${res.rows.length} · ใช้งบจริง ${E.baht(res.spent)} / ${E.baht(cap)}`, `Result: ${kept}/${res.rows.length} pass · real spend ${E.baht(res.spent)} / ${E.baht(cap)}`)}</p>
      ${res.rows.map((r) => `<div class="vrow"><span class="ic ${r.ok ? (r.fixed && r.fixed.length ? "warn" : "ok") : "bad"}">${r.ok ? (r.fixed && r.fixed.length ? "!" : "✓") : "✕"}</span><div><b>${esc(r.item.handle || r.item.id)}</b> <span class="muted">— ${esc(r.item.note || "")}</span><div class="muted">${esc(r.why)}</div></div></div>`).join("")}`;
  }
  /** kind and summary are [th, en] pairs, so the log reads right after a language switch. */
  function logRun(kind, summary, b) { S.runs.push({ kind, summary, brand: (b || B()).name, at: hmm(NOW.min) }); S.runs = S.runs.slice(-30); }

  /* ======================================================================================
     MODALS
     ====================================================================================== */
  const sheet = (title, sub, body, foot, cls = "") => `<div class="modal" role="dialog" aria-modal="true"><div class="bd" data-act="close"></div><div class="mc ${cls}"><div class="mh"><div><b>${title}</b>${sub ? `<span>${sub}</span>` : ""}</div><button class="x" data-act="close" aria-label="${L("ปิด", "Close")}">${I.x}</button></div><div class="mb">${body}</div>${foot ? `<div class="mf">${foot}</div>` : ""}</div></div>`;
  function slotFromKey(b, v) { const [wk, di, i] = v.split("|"); return daySlots(b, +di, wk)[+i]; }
  const cancelBtn = () => `<button class="btn" data-act="close">${L("ยกเลิก", "Cancel")}</button>`;

  /** Brand: a slot's shortlist (MD: playlistModal). */
  function mSlview() {
    const b = B(), M = S.modal, sl = slotFromKey(b, M.v), w = WK(), dn = (sl.wk === "next" ? w.next : w.this) + sl.di;
    const v = S.pack[b.id] === "pool" ? M.var || 0 : 0, l = v ? varList(b, sl, v) : listOf(b, sl.slId), p = postsOn(b, dn)[sl.i];
    const body = `<div class="mhero">${cover(l ? l.name : sl.name, sl.s)}<div><b>${esc(l ? l.name : sl.name)}</b><span>${dLab(dn)} · ${hh(sl.s)}–${hh(sl.e)} · ${esc(tx(sl.mood))}</span><span>${stageName(sl.stage)} · ${l ? l.creatorIds.length : 0} ${L("คน", "creators")}</span></div></div>
      ${S.pack[b.id] === "pool" ? `<div class="seg">${VAR.map((x, i) => `<button class="${v === i ? "on" : ""}" data-act="mvar" data-v="${i}">${tx(x.n)}</button>`).join("")}</div>` : ""}
      <div class="rows">${(l ? l.creatorIds : []).map((id, k) => { const c = E.byId(id), cur = !v && p && p.c && p.c.id === id; return `<div class="row ${cur ? "cur" : ""}"><span class="n">${k + 1}</span>${av(c)}<div class="grow"><b>${esc(c.handle)}</b><span>${esc(c.platform)} · ${esc(c.name)}</span></div>${cur ? pill(L("โพสต์วันนั้น", "Posts that day")) : ""}${S.disliked.has(b.id + "|" + id) ? pill(L("ไม่ใช้แล้ว", "Removed"), "bad") : ""}</div>`; }).join("")}</div>
      <div class="lockline">${I.lock}<span>${L("โพสต์อัตโนมัติตามเวลา · แบรนด์เลือกครีเอเตอร์เองไม่ได้ อยากปรับกด “ขอปรับ”", "Posts go out on time automatically · brands can't pick creators — tap “Ask for a change” instead")}</span></div>`;
    return sheet(L("Shortlist ของช่องนี้", "This slot's shortlist"), "", body, btn("req", L("ขอปรับ", "Ask for a change")));
  }
  /** Brand: request a change (MD: requestModal "ขอปรับเพลง"). */
  function mReq() {
    const b = B(), M = S.modal, n = nowOf(b), w = WK();
    const days = []; for (let dn = NOW.dn; dn < w.next + 7; dn++) days.push(dn);
    const times = [["now", L("ช่วงนี้", "This slot")], ["all", L("ทั้งวัน", "All day")], ...daySlots(b, NOW.day, "this").map((sl) => [String(sl.i), `${hh(sl.s)}–${hh(sl.e)} ${sl.name}`])];
    const EV = [["เปิดตัวสินค้าใหม่", "Product launch"], ["โปรโมชันสุดสัปดาห์", "Weekend promotion"], ["อีเวนต์หน้าร้าน", "In-store event"], ["อื่น ๆ", "Other"]];
    const body = `<div class="chips">${Object.entries(QUICK).map(([k, l]) => `<button class="${M.k === k ? "on" : ""}" data-act="rqk" data-v="${k}">${tx(l)}</button>`).join("")}</div>
      ${M.k === "creator" && n && n.post.c ? `<div class="row">${av(n.post.c)}<div class="grow"><b>${esc(n.post.c.handle)}</b><span>${L("กำลังโพสต์ช่วงนี้", "Posting in this slot")}</span></div></div>` : ""}
      ${M.k === "event" ? `<label class="fld"><span>${L("แคมเปญ", "Campaign")}</span><select id="rq-ev">${EV.map((e, i) => `<option value="${i}">${tx(e)}</option>`).join("")}</select></label>` : ""}
      <div class="row2"><label class="fld"><span>${L("วัน", "Day")}</span><select id="rq-day">${days.map((dn) => `<option value="${dn}">${dn === NOW.dn ? L("วันนี้ · ", "Today · ") : ""}${dLab(dn)}</option>`).join("")}</select></label>
        <label class="fld"><span>${L("เวลา", "Time")}</span><select id="rq-time">${times.map(([v, l]) => `<option value="${v}">${esc(l)}</option>`).join("")}</select></label></div>
      <label class="fld"><span>${L("รายละเอียด (ไม่บังคับ)", "Details (optional)")}</span><textarea id="rq-text" rows="3" placeholder="${L("เช่น ขอโทนรีวิวนุ่มลง ไม่ขายของแรง", "e.g. softer reviews, less hard selling")}">${esc(M.text || "")}</textarea></label>
      ${M.err ? `<p class="bad sm">${M.err}</p>` : ""}`;
    return sheet(L("ขอปรับ", "Ask for a change"), L("ส่งถึง Director ผู้ดูแลแบรนด์นี้ · ปกติตอบภายในวันทำการ", "Goes to this brand's Director · usually answered within a working day"), body, `${cancelBtn()}<button class="btn pri" data-act="rqsend">${L("ส่งถึง Director", "Send to the Director")}</button>`);
  }
  function mHist() {
    const b = B(), q = (S.modal.q || "").toLowerCase();
    const ps = postsOn(b, NOW.dn).filter((p) => p.c && p.at <= NOW.min && (!q || (p.c.handle + " " + hmm(p.at) + " " + p.slot.name).toLowerCase().includes(q))).reverse();
    return sheet(L("โพสต์วันนี้", "Today's posts"), L(`${ps.length} โพสต์ · ค้นจากชื่อ หรือเวลา เช่น “12:”`, `${ps.length} posts · search a name or a time, e.g. “12:”`), `<input id="h-q" placeholder="${L("ค้นหา", "Search")}" value="${esc(S.modal.q || "")}"><div class="rows">${ps.map((p) => histRow(b, p)).join("") || `<div class="muted sm">${L("ไม่พบ", "Nothing found")}</div>`}</div>`, "");
  }
  function mCert() {
    const b = B();
    return sheet(L("สิทธิ์ใช้คอนเทนต์ & การระบุโฆษณา", "Content rights & ad disclosure"), L("เอกสารตัวอย่าง", "Sample document"), `<div class="cert"><i class="wm">${L("ตัวอย่าง", "SAMPLE")}</i><h3>${L("หนังสือยืนยันสิทธิ์ใช้คอนเทนต์", "Content usage rights confirmation")}</h3><p>${L(`แบรนด์ <b>${esc(b.name)}</b> ได้รับสิทธิ์รีโพสต์คอนเทนต์ของครีเอเตอร์ในโปรแกรม MATCHROOM บนบัญชี ${b.accounts.join(", ")} เป็นเวลา 90 วันนับจากวันโพสต์`, `<b>${esc(b.name)}</b> may repost content from creators in its MATCHROOM program on ${b.accounts.join(", ")} for 90 days from the posting date.`)}</p><p>${L("ทุกโพสต์ระบุว่าเป็นโฆษณาด้วย #โฆษณา หรือ Paid partnership", "Every post is marked as an ad with #ad or Paid partnership.")}</p><p>${L("ผู้ดูแลสัญญา: MATCHROOM ในนามแบรนด์ · ใช้ได้ถึง 31 ธ.ค. 2569", "Contract handled by MATCHROOM on the brand's behalf · valid until 31 Dec 2026")}</p></div>`, "");
  }
  /** Export preview (MD: exportModal). PDF prints, Excel downloads, image is a toast (as in MD). */
  function mExp() {
    const b = B(), M = S.modal, w = WK(), wk = S.wk === "next" && S.status[b.id] === "live" ? "next" : "this", dn0 = wk === "next" ? w.next : w.this;
    const names = {};
    for (let di = 0; di < 7; di++) daySlots(b, di, wk).forEach((sl) => ((names[sl.slId] = names[sl.slId] || { sl, ds: [] }).ds.push(di)));
    const page1 = `<div class="paper"><div class="ph"><b>${esc(b.name)}${zonesOf(b).length > 1 ? " · " + esc(zname(b)) : ""} · ${L("ตารางโพสต์ประจำสัปดาห์", "Weekly posting schedule")}</b><span>${L(`สัปดาห์ ${rangeLab(dn0)} · จัดโดย MATCHROOM Influencer Director · สิทธิ์ใช้คอนเทนต์ถึง 31 ธ.ค. 2569 · ข้อมูลตัวอย่าง`, `Week of ${rangeLab(dn0)} · curated by MATCHROOM Influencer Director · content rights until 31 Dec 2026 · sample data`)}</span></div>${gridHTML(b, wk, false)}${legend(b, wk)}</div>`;
    const page2 = `<div class="paper"><div class="ph"><b>${L("รายชื่อครีเอเตอร์ในแต่ละ shortlist", "Creators in each shortlist")}</b><span>${L("หมุนเวียนกันโพสต์ทีละวัน", "They take turns, one a day")}</span></div>${Object.values(names).map(({ sl, ds }) => { const l = listOf(b, sl.slId); return `<div class="p2"><b>${esc(sl.name)}</b> <span class="muted sm">${daysLabel([...new Set(ds)].sort())} · ${hh(sl.s)}–${hh(sl.e)}</span><div>${(l ? l.creatorIds : []).map((id) => esc(E.byId(id).handle) + " (" + esc(E.byId(id).platform) + ")").join(" · ")}</div></div>`; }).join("")}</div>`;
    const prev = M.v === "xls" ? `<p class="muted sm">${L("ชีต 1 “ตารางสัปดาห์”: เวลา × วัน · ชีต 2 “รายชื่อครีเอเตอร์”: shortlist / # / ครีเอเตอร์ / แพลตฟอร์ม / เอเจนซี / วัน / เวลา", "Sheet 1 “Weekly schedule”: time × day · sheet 2 “Creators”: shortlist / # / creator / platform / agency / days / time")}</p>${page1}` : M.v === "img" ? page1 : page1 + page2;
    const title = { pdf: L("PDF · A4 แนวนอน", "PDF · A4 landscape"), xls: "Excel", img: L("รูปภาพ", "Image") }[M.v];
    return sheet(L("ส่งออก ", "Export ") + title, `${esc(b.name)} · ${wk === "next" ? L("สัปดาห์หน้า", "next week") : L("สัปดาห์นี้", "this week")} ${rangeLab(dn0)}${M.v === "img" ? L(" · PNG ส่งในกลุ่ม LINE ของทีมได้", " · a PNG for the team's LINE group") : ""}`, `<div class="exp">${prev}</div>`, `<button class="btn" data-act="close">${L("ปิด", "Close")}</button><button class="btn pri" data-act="expgo" data-v="${M.v}|${wk}">${I.dl}${L("ดาวน์โหลด", "Download")}</button>`, "wide");
  }
  /** Studio: pick a shortlist for a slot (MD: slotPicker). */
  function plFit(b, l, sl) {
    const res = E.recommend(engSlot(sl), b, { n: 99, feedback: likedMap(b), blocked: blockedOf(b) });
    const base = E.fitScore(l.creatorIds, res) ?? 0;
    const gap = l.hour == null ? 0 : Math.abs(l.hour - sl.s);
    const T = res.target, cs = l.creatorIds.map(E.byId);
    let warn = null;
    const bad = cs.filter((c) => E.ruleBreak(c, b) || blockedOf(b).includes(c.id));
    if (bad.length) warn = L(`มี ${bad.length} คนที่ใช้กับแบรนด์นี้ไม่ได้`, `${bad.length} can't work with this brand`);
    else if (gap >= 4) warn = L(`ทำไว้สำหรับช่วง${E.dpName(E.daypartAt(hh(l.hour)))} อาจไม่เข้ากับช่วงนี้`, `Made for the ${E.dpName(E.daypartAt(hh(l.hour)))}; may not suit this slot`);
    else if (cs.filter((c) => c.energy - T.energy >= 1.5).length * 2 > cs.length) warn = L("หลายคนโทนคึกไปสำหรับช่วงนี้", "Many are too lively for this slot");
    else if (cs.filter((c) => T.energy - c.energy >= 1.5).length * 2 > cs.length) warn = L("หลายคนโทนนุ่มไปสำหรับช่วงนี้", "Many are too soft for this slot");
    const tagHit = [...new Set(cs.flatMap((c) => c.tags.filter((t) => T.tags.includes(t))))].slice(0, 2).map(E.tagName);
    const tone = E.energyWord(cs.reduce((s, c) => s + c.energy, 0) / Math.max(1, cs.length));
    return { fit: base - Math.min(24, gap * 4), warn, why: `${tagHit.length ? L(`แนว ${tagHit.join(" · ")} ตรงช่วงนี้`, `${tagHit.join(" · ")} fits this slot`) : L("เข้ากับ VIBES ของแบรนด์", "Fits the brand's VIBES")} · ${L("โทน", "tone: ")}${tone}` };
  }
  function mSp() {
    const b = wsB(), M = S.modal, sl = slotFromKey(b, M.v), Ls = Object.values(slOf(b)), q = (M.q || "").toLowerCase(), f = M.f || "all";
    const scored = Ls.map((l) => ({ l, ...plFit(b, l, sl) })).sort((a, z) => z.fit - a.fit);
    const best = scored.length ? scored[0].fit : 0, rec = new Set(scored.filter((x) => !x.warn && x.fit >= best - 4).slice(0, 2).map((x) => x.l.id));
    const shown = scored.filter((x) => (!q || (x.l.name + " " + [].concat(x.l.mood).join(" ")).toLowerCase().includes(q)) && (f === "all" || (f === "fit" ? !x.warn : f === "used" ? usage(b, x.l.id).length : !usage(b, x.l.id).length)));
    const pick = M.pick || sl.slId, P = scored.find((x) => x.l.id === pick), tn = typeName(b, sl.tk), tdays = daysLabel(b.nextWeek.map((t, d) => (t === sl.tk ? d : -1)).filter((d) => d >= 0));
    const T = E.targetFor(engSlot(sl), b);
    const body = `<div class="spk"><div class="sp-l"><input id="sp-q" placeholder="${L("ค้นหา shortlist", "Search shortlists")}" value="${esc(M.q || "")}"><div class="chips">${[["all", L("ทั้งหมด", "All")], ["fit", L("ไม่มีข้อควรระวัง", "No warnings")], ["used", L("ใช้อยู่", "In use")], ["unused", L("ยังไม่ใช้", "Unused")]].map(([k, l]) => `<button class="${f === k ? "on" : ""}" data-act="spf" data-v="${k}">${l}</button>`).join("")}</div>
        <div class="rows">${shown.map((x) => `<button class="row ${x.l.id === pick ? "cur" : ""}" data-act="sppick" data-v="${x.l.id}">${cover(x.l.name, x.l.hour, "xs")}<div class="grow"><b>${esc(x.l.name)} ${rec.has(x.l.id) ? `<i class="rtag">${I.spark}${L("แนะนำ", "Recommended")}</i>` : ""}${x.l.id === sl.slId ? pill(L("ช่องนี้", "This slot")) : ""}</b><span>${x.l.creatorIds.length} ${L("คน", "creators")} · ${x.l.by === "AI" ? "AI" : "Director"}</span>${x.warn ? `<span class="warn-t">${esc(x.warn)}</span>` : ""}</div></button>`).join("")}</div>
        <div class="acts">${btn("pe", L("+ สร้างใหม่สำหรับช่องนี้", "+ New for this slot"), "sm", "|" + M.v)}${btn("spai", I.spark + L("ให้ AI สร้างให้ช่องนี้", "Let AI build one for this slot"), "sm")}</div></div>
      <div class="sp-r">${P ? `<div class="mhero">${cover(P.l.name, P.l.hour)}<div><b>${esc(P.l.name)}</b><span>${P.l.by === "AI" ? L("AI สร้าง", "By AI") : L("Director สร้าง", "By the Director")} · ${esc(tx(P.l.mood))} · ${P.l.creatorIds.length} ${L("คน", "creators")}</span><span>${esc(usageTxt(b, P.l.id))}</span></div></div>
        ${P.warn ? `<p class="warn-t">${esc(P.warn)}</p>` : `<p class="why-t">${L("ทำไมเหมาะกับช่องนี้: ", "Why it fits: ")}${esc(P.why)}</p>`}
        <div class="rows">${P.l.creatorIds.map((id) => { const c = E.byId(id), ca = E.cautionOf(c, T, b); return `<div class="row">${av(c)}<div class="grow"><b>${esc(c.handle)}</b><span>${esc(c.platform)} · ${c.tags.map(E.tagName).join(", ")}</span>${ca ? `<span class="warn-t">${esc(ca)}</span>` : ""}</div></div>`; }).join("")}</div>
        <div class="acts">${btn("pe", L("แก้ shortlist นี้", "Edit this shortlist"), "sm", P.l.id)}${btn("sprec", L("ดูครีเอเตอร์ที่ AI แนะนำสำหรับช่องนี้", "See AI recommendations for this slot"), "sm")}</div>` : ""}</div></div>`;
    const foot = `<div class="seg"><button class="${M.scope !== "type" ? "on" : ""}" data-act="spscope" data-v="day">${L("เฉพาะ ", "Only ")}${dLab(WK().next + sl.di)}</button><button class="${M.scope === "type" ? "on" : ""}" data-act="spscope" data-v="type">${L(`ทุกวันแบบ “${esc(tn)}” (${tdays})`, `Every “${esc(tn)}” day (${tdays})`)}</button></div><button class="btn pri" data-act="spapply">${L("ใช้ shortlist นี้", "Use this shortlist")}</button>`;
    return sheet(L("เลือก shortlist สำหรับช่องนี้", "Choose this slot's shortlist"), `${dLab(WK().next + sl.di)} · ${hh(sl.s)}–${hh(sl.e)} · ${L("แบบ", "type")} “${esc(tn)}”${zonesOf(b).length > 1 ? " · " + esc(zname(b)) : ""}`, body, foot, "wide");
  }
  /** Studio: shortlist editor (MD: peModal). Needs a name and ≥3 creators (so a slot can rotate 3 days). */
  function peTarget(b, M) {
    const ctx = M.ctx ? slotFromKey(b, M.ctx) : null;
    return { ctx, T: E.targetFor(engSlot(ctx || { s: M.hour ?? 14, vibe: M.vibe || "fresh", stage: M.stage || "consideration" }), b) };
  }
  function mPe() {
    const b = wsB(), M = S.modal, q = (M.q || "").toLowerCase(), { ctx, T } = peTarget(b, M);
    const usedR = {};
    const sug = q ? window.ROSTER.filter((c) => !M.ids.includes(c.id) && (c.handle + " " + c.name + " " + c.tags.join(" ") + " " + c.tags.map(E.tagName).join(" ")).toLowerCase().includes(q)).slice(0, 6).map((c) => ({ c, why: E.cautionOf(c, T, b) }))
      : E.rankFor(T, b, { n: 5, avoid: M.ids, feedback: likedMap(b), blocked: blockedOf(b) }).picks.map((p) => ({ c: p.c, reason: E.reasonOf(p, T, b, usedR) }));
    const used = M.id ? usage(b, M.id).length : 0;
    const body = `<div class="row2"><label class="fld"><span>${L("ชื่อ", "Name")}</span><input id="pe-name" value="${esc(M.name)}"></label><label class="fld"><span>${L("อารมณ์ / แนว", "Mood / style")}</span><input id="pe-mood" value="${esc(tx(M.mood))}"></label></div>
      <p class="muted sm">${M.id ? esc(usageTxt(b, M.id)) : L("shortlist ใหม่", "New shortlist")}${ctx ? L(` · ทำสำหรับ ${dLab(WK().next + ctx.di)} ${hh(ctx.s)}–${hh(ctx.e)}`, ` · for ${dLab(WK().next + ctx.di)} ${hh(ctx.s)}–${hh(ctx.e)}`) : ""}</p>
      <div class="pe"><div><h3 class="mini-h">${L(`ใน shortlist (${M.ids.length})`, `In the shortlist (${M.ids.length})`)}</h3><div class="rows">${M.ids.map((id, i) => { const c = E.byId(id), ca = E.cautionOf(c, T, b); return `<div class="row"><span class="n">${i + 1}</span>${av(c)}<div class="grow"><b>${esc(c.handle)}</b><span>${esc(c.platform)} · ${esc(E.agencyName(c.agency))}</span>${ca ? `<span class="warn-t">${esc(ca)}</span>` : ""}</div><button class="icon" data-act="peup" data-v="${i}" aria-label="${L("ขึ้น", "Up")}">↑</button><button class="icon" data-act="pedn" data-v="${i}" aria-label="${L("ลง", "Down")}">↓</button><button class="icon" data-act="perm" data-v="${i}" aria-label="${L("เอาออก", "Remove")}">✕</button></div>`; }).join("") || `<div class="muted sm">${L("ยังไม่มีคน", "Nobody yet")}</div>`}</div>${btn("pefill", I.spark + L("ให้ AI เติมตาม VIBES", "Let AI fill it from the VIBES"), "sm")}</div>
      <div><input id="pe-q" placeholder="${L("ค้นหาในคลังครีเอเตอร์", "Search the creator library")}" value="${esc(M.q || "")}"><h3 class="mini-h">${q ? L("ผลค้นหา", "Results") : L("AI แนะนำ", "AI recommends")}</h3><div class="rows">${sug.map((x) => `<div class="row">${av(x.c)}<div class="grow"><b>${esc(x.c.handle)}${q ? "" : ` <i class="rtag">${I.spark}${L("แนะนำ", "Recommended")}</i>`}</b><span>${esc(x.c.platform)} · ${x.c.tags.map(E.tagName).join(", ")}</span>${x.reason ? `<span class="why-t">${esc(x.reason)}</span>` : x.why ? `<span class="warn-t">${esc(x.why)}</span>` : ""}</div><button class="btn sm" data-act="peadd" data-v="${x.c.id}">${L("เพิ่ม", "Add")}</button></div>`).join("") || `<div class="muted sm">${L("ไม่พบ", "Nothing found")}</div>`}</div></div></div>
      ${M.err ? `<p class="bad sm">${M.err}</p>` : ""}`;
    const foot = `${M.id ? (M.confirm ? `<span class="bad sm">${L(`ลบแล้ว ${used} ช่องที่ใช้อยู่จะว่าง`, `Deleting empties the ${used} slots using it`)}</span><button class="btn" data-act="pedelyes">${L("ยืนยันลบ", "Delete")}</button>` : btn("pedel", L("ลบ shortlist", "Delete shortlist"))) : ""}<span class="sp"></span>${cancelBtn()}<button class="btn pri" data-act="pesave">${L("บันทึก", "Save")}</button>`;
    return sheet(M.id ? L("แก้ shortlist", "Edit shortlist") : L("สร้าง shortlist", "New shortlist"), esc(b.name), body, foot, "wide");
  }
  /** Studio: publish check (MD: pubModal "ตรวจก่อนเผยแพร่"). Covers every branch with its own program. */
  function mPub() {
    const base = BR[S.modal.v], w = WK();
    const blocks = progViews(base).map((b) => {
      const d = diffNext(b), tc = typeChanges(b), hol = [];
      for (let di = 0; di < 7; di++) { const h = holOn(w.next + di); if (h) hol.push(`${DS(di)} ${ymd(w.next + di).d} · ${tx(h.n)}`); }
      return { b, d, tc, html: `${progViews(base).length > 1 ? `<h3 class="mini-h">${esc(zname(b))}</h3>` : ""}<div class="rows">${tc.map((di) => `<div class="row"><div class="grow"><b>${DS(di)} ${ymd(w.next + di).d}: ${L("แบบวัน", "day type")} “${esc(typeName(b, b.week[di]))}” → “${esc(typeName(b, b.nextWeek[di]))}”</b></div></div>`).join("")}${d.map((x) => `<div class="row"><div class="grow"><b>${DS(x.di)} ${ymd(w.next + x.di).d} ${hh(x.sl.s)}: ${esc(x.from)} → ${esc(x.sl.name)}</b></div></div>`).join("") || (tc.length ? "" : `<div class="muted sm">${L("เหมือนสัปดาห์นี้ทุกช่อง", "Same as this week in every slot")}</div>`)}</div>${hol.length ? `<p class="muted sm">${L("วันสำคัญในสัปดาห์: ", "Days that matter: ")}${hol.join(" · ")}</p>` : ""}` };
    });
    const nd = blocks.reduce((s, x) => s + x.d.length, 0), nt = blocks.reduce((s, x) => s + x.tc.length, 0);
    const body = `<p>${L("สัปดาห์", "Week of")} ${rangeLab(w.next)} · ${esc(base.name)}</p>${blocks.map((x) => x.html).join("")}<p class="muted sm">${L("เมื่อเผยแพร่ แบรนด์จะเห็นตารางสัปดาห์หน้าทันที และคำขอที่ค้างของแบรนด์นี้จะถูกปิดเป็น “ปรับแล้ว”", "Once published, the brand sees next week's schedule right away and its open requests are closed as “done”")}</p>`;
    return sheet(L("ตรวจก่อนเผยแพร่", "Check before publishing"), L(`เปลี่ยนจากสัปดาห์นี้ ${nd} ช่อง · แบบวันเปลี่ยน ${nt} วัน`, `${nd} slot${nd === 1 ? "" : "s"} changed from this week · ${nt} day type${nt === 1 ? "" : "s"} changed`), body, `<button class="btn" data-act="close">${L("กลับไปแก้", "Back to editing")}</button><button class="btn pri" data-act="publish" data-v="${base.id}">${L("ยืนยันเผยแพร่", "Publish")}</button>`);
  }
  function mQs() {
    const M = S.modal, q = (M.q || "").toLowerCase();
    const list = [...S.recent.map((id) => BR[id]).filter(Boolean), ...brands().filter((b) => !S.recent.includes(b.id))].filter((b) => !q || [b.name, ...[].concat(b.kind), ...zonesOf(b).flat()].join(" ").toLowerCase().includes(q));
    M.n = list.length;
    return `<div class="modal qs" role="dialog" aria-modal="true"><div class="bd" data-act="close"></div><div class="mc"><input id="qs-q" placeholder="${L("ค้นหาแบรนด์ แล้วกด Enter", "Find a brand, then press Enter")}" value="${esc(M.q || "")}" autocomplete="off"><div class="rows">${list.map((b, i) => `<button class="row ${i === (M.i || 0) ? "cur" : ""}" data-act="open" data-v="${b.id}">${dot(b)}<div class="grow"><b>${esc(b.name)}</b><span>${esc(kindOf(b))}${S.recent.includes(b.id) ? L(" · เปิดล่าสุด", " · recent") : ""}</span></div></button>`).join("")}</div><p class="muted sm">${L("↑ ↓ เลื่อน · Enter เปิด · Esc ปิด", "↑ ↓ move · Enter open · Esc close")}</p></div></div>`;
  }
  function mUsedby() {
    const c = E.byId(S.modal.v), u = usedBy(c.id);
    return sheet(esc(c.handle), `${esc(c.name)} · ${esc(E.agencyName(c.agency))}`, `<div class="rows">${u.map((x) => `<div class="row">${dot(x.b)}<div class="grow"><b>${esc(x.b.name)}</b><span>${esc(x.l.name)}</span></div>${btn("open", L("เปิดแบรนด์", "Open brand"), "sm", x.b.id)}</div>`).join("") || `<div class="muted sm">${L("ยังไม่อยู่ใน shortlist ไหน", "Not in any shortlist yet")}</div>`}</div>`, "");
  }
  function mCrep() {
    const b = BR[S.modal.v], P = period(), all = postsIn(b, P.a, P.z), rows = agg(all).slice(0, 5), done = S.requests.filter((r) => r.b === b.id && r.state === "done").length;
    return sheet(L("รายงานถึงแบรนด์", "Report to the brand"), `${esc(b.name)} · ${P.lab}`, `<div class="paper"><div class="ph"><b>${esc(b.name)} · ${L("สรุปการโพสต์", "Posting summary")}</b><span>${L("จัดโดย MATCHROOM Influencer Director", "Curated by MATCHROOM Influencer Director")}</span></div><div class="tiles"><div class="tile"><span>${L("โพสต์", "Posts")}</span><b>${all.length}</b></div><div class="tile"><span>${L("ตรงเวลา", "On time")}</span><b>${pct(b.rep.onTime)}</b></div><div class="tile"><span>${L("กดชอบ", "Likes")}</span><b>${b.rep.likes}</b></div><div class="tile"><span>${L("คำขอที่ปรับแล้ว", "Requests done")}</span><b>${done}</b></div></div><h3 class="mini-h">${L("ครีเอเตอร์ที่โพสต์บ่อย", "Most frequent creators")}</h3>${rows.map((r) => `<div class="row">${av(r.c)}<div class="grow"><b>${esc(r.c.handle)}</b><span>${L(`${r.n} โพสต์ · ~${E.fmtK(r.views)} วิว (avgViews × โพสต์)`, `${r.n} posts · ~${E.fmtK(r.views)} views (avgViews × posts)`)}</span></div></div>`).join("")}</div>`, `${btn("toast", L("ส่งทาง LINE", "Send on LINE"), "", "line")}${btn("toast", L("ดาวน์โหลด PDF", "Download PDF"), "pri", "pdf")}`);
  }
  function mNotes() {
    const items = [
      ["ok", L("แบรนด์ดูอย่างเดียว เลือกครีเอเตอร์เองไม่ได้ · Pool = เลือกโทน 3 แบบที่ Director อนุมัติแล้ว (พรีเมียม)", "Brands only watch; they can't pick creators · Pool = 3 Director-approved tones (premium)")],
      ["ok", L("AI แนะนำ Director ตัดสิน · ไม่โชว์คะแนน มีแค่ “แนะนำ” + เหตุผลภาษาคน", "AI suggests, the Director decides · no scores, only “Recommended” + a plain reason")],
      ["ok", L("รอบสัปดาห์: ร่าง → รอ Director ตรวจ → เผยแพร่ · แก้ของที่เผยแพร่แล้วต้องอนุมัติใหม่", "Weekly cycle: draft → Director review → published · editing a published program needs approval again")],
      ["ok", L("ระบบเดียว: ทุกจุดที่เลือกครีเอเตอร์ใช้ engine เดียว (น้ำหนัก 3/2/2/2/2/1/1) และผลลัพธ์เป็น shortlist ที่ช่วงเวลาชี้ไปเสมอ", "One system: every place that picks creators uses one engine (weights 3/2/2/2/2/1/1), and the result is always a shortlist a slot points to")],
      ["ok", L("สาขา (MD: โซน): สาขาที่ยังไม่แยกตารางใช้ตารางร่วม · shortlist แพ็กเกจ สถานะ และ feedback เป็นของแบรนด์", "Branches (MD: zones): a branch without its own schedule shares the main one · shortlists, package, status and feedback belong to the brand")],
      ["ok", L("เก็บเท่าที่จำเป็น (PDPA) · ไม่โชว์ Audience Activity / Peak Hour ให้แบรนด์", "Collect only what's needed (PDPA) · no Audience Activity / Peak Hour for brands")],
      ["no", L("จำลอง: การโพสต์จริง, LINE, ดาวน์โหลดรูป และตัวเลขทั้งหมด · รีเฟรชแล้วเริ่มใหม่ (ยกเว้นภาษา)", "Simulated: real posting, LINE, image downloads and every number · a refresh starts over (except the language)")],
      ["no", L("ไม่ทำ: โหมดจอร้าน และเพลงเต็มจาก YouTube (ไม่มีความหมายในงานอินฟลูฯ)", "Not ported: shop-screen mode and full YouTube songs (no meaning for influencers)")],
    ];
    return sheet(L("โน้ต mockup", "Mockup notes"), L("MATCHROOM ใช้ logic เดียวกับ VIBES LAB Music Director (redesign ตาม CEO review V.5)", "MATCHROOM uses the same logic as VIBES LAB Music Director (the CEO review V.5 redesign)"), `<ul class="checks">${items.map(([k, t]) => `<li><span class="ic ${k}">${k === "ok" ? "✓" : "–"}</span>${t}</li>`).join("")}</ul>`, "");
  }
  /** Onboarding (MD: obModal, 5 steps). */
  const TPL = {
    one: { name: ["แบบเดียวทุกวัน", "One type every day"], types: [["A", ["ทุกวัน", "Every day"], [0, 1, 2, 3, 4, 5, 6], 0]] },
    two: { name: ["วันทำงาน + วันหยุด", "Workday + weekend"], types: [["A", ["วันทำงาน", "Workday"], [0, 1, 2, 3, 4], 0], ["B", ["วันหยุด", "Weekend"], [5, 6], 1]] },
    peak: { name: ["ปกติ + พีคสุดสัปดาห์", "Regular + weekend peak"], types: [["A", ["ปกติ", "Regular"], [0, 1, 2, 3, 6], 0], ["B", ["ศ–ส พีค", "Fri–Sat peak"], [4, 5], 1]] },
  };
  const KINDS = [["คาเฟ่", "Café"], ["ร้านอาหาร", "Restaurant"], ["บาร์", "Bar"], ["สกินแคร์", "Skincare"], ["ฟิตเนส", "Fitness"], ["ท่องเที่ยว", "Travel"], ["แฟชั่น", "Fashion"]];
  const TPL_FOR = { 0: "two", 1: "peak", 2: "peak", 4: "two" };
  const NAME_FOR = (h) => (h < 11 ? "Morning Hook" : h < 14 ? "Midday Deep-dive" : h < 17 ? "Afternoon Pick-me-up" : h < 21 ? "Evening Push" : "Late Community");
  function genSlots(open, close, lift) {
    const n = Math.max(2, Math.min(5, Math.round((close - open) / 3.5))), out = [];
    const stages = ["awareness", "consideration", "consideration", "conversion", "loyalty"];
    const vibes = lift ? ["fresh", "lively", "lively", "hype", "hype"] : ["calm", "fresh", "cozy", "stylish", "lively"];
    for (let i = 0; i < n; i++) {
      const s = open + Math.round(((close - open) * i) / n), e = i === n - 1 ? close : open + Math.round(((close - open) * (i + 1)) / n);
      out.push([s, e, NAME_FOR(s) + (lift ? " Plus" : ""), lift ? ["คึกกว่าวันปกติ", "Livelier than usual"] : ["ตามจังหวะของวัน", "Follows the day"], vibes[i], stages[i]]);
    }
    return out;
  }
  function mOb() {
    const O = S.modal, steps = [L("ข้อมูลแบรนด์", "Brand"), L("VIBES & กฎ", "VIBES & rules"), L("แบบวัน", "Day types"), L("แพ็กเกจ & สิทธิ์", "Package & rights"), L("โปรแกรมแรก", "First program")], tags = Object.keys(E.TAG_TH);
    const st = [
      `<label class="fld"><span>${L("ชื่อแบรนด์", "Brand name")}</span><input id="ob-name" value="${esc(O.name)}"></label><div class="row2"><label class="fld"><span>${L("ประเภท", "Type")}</span><select id="ob-kind">${KINDS.map((k, i) => `<option value="${i}" ${O.bk === i ? "selected" : ""}>${tx(k)}</option>`).join("")}</select></label><label class="fld"><span>${L("บัญชี", "Accounts")}</span><input id="ob-acc" value="${esc(O.acc)}"></label></div>
       <label class="fld"><span>${L("สาขา (คั่นด้วยจุลภาค)", "Branches (comma-separated)")}</span><input id="ob-zones" value="${esc(O.zones)}"></label>
       <div class="row2"><label class="fld"><span>${L("เริ่มโพสต์", "Posting starts")}</span><input id="ob-open" type="number" min="5" max="20" value="${O.open}"></label><label class="fld"><span>${L("หยุดโพสต์", "Posting ends")}</span><input id="ob-close" type="number" min="12" max="24" value="${O.close}"></label></div>`,
      `<label class="fld"><span>${L("VIBES (คำสั้น ๆ)", "VIBES (a few words)")}</span><input id="ob-vibe" value="${esc(O.vibe)}"></label><p class="muted sm">${L("ลายเซ็นแบรนด์ / แนวหลัก (เลือก 2–4)", "Brand signature / core content (pick 2–4)")}</p><div class="chips">${tags.map((t) => `<button class="${O.tags.includes(t) ? "on" : ""}" data-act="obtag" data-v="${t}">${E.tagName(t)}</button>`).join("")}</div>
       <div class="row2"><label class="fld"><span>${L("คอนเทนต์ไทย", "Thai content")}</span><select id="ob-thai">${[0.3, 0.5, 0.7, 0.9].map((v) => `<option value="${v}" ${O.thai == v ? "selected" : ""}>${L(`${v * 10} ใน 10`, `${v * 10} in 10`)}</option>`).join("")}</select></label><label class="fld"><span>${L("ER ขั้นต่ำ", "Minimum ER")}</span><input id="ob-er" type="number" step="0.5" value="${O.er}"></label></div>
       <label class="chk"><input type="checkbox" id="ob-fam" ${O.fam ? "checked" : ""}> family-safe</label><label class="chk"><input type="checkbox" id="ob-alc" ${O.alc ? "checked" : ""}> ${L("ห้ามคอนเทนต์แอลกอฮอล์", "No alcohol content")}</label>`,
      `<div class="rows">${Object.entries(TPL).map(([k, t]) => `<button class="row ${O.tpl === k ? "cur" : ""}" data-act="obtpl" data-v="${k}"><div class="grow"><b>${tx(t.name)}${(TPL_FOR[O.bk] || "one") === k ? ` <i class="rtag">${I.spark}${L("แนะนำ", "Recommended")}</i>` : ""}</b><span>${t.types.map((x) => `${tx(x[1])} · ${daysLabel(x[2])}`).join(" / ")}</span></div></button>`).join("")}</div>`,
      `<div class="seg"><button class="${O.pack !== "pool" ? "on" : ""}" data-act="obpack" data-v="auto">Autopilot</button><button class="${O.pack === "pool" ? "on" : ""}" data-act="obpack" data-v="pool">${L("Pool · พรีเมียม", "Pool · premium")}</button></div><label class="fld"><span>${L("LINE OA ของทีมแบรนด์", "The brand team's LINE OA")}</span><input id="ob-line" value="${esc(O.line)}" placeholder="@brand"></label>
       <label class="chk"><input type="checkbox" id="ob-pdpa" ${O.pdpa ? "checked" : ""}> ${L("แบรนด์ยินยอมให้ใช้ข้อมูลเท่าที่จำเป็นเพื่อจัดครีเอเตอร์ (PDPA)", "The brand consents to us using only the data needed to pick creators (PDPA)")} <b class="bad">*</b></label>`,
      O.draft ? `<div class="rows">${O.draft.map(([tk, nm, ds, sl]) => `<div class="tblock"><b>${esc(tx(nm))}</b> <span class="muted sm">${daysLabel(ds)}</span>${sl.map((x) => `<div class="row"><span class="t">${hh(x[0])}–${hh(x[1])}</span><div class="grow"><b>${esc(x[2])}</b><span>${E.vibeName(x[4])} · ${stageName(x[5])}</span></div></div>`).join("")}</div>`).join("")}</div><p class="muted sm">${L("บันทึกแล้วจะส่งให้ Director ตรวจก่อนแบรนด์เห็น · AI จะร่าง shortlist ให้ทุกช่องจากคลังครีเอเตอร์", "Saving sends it for Director review before the brand sees it · the AI drafts a shortlist for every slot from the library")}</p>` : `<p>${L(`ร่างช่วงโพสต์จากเวลา ${hh(O.open)}–${hh(O.close)} และแบบวัน “${tx(TPL[O.tpl].name)}”`, `Draft posting slots for ${hh(O.open)}–${hh(O.close)} with “${tx(TPL[O.tpl].name)}”`)}</p>${btn("obdraft", I.spark + L("ร่างเลย", "Draft it"), "pri")}`,
    ];
    const foot = `${O.step ? btn("obback", L("ย้อนกลับ", "Back")) : ""}<span class="sp"></span>${O.err ? `<span class="bad sm">${O.err}</span>` : ""}${O.step < 4 ? btn("obnext", L("ถัดไป", "Next"), "pri") : btn("obsave", L("บันทึกและส่งให้ Director ตรวจ", "Save and send for Director review"), "pri", "", O.draft ? "" : "disabled")}`;
    return sheet(L("เพิ่มแบรนด์ใหม่", "Add a brand"), steps.map((s, i) => `<i class="${i === O.step ? "on" : ""}">${i + 1}. ${s}</i>`).join(""), st[O.step], foot);
  }

  /* ======================================================================================
     RENDER + EVENTS (MD: render / ACT)
     ====================================================================================== */
  function render() {
    POSTS = {};
    E.setLang(LANG);
    document.documentElement.lang = LANG;
    const a = document.activeElement, fid = a && a.id, sel = a && typeof a.selectionStart === "number" ? [a.selectionStart, a.selectionEnd] : null;
    const shelfX = ($("#shelf") || {}).scrollLeft;
    if (S.side === "brand") { const n = nowOf(B()); const k = n ? n.key : null; if (S.varKey !== k) { S.varKey = k; S.variant = 0; } }
    const M = S.modal;
    const modal = !M ? "" : { slview: mSlview, req: mReq, hist: mHist, cert: mCert, exp: mExp, sp: mSp, pe: mPe, pub: mPub, qs: mQs, usedby: mUsedby, crep: mCrep, notes: mNotes, ob: mOb }[M.kind]();
    $("#app").innerHTML = mockBar() + (S.side === "brand" ? brandApp() : studioApp()) + modal;
    if (fid) { const el = document.getElementById(fid); if (el) { el.focus(); if (sel && el.setSelectionRange) try { el.setSelectionRange(sel[0], sel[1]); } catch (e) { /* number inputs */ } } }
    const sh = $("#shelf");
    if (sh) { if (shelfX != null) sh.scrollLeft = shelfX; else { const cur = sh.querySelector(".now"); if (cur) sh.scrollLeft = cur.offsetLeft - 16; } }
  }
  let toastT;
  function toast(msg) { const t = $("#toast"); if (!t) return; t.textContent = msg; t.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("on"), 3400); }
  function openWs(id, tab) { S.side = "studio"; S.ws = id; S.brand = id; S.wstab = tab || "program"; S.modal = null; S.stab = "brands"; S.recent = [id, ...S.recent.filter((x) => x !== id)].slice(0, 4); }
  function xls(b, wk) {
    const w = WK(), dn0 = wk === "next" ? w.next : w.this, cell = (v) => `<Cell><Data ss:Type="String">${esc(v)}</Data></Cell>`;
    let s1 = `<Row>${cell(L("เวลา", "Time"))}${DS_.map((d, i) => cell(`${dLab(dn0 + i)} (${typeName(b, typeOf(b, i, wk))})`)).join("")}</Row>`;
    for (let h = b.open; h < b.close; h++) s1 += `<Row>${cell(hh(h))}${DS_.map((d, i) => { const sl = daySlots(b, i, wk).find((x) => x.s <= h && h < x.e); return cell(sl ? (sl.s === h ? sl.name : "↑ " + sl.name) : ""); }).join("")}</Row>`;
    let s2 = `<Row>${["shortlist", "#", L("ครีเอเตอร์", "Creator"), L("แพลตฟอร์ม", "Platform"), L("เอเจนซี", "Agency"), L("วัน", "Days"), L("เวลา", "Time")].map(cell).join("")}</Row>`;
    const seen = {};
    for (let di = 0; di < 7; di++) daySlots(b, di, wk).forEach((sl) => ((seen[sl.slId] = seen[sl.slId] || { sl, ds: [] }).ds.push(di)));
    Object.values(seen).forEach(({ sl, ds }) => (listOf(b, sl.slId) || { creatorIds: [] }).creatorIds.forEach((id, i) => { const c = E.byId(id); s2 += `<Row>${[sl.name, String(i + 1), c.handle, c.platform, E.agencyName(c.agency), daysLabel([...new Set(ds)].sort()), `${hh(sl.s)}–${hh(sl.e)}`].map(cell).join("")}</Row>`; }));
    const x = `<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Worksheet ss:Name="${L("ตารางสัปดาห์", "Weekly schedule")}"><Table>${s1}</Table></Worksheet><Worksheet ss:Name="${L("รายชื่อครีเอเตอร์", "Creators")}"><Table>${s2}</Table></Worksheet></Workbook>`;
    download(`${L("ตารางโพสต์", "posting-schedule")}_${b.name.replace(/\s+/g, "-")}_${zname(b).replace(/[\s()]+/g, "-")}_${dKey(dn0)}.xls`, x, "application/vnd.ms-excel");
  }
  function download(name, text, type) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type }));
    a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 800);
  }
  function csvReport() {
    const P = period(), rows = [["date", "brand", "branch", "slot", "creator", "platform", "agency", "avgViews", "ER%", "rate"]];
    brands().forEach((b) => progViews(b).forEach((v) => { for (let dn = P.a; dn <= P.z; dn++) postsOn(v, dn).forEach((p) => p.c && rows.push([dKey(p.dn), b.name, zonesOf(b)[v.zi || 0][1], `${hh(p.slot.s)}-${hh(p.slot.e)} ${p.slot.name}`, p.c.handle, p.c.platform, E.agencyName(p.c.agency), p.c.avgViews, p.c.er, p.c.rate])); }));
    download(`matchroom_report_${dKey(P.a)}_${dKey(P.z)}.csv`, "﻿" + rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n"), "text/csv;charset=utf-8");
  }
  function newList(b, name, ids, by, extra = {}) {
    const Ls = slOf(b);
    let id = slug(name), k = 2;
    while (Ls[id]) id = slug(name) + "-" + k++;
    Ls[id] = { id, name, mood: extra.mood || "", vibe: extra.vibe || "fresh", stage: extra.stage || "consideration", hour: extra.hour ?? null, creatorIds: ids, by, note: by === "AI" ? ["AI ร่าง · Director ตรวจแล้ว", "AI draft · checked by the Director"] : ["Director จัดเอง", "Made by the Director"] };
    return Ls[id];
  }
  function applySlot(b, sl, id, scope, src) {
    const targets = scope === "type" ? b.nextWeek.map((t, d) => (t === sl.tk ? d : -1)).filter((d) => d >= 0) : [sl.di];
    targets.forEach((d) => { S.edits[ekey(b, "next", d, sl.i)] = { sl: id }; S.src[ekey(b, "next", d, sl.i)] = src; });
    return targets.length;
  }
  /** Give a branch its own program (MD: zsplit) — a deep copy of the main program and its slot choices. */
  function zsplit(bid, zi) {
    const base = BR[bid], key = bid + "@" + zi;
    base.zoneProg = base.zoneProg || {};
    base.zoneProg[zi] = { open: base.open, close: base.close, relaxed: base.relaxed, types: JSON.parse(JSON.stringify(base.types)), week: [...base.week], nextWeek: [...base.nextWeek] };
    for (const map of [S.edits, S.src]) Object.keys(map).filter((k) => k.startsWith(bid + "|")).forEach((k) => (map[key + k.slice(bid.length)] = typeof map[k] === "object" ? { ...map[k] } : map[k]));
    if (S.rotate[bid] === false) S.rotate[key] = false;
  }
  const TOASTS = { line: ["ส่งรายงานทาง LINE แล้ว (จำลอง)", "Report sent on LINE (simulated)"], pdf: ["ดาวน์โหลด PDF แล้ว (จำลอง)", "PDF downloaded (simulated)"] };

  const ACT = {
    lang: (v) => { LANG = v === "en" ? "en" : "th"; store.set("mr-lang", LANG); },
    side: (v) => { S.side = v; S.modal = null; if (v === "studio") S.ws = null; },
    pack: (v) => { S.pack[S.brand] = v; S.variant = 0; },
    tab: (v) => { S.tab = v; window.scrollTo(0, 0); },
    notes: () => (S.modal = { kind: "notes" }),
    close: () => (S.modal = null),
    hold: () => { const b = B(); S.hold[b.id] = !S.hold[b.id]; toast(S.hold[b.id] ? L("พักโพสต์แล้ว · ครีเอเตอร์จะรอจนกว่าจะกดโพสต์ต่อ", "Posting paused · creators wait until you resume") : L("โพสต์ต่อตามโปรแกรมแล้ว", "Posting resumed on schedule")); },
    like: (v) => { const k = S.brand + "|" + v; if (S.liked.has(k)) S.liked.delete(k); else { S.liked.add(k); toast(L("บันทึกว่าชอบ · Director และ AI ใช้ประกอบการจัดครั้งต่อไป", "Saved as a like · the Director and the AI use it next time")); } },
    dislike: (v) => {
      const b = B(), c = E.byId(v), t = hmm(NOW.min);
      S.disliked.add(b.id + "|" + v); S.liked.delete(b.id + "|" + v);
      S.feedback.unshift({ b: b.id, id: v, when: ["วันนี้ " + t, "Today " + t] });
      toast(L(`ข้าม ${c.handle} แล้ว · จะไม่ใช้คนนี้กับแบรนด์นี้อีก`, `Skipped ${c.handle} · they won't be used for this brand again`));
    },
    variant: (v) => { const n = nowOf(B()); if (n) { S.varKey = n.key; S.variant = +v; toast(L(`ช่วงนี้ใช้โทน “${VAR[+v].n[0]}” · กลับเป็นปกติเองตอน ${hh(n.sl.e)}`, `This slot now uses “${VAR[+v].n[1]}” · back to normal at ${hh(n.sl.e)}`)); } },
    req: (v) => (S.modal = { kind: "req", k: v || null }),
    rqk: (v) => { S.modal.k = S.modal.k === v ? null : v; S.modal.text = $("#rq-text").value; },
    rqsend: () => {
      const M = S.modal, b = B(), text = $("#rq-text").value.trim(), dn = +$("#rq-day").value, tv = $("#rq-time").value;
      if (!M.k && !text) { M.err = L("เลือกหัวข้อ หรือพิมพ์รายละเอียดก่อนส่ง", "Pick a topic or type some details first"); M.text = text; return; }
      const sls = daySlots(b, NOW.day, "this"), n = nowOf(b);
      const time = tv === "all" ? ["ทั้งวัน", "all day"] : tv === "now" ? (n ? [`${hh(n.sl.s)}–${hh(n.sl.e)}`, `${hh(n.sl.s)}–${hh(n.sl.e)}`] : ["ช่วงนี้", "this slot"]) : [`${hh(sls[+tv].s)}–${hh(sls[+tv].e)}`, `${hh(sls[+tv].s)}–${hh(sls[+tv].e)}`];
      const EV = [["เปิดตัวสินค้าใหม่", "Product launch"], ["โปรโมชันสุดสัปดาห์", "Weekend promotion"], ["อีเวนต์หน้าร้าน", "In-store event"], ["อื่น ๆ", "Other"]];
      const ev = M.k === "event" && $("#rq-ev") ? EV[+$("#rq-ev").value] : null;
      const who = M.k === "creator" && n && n.post.c ? n.post.c.handle + " " : "";
      const zi = b.zi || 0, zone = zonesOf(b).length > 1 ? [" · " + zonesOf(b)[zi][0], " · " + zonesOf(b)[zi][1]] : ["", ""];
      const d2 = dLab2(dn), body = (i) => (who + (ev ? ev[i] + (text ? " · " : "") : "") + text).trim() || QUICK[M.k][i];
      S.requests.unshift({ b: b.id, k: M.k, when: [`${d2[0]} ${time[0]}${zone[0]}`, `${d2[1]} ${time[1]}${zone[1]}`], text: [body(0), body(1)], state: "new" });
      S.modal = null; toast(L("ส่งคำขอถึง Director แล้ว · ปกติตอบภายในวันทำการ", "Sent to the Director · usually answered within a working day"));
    },
    hist: () => (S.modal = { kind: "hist", q: "" }),
    cert: () => (S.modal = { kind: "cert" }),
    slview: (v) => (S.modal = { kind: "slview", v, var: 0 }),
    mvar: (v) => (S.modal.var = +v),
    wk: (v) => (S.wk = v),
    wmode: (v) => (S.weekMode = v),
    dpick: (v) => (S.dayPick = +v),
    exp: (v) => (S.modal = { kind: "exp", v }),
    expgo: (v) => { const [f, wk] = v.split("|"); if (f === "xls") { xls(B(), wk); toast(L("ดาวน์โหลด Excel แล้ว (2 ชีต)", "Excel downloaded (2 sheets)")); } else if (f === "pdf") { setTimeout(() => window.print(), 50); } else toast(L("ดาวน์โหลดรูปภาพแล้ว (จำลอง) · PNG 2480 × 1754 px", "Image downloaded (simulated) · PNG 2480 × 1754 px")); },
    // studio
    stab: (v) => { S.stab = v; S.ws = null; window.scrollTo(0, 0); },
    open: (v) => { const [id, tab] = v.split("|"); openWs(id, tab); window.scrollTo(0, 0); },
    wstab: (v) => (S.wstab = v),
    zone: (v) => { S.zone[S.ws] = +v; S.rc = null; },
    zsplit: (v) => { const [bid, zi] = v.split("|"); zsplit(bid, +zi); toast(L(`แยกตารางให้ ${zname(BR[bid], +zi)} แล้ว · แก้ได้อิสระจากสาขาหลัก`, `${zname(BR[bid], +zi)} now has its own schedule · edit it separately from the main branch`)); },
    qs: () => (S.modal = { kind: "qs", q: "", i: 0 }),
    devall: () => (S.devAll = true),
    notify: (v) => { S.notified[v] = true; toast(L(`ส่ง LINE ถึงครีเอเตอร์ของ ${BR[v].name} แล้ว`, `LINE message sent to ${BR[v].name}'s creator`)); setTimeout(() => { S.late[v] = false; S.notified[v] = false; toast(L(`${BR[v].name}: ครีเอเตอร์โพสต์แล้ว`, `${BR[v].name}: the creator has posted`)); render(); }, 6000); },
    clf: (v) => (S.cl.f = v),
    ob: () => (S.modal = { kind: "ob", step: 0, name: "", bk: 0, acc: "Instagram, TikTok", zones: L("สาขาหลัก", "Main branch"), open: 8, close: 20, vibe: "", tags: [], thai: 0.7, er: 4, fam: true, alc: true, tpl: "two", pack: "auto", line: "", pdpa: false, draft: null }),
    obtag: (v) => { const O = S.modal; readOb(); O.tags = O.tags.includes(v) ? O.tags.filter((t) => t !== v) : [...O.tags, v].slice(-4); },
    obtpl: (v) => { readOb(); S.modal.tpl = v; S.modal.draft = null; },
    obpack: (v) => { readOb(); S.modal.pack = v; },
    obback: () => { readOb(); S.modal.step--; S.modal.err = ""; },
    obnext: () => {
      const O = S.modal; readOb(); O.err = "";
      if (O.step === 0 && (!O.name.trim() || O.close - O.open < 4)) O.err = L("ใส่ชื่อแบรนด์ และช่วงโพสต์อย่างน้อย 4 ชั่วโมง", "Add a brand name and at least 4 posting hours");
      else if (O.step === 1 && O.tags.length < 2) O.err = L("เลือกแนวหลักอย่างน้อย 2 แบบ", "Pick at least 2 content types");
      else if (O.step === 3 && !O.pdpa) O.err = L("ต้องได้ความยินยอม PDPA ก่อน", "PDPA consent is required first");
      if (!O.err) O.step++;
    },
    obdraft: () => { const O = S.modal; O.draft = TPL[O.tpl].types.map(([tk, nm, ds, lift]) => [tk, nm, ds, genSlots(O.open, O.close, lift)]); },
    obsave: () => {
      const O = S.modal, id = slug(O.name) + "-" + Math.random().toString(36).slice(2, 5), colors = ["#9b7bff", "#ff7a90"];
      const types = {}, week = Array(7).fill("A");
      O.draft.forEach(([tk, nm, ds, sl], i) => { types[tk] = { name: nm, mood: ["ร่างจาก onboarding", "Drafted at onboarding"], color: colors[i], slots: sl }; ds.forEach((d) => (week[d] = tk)); });
      const zones = O.zones.split(/\s*,\s*/).filter(Boolean).map((z) => [z, z]);
      const b = { id, name: O.name.trim(), kind: KINDS[O.bk], type: KINDS[O.bk][1], color: "#" + ((hue(id) * 2731) % 0xffffff).toString(16).padStart(6, "8"), open: O.open, close: O.close, accounts: O.acc.split(/\s*,\s*/).filter(Boolean), budget: 200000, zones: zones.length ? zones : undefined,
        vibe: O.vibe || L("ยังไม่ได้ใส่ VIBES", "No VIBES yet"), audience: "-", refs: "-", tags: O.tags, signature: { name: O.name.trim() + " Signature", tags: O.tags.slice(0, 2) }, thaiShare: +O.thai, banned: [], rules: { familySafe: O.fam, noAlcohol: O.alc }, minER: +O.er,
        notes: [["สร้างจาก onboarding", "Created at onboarding"]], activity: Array(24).fill(10), pack: O.pack, status: "review", relaxed: Object.keys(types).pop(), types, week, nextWeek: [...week], rep: { onTime: [0, 0], likes: 0, reqHrs: 0, reqPast: 0, renew: ["ต.ค. 2570", "Oct 2027"] } };
      BR[id] = b; ORDER.push(id); S.pack[id] = O.pack; S.status[id] = "review";
      slOf(b); logRun(["AI ร่างโปรแกรมแรก", "AI drafted the first program"], [`${Object.keys(slOf(b)).length} shortlist จากคลัง · รอ Director ตรวจ`, `${Object.keys(slOf(b)).length} shortlists from the library · waiting for review`], b);
      openWs(id, "program"); toast(L(`เพิ่ม ${b.name} แล้ว · ส่งให้ Director ตรวจโปรแกรมแรก`, `${b.name} added · its first program is waiting for review`));
    },
    // program
    ai: () => {
      const b = wsB(), bid = b.id; S.aiBusy = bid;
      setTimeout(() => {
        let filled = 0;
        progViews(BR[bid]).forEach((v) => { for (let di = 0; di < 7; di++) daySlots(v, di, "next").forEach((sl) => {
          const k = ekey(v, "next", di, sl.i);
          if (sl.empty) { const l = newList(v, sl.name + " · AI", draftIds(v, sl), "AI", { mood: sl.mood, vibe: sl.vibe, stage: sl.stage, hour: sl.s }); S.edits[k] = { sl: l.id }; S.src[k] = "AI"; filled++; }
          else if (S.src[k] !== "MD") S.src[k] = "AI";
        }); });
        S.status[bid] = "review"; S.aiBusy = null;
        logRun(["AI ร่างทั้งสัปดาห์", "AI drafted the week"], [filled ? `เติมช่องว่าง ${filled} ช่อง · รอ Director ตรวจ` : "ทุกช่องมี shortlist แล้ว · รอ Director ตรวจ", filled ? `filled ${filled} empty slots · waiting for review` : "every slot has a shortlist · waiting for review"], BR[bid]);
        toast(L("AI ร่างโปรแกรมสัปดาห์หน้าครบ 7 วันแล้ว · รอ Director ตรวจ", "AI drafted all 7 days of next week · waiting for the Director")); render();
      }, 1300);
    },
    submit: (v) => { S.status[v] = "review"; toast(L("ส่งให้ Director ตรวจแล้ว", "Sent for Director review")); },
    pubask: (v) => (S.modal = { kind: "pub", v }),
    publish: (v) => { S.status[v] = "live"; S.requests.forEach((r) => { if (r.b === v && r.state === "new") r.state = "done"; }); S.modal = null; toast(L(`เผยแพร่แล้ว · ${BR[v].name} เห็นตารางสัปดาห์หน้าแล้ว`, `Published · ${BR[v].name} can see next week now`)); },
    asbrand: (v) => { S.side = "brand"; S.brand = v; S.tab = "week"; S.wk = "next"; S.ws = null; },
    copyweek: () => { const b = wsB(), k = ek(b); b.nextWeek.splice(0, 7, ...b.week); for (const map of [S.edits, S.src]) { Object.keys(map).filter((x) => x.startsWith(k + "|next|")).forEach((x) => delete map[x]); Object.keys(map).filter((x) => x.startsWith(k + "|this|")).forEach((x) => (map[x.replace("|this|", "|next|")] = typeof map[x] === "object" ? { ...map[x] } : map[x])); } S.status[b.id] = "draft"; toast(L("คัดลอกจากสัปดาห์นี้แล้ว · วันพิเศษไม่ถูกคัดลอก", "Copied from this week · the special day isn't copied")); },
    diff: () => (S.diff = !S.diff),
    cycle: (v) => { const b = wsB(), ks = Object.keys(b.types), di = +v; b.nextWeek[di] = ks[(ks.indexOf(b.nextWeek[di]) + 1) % ks.length]; for (const map of [S.edits, S.src]) Object.keys(map).filter((k) => k.startsWith(`${ek(b)}|next|${di}|`)).forEach((k) => delete map[k]); toast(L(`${DS(di)} ใช้แบบ “${typeName(b, b.nextWeek[di])}”`, `${DS(di)} uses “${typeName(b, b.nextWeek[di])}”`) + reapprove(b)); },
    holtype: (v) => { const b = wsB(), di = +v - WK().next; b.nextWeek[di] = b.relaxed; toast(L(`${DS(di)} ใช้แบบ “${typeName(b, b.relaxed)}” แล้ว`, `${DS(di)} now uses “${typeName(b, b.relaxed)}”`) + reapprove(b)); },
    holprep: (v) => { const b = wsB(), h = holOn(+v); const T = { erMin: b.minER || 0, erMax: 12, energy: 3.4, tags: h.tags, daypart: "evening" }; const ids = E.rankFor(T, b, { n: 4, blocked: blockedOf(b), feedback: likedMap(b) }).picks.map((p) => p.c.id); const l = newList(b, h.n[1] + " · AI", ids, "AI", { mood: [h.n[0], h.n[1]], vibe: "lively", hour: 18 }); (S.fest[b.id] = S.fest[b.id] || {})[h.d.join("-")] = l.id; logRun(["AI ชุดเทศกาล", "AI festive set"], [`${h.n[0]} · ${ids.length} คน (ผ่านกฎแบรนด์)`, `${h.n[1]} · ${ids.length} creators (pass the brand rules)`], b); S.modal = { kind: "pe", id: l.id, name: l.name, mood: l.mood, ids: [...l.creatorIds], q: "", hour: 18, vibe: "lively" }; },
    remind: (v) => { const h = holOn(+v); toast(L(`จะเตือนก่อน ${h.n[0]} 7 วัน`, `You'll be reminded 7 days before ${h.n[1]}`)); },
    toast: (v) => toast(TOASTS[v] ? tx(TOASTS[v]) : v),
    sp: (v) => { const sl = slotFromKey(wsB(), v); S.modal = { kind: "sp", v, pick: sl.slId, q: "", f: "all", scope: "day" }; },
    spf: (v) => (S.modal.f = v),
    sppick: (v) => (S.modal.pick = v),
    spscope: (v) => (S.modal.scope = v),
    spai: () => { const b = wsB(), M = S.modal, sl = slotFromKey(b, M.v); const l = newList(b, sl.name + " · AI", draftIds(b, sl, 4, { recent: [] }), "AI", { mood: sl.mood, vibe: sl.vibe, stage: sl.stage, hour: sl.s }); M.pick = l.id; logRun(["AI สร้าง shortlist", "AI built a shortlist"], [`${l.name} · ${l.creatorIds.length} คน`, `${l.name} · ${l.creatorIds.length} creators`], b); toast(L("AI สร้าง shortlist ให้ช่องนี้แล้ว · กด “ใช้ shortlist นี้” เพื่อยืนยัน", "AI built a shortlist for this slot · press “Use this shortlist” to confirm")); },
    spapply: () => { const b = wsB(), M = S.modal, sl = slotFromKey(b, M.v), n = applySlot(b, sl, M.pick, M.scope, "MD"); S.modal = null; toast(L(`ใช้ “${listOf(b, M.pick).name}” กับ ${n} ช่องแล้ว`, `“${listOf(b, M.pick).name}” is now used in ${n} slots`) + reapprove(b)); },
    sprec: () => { const b = wsB(), sl = slotFromKey(b, S.modal.v); S.rc = { b: ek(b), di: sl.di, i: sl.i, brief: "", trend: false, sel: [], showIn: false }; S.wstab = "rec"; S.modal = null; },
    // shortlists
    plf: (v) => (S.plf = v),
    plai: () => { const b = wsB(), tk = b.nextWeek[0], x = b.types[tk].slots[0], sl = { s: x[0], e: x[1], vibe: x[4], stage: x[5] }; const l = newList(b, "AI Mix " + (Object.values(slOf(b)).filter((l) => l.by === "AI").length + 1), draftIds(b, sl, 4, { recent: [] }), "AI", { mood: ["AI ร่างจาก VIBES", "AI draft from the VIBES"], vibe: x[4], hour: x[0] }); toast(L(`AI สร้าง “${l.name}” แล้ว · ยังไม่ได้ใช้กับช่องไหน`, `AI built “${l.name}” · not used in any slot yet`)); },
    pe: (v) => {
      const b = wsB();
      if (v && v[0] === "|") { const ctx = v.slice(1), sl = slotFromKey(b, ctx); S.modal = { kind: "pe", id: null, name: sl.name + L(" · ใหม่", " · new"), mood: sl.mood, ids: [], q: "", ctx, back: S.modal }; return; }
      const l = v ? listOf(b, v) : null;
      S.modal = l ? { kind: "pe", id: l.id, name: l.name, mood: l.mood, ids: [...l.creatorIds], q: "", hour: l.hour, vibe: l.vibe, stage: l.stage } : { kind: "pe", id: null, name: "", mood: "", ids: [], q: "", hour: 14 };
    },
    peup: (v) => { readPe(); const a = S.modal.ids, i = +v; if (i > 0) [a[i - 1], a[i]] = [a[i], a[i - 1]]; },
    pedn: (v) => { readPe(); const a = S.modal.ids, i = +v; if (i < a.length - 1) [a[i + 1], a[i]] = [a[i], a[i + 1]]; },
    perm: (v) => { readPe(); S.modal.ids.splice(+v, 1); },
    peadd: (v) => { readPe(); if (!S.modal.ids.includes(v)) S.modal.ids.push(v); },
    pefill: () => { readPe(); const b = wsB(), M = S.modal, { T } = peTarget(b, M); E.rankFor(T, b, { n: 2, avoid: M.ids, blocked: blockedOf(b), feedback: likedMap(b) }).picks.forEach((p) => M.ids.push(p.c.id)); },
    pedel: () => { readPe(); S.modal.confirm = true; },
    pedelyes: () => { const b = wsB(), M = S.modal, used = usage(b, M.id).length; delete slOf(b)[M.id]; S.modal = null; toast(L(`ลบแล้ว${used ? ` · ${used} ช่องที่ใช้อยู่ว่างแล้ว` : ""}`, `Deleted${used ? ` · ${used} slots are now empty` : ""}`) + (used ? reapprove(b) : "")); },
    pesave: () => {
      readPe(); const b = wsB(), M = S.modal;
      if (!String(M.name).trim()) { M.err = L("ใส่ชื่อ shortlist ก่อน", "Name the shortlist first"); return; }
      if (M.ids.length < 3) { M.err = L("ต้องมีอย่างน้อย 3 คน (หมุนเวียนได้ 3 วันไม่ซ้ำ)", "Needs at least 3 creators (to rotate 3 days without repeats)"); return; }
      let l, msg = "";
      if (M.id) { l = listOf(b, M.id); Object.assign(l, { name: M.name.trim(), mood: M.mood, creatorIds: [...M.ids] }); if (usage(b, l.id).length) msg = reapprove(b); }
      else { const { ctx } = peTarget(b, M); l = newList(b, M.name.trim(), [...M.ids], "MD", { mood: M.mood, vibe: ctx ? ctx.vibe : M.vibe, stage: ctx ? ctx.stage : M.stage, hour: ctx ? ctx.s : M.hour }); if (ctx && M.back) { S.modal = { ...M.back, pick: l.id }; toast(L("สร้างแล้ว · เลือกไว้ให้ช่องนี้ กด “ใช้ shortlist นี้” เพื่อยืนยัน", "Created and picked for this slot · press “Use this shortlist” to confirm")); return; } }
      S.modal = null; toast(L(`บันทึก “${l.name}” แล้ว`, `Saved “${l.name}”`) + msg);
    },
    // recommend
    rcday: (v) => { const rc = rcState(wsB()); rc.di = +v; rc.i = 0; rc.sel = []; },
    rcslot: (v) => { const rc = rcState(wsB()); rc.i = +v; rc.sel = []; },
    rcchip: (v) => { const rc = rcState(wsB()); rc.brief = (rc.brief + " " + v).trim(); rc.sel = []; },
    rcexp: () => { const rc = rcState(wsB()); rc.explain = !rc.explain; },
    rcin: () => { const rc = rcState(wsB()); rc.showIn = !rc.showIn; },
    rcall: () => { const b = wsB(), { rc, res, list } = rcRun(b); rc.sel = res.picks.filter((p) => rc.showIn || !(list ? list.creatorIds : []).includes(p.c.id)).slice(0, 4).map((p) => p.c.id); },
    rcadd: () => { const b = wsB(), { rc, list } = rcRun(b); rc.sel.forEach((id) => { if (!list.creatorIds.includes(id)) list.creatorIds.push(id); }); const n = rc.sel.length; rc.sel = []; logRun(["AI แนะนำ → เพิ่ม", "AI recommend → add"], [`${n} คน เข้า ${list.name}`, `${n} creators into ${list.name}`], b); toast(L(`เพิ่ม ${n} คนเข้า “${list.name}” แล้ว`, `Added ${n} creators to “${list.name}”`) + (usage(b, list.id).length ? reapprove(b) : "")); },
    rcnew: () => { const b = wsB(), { rc, sl } = rcRun(b); const l = newList(b, sl.name + " · AI", [...rc.sel], "AI", { mood: sl.mood, vibe: sl.vibe, stage: sl.stage, hour: sl.s }); applySlot(b, sl, l.id, "day", "AI"); rc.sel = []; logRun(["AI แนะนำ → shortlist ใหม่", "AI recommend → new shortlist"], [`${l.name} · ${l.creatorIds.length} คน · ใช้กับ ${DS_[sl.di][0]} ${hh(sl.s)}`, `${l.name} · ${l.creatorIds.length} creators · used ${DS_[sl.di][1]} ${hh(sl.s)}`], b); toast(L(`สร้าง “${l.name}” และใช้กับ ${DS(sl.di)} ${hh(sl.s)} แล้ว`, `Built “${l.name}” and used it ${DS(sl.di)} ${hh(sl.s)}`) + reapprove(b)); },
    wpack: (v) => { S.pack[S.ws] = v; toast(L(`${BR[S.ws].name} ใช้แพ็ก ${v === "pool" ? "Pool" : "Autopilot"}`, `${BR[S.ws].name} is on ${v === "pool" ? "Pool" : "Autopilot"}`)); },
    usedby: (v) => (S.modal = { kind: "usedby", v }),
    libsort: (v) => (S.lib.sort = v),
    rtab: (v) => (S.rtab = v),
    crep: (v) => (S.modal = { kind: "crep", v }),
    csv: () => { csvReport(); toast(L("ส่งออก CSV แล้ว", "CSV exported")); },
    sim: () => { const b = B(), cap = Math.round(b.budget * 0.2), res = E.validateReply(E.fakeLLMReply(b), b, cap), kept = res.rows.filter((r) => r.ok).length; S.sim = b.id; logRun(["จำลอง LLM", "Simulated LLM"], [`เสนอ ${res.rows.length} คน → ผ่าน ${kept} · ตัด ${res.rows.length - kept}`, `${res.rows.length} proposed → ${kept} pass · ${res.rows.length - kept} removed`], b); },
  };
  /** Read the editor's inputs back; an unchanged mood keeps its Thai/English pair. */
  function readPe() {
    const M = S.modal; if (!M || M.kind !== "pe") return;
    if ($("#pe-name")) M.name = $("#pe-name").value;
    if ($("#pe-mood") && $("#pe-mood").value !== tx(M.mood)) M.mood = $("#pe-mood").value;
    M.err = "";
  }
  function readOb() {
    const O = S.modal, v = (id) => $("#" + id);
    if (v("ob-name")) { O.name = v("ob-name").value; O.bk = +v("ob-kind").value; O.acc = v("ob-acc").value; O.zones = v("ob-zones").value; O.open = +v("ob-open").value || 8; O.close = +v("ob-close").value || 20; }
    if (v("ob-vibe")) { O.vibe = v("ob-vibe").value; O.thai = +v("ob-thai").value; O.er = +v("ob-er").value || 0; O.fam = v("ob-fam").checked; O.alc = v("ob-alc").checked; }
    if (v("ob-line")) { O.line = v("ob-line").value; O.pdpa = v("ob-pdpa").checked; }
  }

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-act]");
    if (!t || t.disabled) return;
    const f = ACT[t.dataset.act];
    if (!f) return;
    e.preventDefault();
    f(t.dataset.v);
    render();
  });
  document.addEventListener("change", (e) => {
    const t = e.target;
    if (t.id === "mock-brand") { S.brand = t.value; S.variant = 0; if (S.side === "studio" && S.ws) S.ws = t.value; }
    else if (t.id === "zone-sel") { S.zone[S.brand] = +t.value; S.variant = 0; }
    else if (t.id === "mock-clock") { CLK.pin = t.value === "" ? null : +t.value; setNow(); }
    else if (t.id === "cl-kind") S.cl.kind = t.value;
    else if (t.id === "lib-brand") S.lib.brand = t.value;
    else if (t.id === "lib-ag") S.lib.agency = t.value;
    else if (t.id === "rot") { S.rotate[ek(wsB())] = t.checked; toast(t.checked ? L("หมุนเวียนครีเอเตอร์ทุกวันแล้ว", "Creators rotate daily again") : L("ปิดการหมุนเวียน · ใช้ลำดับเดิมทุกวัน", "Rotation off · the same order every day")); }
    else if (t.id === "rc-trend") { rcState(wsB()).trend = t.checked; }
    else if (t.dataset.rc) { const rc = rcState(wsB()); rc.sel = t.checked ? [...rc.sel, t.dataset.rc] : rc.sel.filter((x) => x !== t.dataset.rc); }
    else return;
    render();
  });
  document.addEventListener("input", (e) => {
    const t = e.target, M = S.modal;
    if (t.id === "cl-q") S.cl.q = t.value;
    else if (t.id === "lib-q") S.lib.q = t.value;
    else if (t.id === "pl-q") S.plq = t.value;
    else if (t.id === "rc-brief") { const rc = rcState(wsB()); rc.brief = t.value; rc.sel = []; }
    else if (t.id === "h-q") M.q = t.value;
    else if (t.id === "sp-q") M.q = t.value;
    else if (t.id === "pe-q") { readPe(); M.q = t.value; }
    else if (t.id === "qs-q") { M.q = t.value; M.i = 0; }
    else return;
    render();
  });
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && S.side === "studio") { e.preventDefault(); S.modal = { kind: "qs", q: "", i: 0 }; render(); return; }
    if (!S.modal) return;
    if (e.key === "Escape") { S.modal = null; render(); return; }
    if (S.modal.kind === "qs") {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); S.modal.i = mod((S.modal.i || 0) + (e.key === "ArrowDown" ? 1 : -1), Math.max(1, S.modal.n || 1)); render(); }
      if (e.key === "Enter") { const el = document.querySelectorAll(".qs .row")[S.modal.i || 0]; if (el) { openWs(el.dataset.v); render(); } }
    }
  });
  // clock: re-render when the minute changes (MD: 1 s tick), unless the user is typing or a dialog is open
  setInterval(() => {
    const before = NOW.min + "|" + NOW.dn;
    setNow();
    if (before === NOW.min + "|" + NOW.dn) return;
    const a = document.activeElement;
    if (S.modal || (a && /INPUT|TEXTAREA|SELECT/.test(a.tagName))) return;
    render();
  }, 5000);

  // deep links (MD: hash tokens) e.g. #studio · #queue · #kora · #week · #next · #program · #rec · #en · #z1 (branch)
  location.hash.replace(/^#/, "").split(/[.&]/).forEach((tok) => {
    if (tok === "studio") S.side = "studio";
    else if (["queue", "brands", "library", "reports", "guard"].includes(tok)) { S.side = "studio"; S.stab = tok; }
    else if (BR[tok]) S.brand = tok;
    else if (["today", "week", "account"].includes(tok)) S.tab = tok;
    else if (tok === "next") S.wk = "next";
    else if (/^z\d$/.test(tok)) S.zone.__pending = +tok.slice(1);
    else if (["program", "lists", "rec", "brand", "pack"].includes(tok)) { S.side = "studio"; S.ws = S.brand; S.wstab = tok; }
  });
  if (S.zone.__pending != null) { S.zone[S.brand] = S.zone.__pending; delete S.zone.__pending; }
  if (S.ws) S.ws = S.brand;

  // for checks in the console and tests/run.mjs
  window.MR = { S, BR, ENGINE: E, ACT, render, postsOf, nowOf, daySlots, zoneView, slOf, lang: () => LANG };
  render();
})();
