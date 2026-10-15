/* ============================================================================
   MATCHROOM — mock data (ALL FICTIONAL). No real people, brands or statistics.
   This file is the ONLY source of truth: every number the UI or the "AI" shows
   must be read from here — never generated. (See README → Anti-hallucination.)
   Engine fields per creator (MD: track profile): energy 1–5 = content intensity,
   lang = content language, agency = talent agency (MD: artist — max 2 per shortlist),
   growth = 30-day follower growth ×, conf = how sure we are of the tags (0–1).
   ============================================================================ */

/** Creator roster — the "catalogue" (Music Director: tracks). */
window.ROSTER = [
  { id: "c01", handle: "@nam.sips", name: "Nam Siriporn", platform: "Instagram", followers: 182000, er: 5.8, avgViews: 41000, rate: 18000, city: "Bangkok", tags: ["cafe", "food", "lifestyle"], age: "18-24", female: 71, familySafe: true, alcohol: false, exclusive: null, off: [], energy: 2, lang: "th", agency: "Sip & Co.", growth: 1.3, conf: 0.9 },
  { id: "c02", handle: "@bkk.brewlog", name: "Tee Wattana", platform: "TikTok", followers: 96000, er: 8.4, avgViews: 64000, rate: 12000, city: "Bangkok", tags: ["cafe", "food", "local"], age: "18-24", female: 58, familySafe: true, alcohol: false, exclusive: null, off: [], energy: 3, lang: "th", agency: "Brew Network", growth: 1.8, conf: 0.85 },
  { id: "c03", handle: "@matcha.mornings", name: "Ploy Arunee", platform: "Instagram", followers: 54000, er: 7.1, avgViews: 15000, rate: 7000, city: "Chiang Mai", tags: ["cafe", "wellness", "lifestyle"], age: "25-34", female: 80, familySafe: true, alcohol: false, exclusive: null, off: [], energy: 1, lang: "th", agency: "อิสระ", growth: 1.2, conf: 0.95 },
  { id: "c04", handle: "@eatwithjay", name: "Jay Kittisak", platform: "YouTube", followers: 410000, er: 3.2, avgViews: 120000, rate: 45000, city: "Bangkok", tags: ["food", "local", "family"], age: "25-34", female: 46, familySafe: true, alcohol: false, exclusive: null, off: [], energy: 3, lang: "th", agency: "Big Bowl MCN", growth: 1.1, conf: 0.9 },
  { id: "c05", handle: "@mintmoves", name: "Mint Chalida", platform: "TikTok", followers: 230000, er: 9.6, avgViews: 150000, rate: 22000, city: "Bangkok", tags: ["fitness", "wellness", "lifestyle"], age: "18-24", female: 77, familySafe: true, alcohol: false, exclusive: null, off: [], energy: 5, lang: "th", agency: "Pulse Talent", growth: 2.2, conf: 0.9 },
  { id: "c06", handle: "@afterdark.bkk", name: "Krit Thanapol", platform: "Instagram", followers: 128000, er: 4.9, avgViews: 30000, rate: 16000, city: "Bangkok", tags: ["nightlife", "music", "luxury"], age: "25-34", female: 44, familySafe: false, alcohol: true, exclusive: null, off: [], energy: 4, lang: "en", agency: "Neon House", growth: 1.2, conf: 0.85 },
  { id: "c07", handle: "@rooftop.rae", name: "Rae Supitcha", platform: "TikTok", followers: 205000, er: 7.7, avgViews: 98000, rate: 20000, city: "Bangkok", tags: ["nightlife", "fashion", "lifestyle"], age: "18-24", female: 69, familySafe: false, alcohol: true, exclusive: null, off: [], energy: 4, lang: "th", agency: "Neon House", growth: 1.9, conf: 0.8 },
  { id: "c08", handle: "@cocktail.notes", name: "Ben Nopparat", platform: "Instagram", followers: 67000, er: 6.3, avgViews: 19000, rate: 9000, city: "Bangkok", tags: ["nightlife", "food", "luxury"], age: "25-34", female: 52, familySafe: false, alcohol: true, exclusive: null, off: [], energy: 3, lang: "en", agency: "อิสระ", growth: 1.1, conf: 0.9 },
  { id: "c09", handle: "@glowbyfah", name: "Fah Natcha", platform: "Instagram", followers: 315000, er: 4.4, avgViews: 62000, rate: 32000, city: "Bangkok", tags: ["beauty", "fashion", "lifestyle"], age: "18-24", female: 88, familySafe: true, alcohol: false, exclusive: "skincare", off: [], energy: 3, lang: "th", agency: "Glow Agency", growth: 1.0, conf: 0.9 },
  { id: "c10", handle: "@skin.science.th", name: "Dr. Pim Rattana", platform: "YouTube", followers: 188000, er: 5.1, avgViews: 54000, rate: 28000, city: "Bangkok", tags: ["beauty", "wellness"], age: "25-34", female: 84, familySafe: true, alcohol: false, exclusive: null, off: [], energy: 2, lang: "th", agency: "อิสระ", growth: 1.3, conf: 0.95 },
  { id: "c11", handle: "@barefacebee", name: "Bee Kanokwan", platform: "TikTok", followers: 142000, er: 10.2, avgViews: 120000, rate: 15000, city: "Chiang Mai", tags: ["beauty", "lifestyle", "local"], age: "18-24", female: 82, familySafe: true, alcohol: false, exclusive: null, off: [], energy: 4, lang: "th", agency: "Glow Agency", growth: 2.4, conf: 0.85 },
  { id: "c12", handle: "@slowskin.club", name: "Oil Pattama", platform: "Instagram", followers: 38000, er: 8.9, avgViews: 11000, rate: 5000, city: "Bangkok", tags: ["beauty", "wellness", "lifestyle"], age: "25-34", female: 90, familySafe: true, alcohol: false, exclusive: null, off: [], energy: 1, lang: "th", agency: "อิสระ", growth: 1.5, conf: 0.9 },
  { id: "c13", handle: "@trail.tong", name: "Tong Akkarin", platform: "YouTube", followers: 260000, er: 4.0, avgViews: 90000, rate: 30000, city: "Chiang Mai", tags: ["travel", "fitness", "local"], age: "25-34", female: 35, familySafe: true, alcohol: false, exclusive: null, off: [], energy: 3, lang: "th", agency: "Big Bowl MCN", growth: 1.1, conf: 0.9 },
  { id: "c14", handle: "@islandhop.ice", name: "Ice Wipada", platform: "Instagram", followers: 175000, er: 5.5, avgViews: 38000, rate: 17000, city: "Phuket", tags: ["travel", "lifestyle", "luxury"], age: "25-34", female: 66, familySafe: true, alcohol: false, exclusive: null, off: [], energy: 2, lang: "en", agency: "Sun Talent", growth: 1.3, conf: 0.85 },
  { id: "c15", handle: "@campfire.kids", name: "Por & Mae Family", platform: "YouTube", followers: 520000, er: 3.6, avgViews: 160000, rate: 52000, city: "Bangkok", tags: ["family", "travel", "food"], age: "25-34", female: 61, familySafe: true, alcohol: false, exclusive: null, off: [], energy: 3, lang: "th", agency: "Big Bowl MCN", growth: 1.0, conf: 0.95 },
  { id: "c16", handle: "@runwithnine", name: "Nine Sorawit", platform: "TikTok", followers: 88000, er: 9.1, avgViews: 70000, rate: 9500, city: "Bangkok", tags: ["fitness", "travel"], age: "18-24", female: 40, familySafe: true, alcohol: false, exclusive: null, off: [], energy: 5, lang: "th", agency: "Pulse Talent", growth: 1.7, conf: 0.9 },
  { id: "c17", handle: "@gadget.gam", name: "Gam Thiti", platform: "YouTube", followers: 390000, er: 3.0, avgViews: 110000, rate: 40000, city: "Bangkok", tags: ["tech", "lifestyle"], age: "25-34", female: 22, familySafe: true, alcohol: false, exclusive: null, off: [], energy: 3, lang: "th", agency: "Big Bowl MCN", growth: 0.95, conf: 0.9 },
  { id: "c18", handle: "@desk.setup.th", name: "Arm Pakorn", platform: "TikTok", followers: 112000, er: 7.9, avgViews: 76000, rate: 11000, city: "Bangkok", tags: ["tech", "lifestyle", "art"], age: "18-24", female: 30, familySafe: true, alcohol: false, exclusive: null, off: [], energy: 2, lang: "th", agency: "อิสระ", growth: 1.6, conf: 0.85 },
  { id: "c19", handle: "@paws.and.latte", name: "Mook Jirapat", platform: "Instagram", followers: 73000, er: 7.4, avgViews: 21000, rate: 8000, city: "Bangkok", tags: ["pet", "cafe", "lifestyle"], age: "25-34", female: 79, familySafe: true, alcohol: false, exclusive: null, off: [], energy: 2, lang: "th", agency: "Sip & Co.", growth: 1.4, conf: 0.9 },
  { id: "c20", handle: "@inkandclay", name: "Earth Thanakorn", platform: "Instagram", followers: 46000, er: 6.8, avgViews: 12000, rate: 6000, city: "Chiang Mai", tags: ["art", "local", "cafe"], age: "25-34", female: 63, familySafe: true, alcohol: false, exclusive: null, off: [], energy: 1, lang: "th", agency: "อิสระ", growth: 1.2, conf: 0.9 },
  { id: "c21", handle: "@streetbites.bkk", name: "Golf Anuchit", platform: "TikTok", followers: 310000, er: 6.6, avgViews: 180000, rate: 26000, city: "Bangkok", tags: ["food", "local", "nightlife"], age: "18-24", female: 49, familySafe: true, alcohol: false, exclusive: null, off: [], energy: 4, lang: "th", agency: "Brew Network", growth: 2.0, conf: 0.85 },
  { id: "c22", handle: "@quietluxe", name: "Pear Rinrada", platform: "Instagram", followers: 240000, er: 3.9, avgViews: 47000, rate: 30000, city: "Bangkok", tags: ["luxury", "fashion", "travel"], age: "25-34", female: 74, familySafe: true, alcohol: false, exclusive: null, off: [], energy: 1, lang: "en", agency: "Sun Talent", growth: 1.1, conf: 0.9 },
  { id: "c23", handle: "@yogawithfon", name: "Fon Siriwan", platform: "Instagram", followers: 99000, er: 6.0, avgViews: 24000, rate: 10000, city: "Phuket", tags: ["wellness", "fitness", "travel"], age: "25-34", female: 86, familySafe: true, alcohol: false, exclusive: "skincare", off: [], energy: 2, lang: "en", agency: "Pulse Talent", growth: 1.3, conf: 0.9 },
  { id: "c24", handle: "@vinyl.nights", name: "Toey Chanon", platform: "TikTok", followers: 61000, er: 8.2, avgViews: 43000, rate: 7500, city: "Bangkok", tags: ["music", "nightlife", "art"], age: "18-24", female: 55, familySafe: false, alcohol: true, exclusive: null, off: [], energy: 3, lang: "th", agency: "Neon House", growth: 1.5, conf: 0.85 },
];

/**
 * Brands (Music Director: shops). Each brand has "day types" × posting slots that cover its posting
 * window from open to close (MD: "จ–พ BGM / พฤ–ส ชาร์ต / อา ชิล", 1 slot = 1 playlist).
 * Slot = [startHour, endHour, shortlistName, [moodTh, moodEn], vibe, funnelStage]; 1 slot = 1 shortlist, creators rotate daily.
 * Text the brand reads is a [Thai, English] pair (MD: every string has both languages).
 * zones = branches (MD: zones of a venue). A branch with an entry in zoneProg (keyed by its index) has its own
 * program; a branch without one shares the main branch's program until the Director splits it.
 * Shortlists, package, publish status and likes / "not this" belong to the brand, so every branch shares them.
 * Rules are machine-checkable, not prose.
 */
window.BRANDS = [
  {
    id: "mori", name: "Mori Matcha House", kind: ["คาเฟ่", "Café"], type: "Café chain", color: "#7FB77E", open: 7, close: 21,
    accounts: ["Instagram", "TikTok"], budget: 400000,
    zones: [["สาขาสยาม", "Siam branch"], ["สาขานิมมาน (เชียงใหม่)", "Nimman branch (Chiang Mai)"]],
    vibe: ["มัทฉะยามเช้า สงบ อบอุ่น · สายสุขภาพ มากันทั้งครอบครัวได้", "Morning matcha, calm and warm · healthy, family-friendly"],
    audience: ["คนทำงาน 22–35 ปี ชอบคาเฟ่และสุขภาพ", "Office workers aged 22–35 who like cafés and wellness"], refs: "@matcha.mornings, @nam.sips",
    tags: ["cafe", "food", "wellness", "lifestyle"], signature: { name: "Matcha Ritual", tags: ["cafe", "wellness"] },
    thaiShare: 0.8, banned: [], rules: { familySafe: true, noAlcohol: true, conflict: null }, minER: 4,
    notes: [["ห้ามคอนเทนต์แอลกอฮอล์ — แบรนด์สายครอบครัว", "No alcohol content — a family brand"], ["เน้นวิดีโอเช้า ช่วงคนรีบเข้างาน", "Focus on morning videos for the commute"], ["ใช้เฉพาะครีเอเตอร์ที่ ER ≥ 4%", "Only creators with ER ≥ 4%"]],
    activity: [3, 2, 1, 1, 2, 6, 14, 28, 42, 38, 30, 34, 46, 40, 28, 24, 26, 32, 44, 50, 46, 34, 18, 8],
    pack: "pool", status: "review", relaxed: "B",
    types: {
      A: { name: ["วันทำงาน", "Workday"], mood: ["เช้ารีบ เที่ยงกิน เย็นพัก", "Rush, lunch, unwind"], color: "#9b7bff", slots: [[7, 10, "Morning Ritual", ["อุ่น ๆ ตื่นเช้า", "Warm wake-up"], "cozy", "awareness"], [10, 13, "Lunch Break Bites", ["มื้อเที่ยงสดใส", "Bright lunch"], "fresh", "consideration"], [13, 17, "Afternoon Matcha Break", ["พักบ่ายสบาย ๆ", "Easy afternoon"], "cozy", "consideration"], [17, 21, "Evening Unwind", ["ผ่อนคลายหลังเลิกงาน", "After-work unwind"], "calm", "conversion"]] },
      B: { name: ["วันหยุด", "Weekend"], mood: ["ตื่นสาย ชวนเพื่อน", "Sleep in, bring friends"], color: "#5fd39a", slots: [[7, 11, "Slow Weekend", ["ตื่นสาย สบาย ๆ", "Slow and easy"], "calm", "awareness"], [11, 15, "Brunch & Friends", ["ชวนเพื่อนมาคาเฟ่", "Café with friends"], "fresh", "consideration"], [15, 18, "Golden Hour Matcha", ["แสงเย็นอบอุ่น", "Warm golden hour"], "cozy", "conversion"], [18, 21, "Family Evening", ["มากันทั้งบ้าน", "The whole family"], "cozy", "loyalty"]] },
    },
    week: ["A", "A", "A", "A", "A", "B", "B"], nextWeek: ["A", "A", "A", "A", "A", "B", "B"],
    special: { day: 5, s: 11, name: "Mori Pop-up Day", mood: ["เปิดสาขาใหม่ · คำขอแบรนด์", "New branch opening · brand request"], vibe: "lively", stage: "awareness" },
    zoneProg: {
      1: {
        open: 8, close: 20, relaxed: "B",
        types: {
          A: { name: ["วันธรรมดา", "Weekday"], mood: ["เชียงใหม่ช้า ๆ", "Slow Chiang Mai"], color: "#7aa2ff", slots: [[8, 11, "Nimman Slow Morning", ["เช้าช้า ๆ", "Slow morning"], "calm", "awareness"], [11, 15, "Nimman Café Hop", ["คาเฟ่ฮอปปิ้ง", "Café hopping"], "fresh", "consideration"], [15, 20, "Doi View Evening", ["เย็นสบายวิวดอย", "Mountain-view evening"], "cozy", "conversion"]] },
          B: { name: ["สุดสัปดาห์", "Weekend"], mood: ["นักท่อง\u2060เที่ยวมาเยอะ", "Lots of tourists"], color: "#f2b45a", slots: [[8, 12, "Weekend Café Trail", ["เที่ยวคาเฟ่วันหยุด", "Weekend café trail"], "fresh", "awareness"], [12, 16, "Old City Walk", ["เดินเมืองเก่า", "Old-city walk"], "lively", "consideration"], [16, 20, "Sunset Matcha", ["ชาเขียวยามเย็น", "Matcha at sunset"], "cozy", "conversion"]] },
        },
        week: ["A", "A", "A", "A", "B", "B", "B"], nextWeek: ["A", "A", "A", "A", "B", "B", "B"],
      },
    },
    seed: { "Morning Ritual": ["c01", "c03", "c02"], "Lunch Break Bites": ["c21", "c19", "c02"] },
    rep: { onTime: [54, 56], likes: 9, reqHrs: 3, reqPast: 1, renew: ["มี.ค. 2570", "Mar 2027"] },
  },
  {
    id: "lumen", name: "Lumen Rooftop Bar", kind: ["บาร์", "Bar"], type: "Nightlife", color: "#B48CFF", open: 16, close: 24,
    accounts: ["Instagram", "TikTok"], budget: 260000,
    vibe: ["รูฟท็อปวิวเมือง หรู คึกช่วงสุดสัปดาห์ · ผู้ชม 20+ เท่านั้น", "City-view rooftop, upscale, busy at weekends · 20+ audience only"],
    audience: ["คนเมือง 25–35 ปี และนักท่องเที่ยว", "City people aged 25–35 and tourists"], refs: "@afterdark.bkk, @rooftop.rae",
    tags: ["nightlife", "music", "luxury", "fashion"], signature: { name: "Skyline Nights", tags: ["nightlife", "luxury"] },
    thaiShare: 0.4, banned: ["family"], rules: { familySafe: false, noAlcohol: false, conflict: null, adultOnly: true }, minER: 4,
    notes: [["ผู้ชมต้องอายุ 20+ — ไม่ใช้ครีเอเตอร์สายครอบครัว/เด็ก", "Audience must be 20+ — no family or kids creators"], ["พีคศุกร์–เสาร์ หลัง 20:00", "Peak is Fri–Sat after 20:00"], ["งบรวมไม่เกิน ฿260,000/สัปดาห์", "Budget up to ฿260,000 a week"]],
    activity: [30, 22, 12, 6, 3, 2, 3, 6, 10, 12, 14, 18, 22, 20, 18, 20, 26, 34, 44, 56, 66, 72, 64, 46],
    pack: "auto", status: "draft", relaxed: "A",
    types: {
      A: { name: ["อา–พฤ ชิล", "Sun–Thu chill"], mood: ["นั่งชิลชมวิว", "Chill with a view"], color: "#7aa2ff", slots: [[16, 19, "Sunset Preview", ["แสงสุดท้ายของวัน", "Last light of the day"], "stylish", "awareness"], [19, 22, "Dinner & Drinks", ["มื้อค่ำบนดาดฟ้า", "Rooftop dinner"], "lively", "consideration"], [22, 24, "Night Lounge", ["ช้า ลึก หรู", "Slow, deep, upscale"], "stylish", "conversion"]] },
      B: { name: ["ศ–ส พีค", "Fri–Sat peak"], mood: ["คึกเต็มที่", "Full energy"], color: "#ff7a90", slots: [[16, 18, "Weekend Warm-up", ["เริ่มคึก", "Warming up"], "lively", "awareness"], [18, 21, "Golden Sky", ["ฮิตยามค่ำ", "Evening hits"], "stylish", "consideration"], [21, 24, "Peak Night Live", ["คึกเต็มที่", "Full energy"], "hype", "conversion"]] },
    },
    week: ["A", "A", "A", "A", "B", "B", "A"], nextWeek: ["A", "A", "A", "A", "B", "B", "A"],
    seed: { "Peak Night Live": ["c06", "c07", "c24"] },
    rep: { onTime: [38, 42], likes: 4, reqHrs: 6, reqPast: 2, renew: ["ม.ค. 2570", "Jan 2027"] },
  },
  {
    id: "kora", name: "Kora Skin Lab", kind: ["สกินแคร์", "Skincare"], type: "Skincare", color: "#FF8FA3", open: 8, close: 22,
    accounts: ["Instagram", "TikTok", "YouTube"], budget: 260000,
    vibe: ["รีวิวจริง ผิวสุขภาพดี ไม่โอเวอร์เคลม", "Honest reviews, healthy skin, no over-claiming"],
    audience: ["ผู้หญิง 18–34 ปี ใส่ใจส่วนผสม", "Women aged 18–34 who read ingredient lists"], refs: "@skin.science.th, @slowskin.club",
    tags: ["beauty", "wellness", "lifestyle"], signature: { name: "Honest Glow", tags: ["beauty", "wellness"] },
    thaiShare: 0.7, banned: ["nightlife"], rules: { familySafe: true, noAlcohol: true, conflict: "skincare" }, minER: 4, minFemale: 70,
    notes: [["ห้ามครีเอเตอร์ที่ติดสัญญา exclusive กับแบรนด์สกินแคร์อื่น", "No creators under exclusive contracts with other skincare brands"], ["เน้นรีวิวจริง ไม่ใช้คำว่า 'รักษา'", "Real reviews; never say 'cure'"], ["ผู้ชมผู้หญิง ≥ 70%", "Female audience ≥ 70%"]],
    activity: [8, 4, 2, 1, 1, 3, 10, 18, 24, 26, 24, 26, 30, 28, 24, 22, 24, 30, 40, 48, 52, 46, 30, 16],
    pack: "pool", status: "live", relaxed: "B",
    types: {
      A: { name: ["จ–ศ รูทีน", "Mon–Fri routine"], mood: ["รูทีนเช้า–ค่ำ", "Morning-to-night routine"], color: "#f2b45a", slots: [[8, 11, "AM Routine", ["เช้าสดชื่น", "Fresh morning"], "calm", "awareness"], [11, 15, "Lunch Glow Check", ["เติมความชุ่มชื้น", "Midday hydration"], "fresh", "consideration"], [15, 19, "Afternoon Reset", ["พักผิวระหว่างวัน", "Skin break"], "calm", "consideration"], [19, 22, "PM Routine Review", ["รีวิวก่อนนอน", "Bedtime review"], "stylish", "conversion"]] },
      B: { name: ["ส–อา เซลฟ์แคร์", "Sat–Sun self-care"], mood: ["พักผิว พักใจ", "Rest skin, rest mind"], color: "#5fd39a", slots: [[8, 12, "Weekend Reset", ["ตื่นสาย ผิวสบาย", "Slow morning skin"], "calm", "awareness"], [12, 18, "Self-care Day", ["ดูแลตัวเองเต็มวัน", "A full self-care day"], "cozy", "consideration"], [18, 22, "Self-care Night", ["ละมุนก่อนนอน", "Gentle night"], "cozy", "loyalty"]] },
    },
    week: ["A", "A", "A", "A", "A", "B", "B"], nextWeek: ["A", "A", "A", "A", "A", "B", "B"],
    seed: { "PM Routine Review": ["c10", "c11", "c12"] },
    rep: { onTime: [52, 56], likes: 12, reqHrs: 4, reqPast: 2, renew: ["ก.พ. 2570", "Feb 2027"] },
  },
  {
    id: "somtam", name: "Somtam Social", kind: ["ร้านอาหาร", "Restaurant"], type: "Restaurant", color: "#f2b45a", open: 11, close: 23,
    accounts: ["TikTok", "Instagram"], budget: 220000,
    zones: [["สาขาอารีย์", "Ari branch"], ["สาขาทองหล่อ", "Thonglor branch"]],
    vibe: ["ส้มตำสตรีทฟู้ด สนุก เป็นกันเอง · คึกช่วงศุกร์–เสาร์", "Street-food som tam, fun and friendly · busy Fri–Sat"],
    audience: ["วัยรุ่นและคนทำงาน 18–30 ปี", "Students and workers aged 18–30"], refs: "@streetbites.bkk",
    tags: ["food", "local", "nightlife"], signature: { name: "Isan Street", tags: ["food", "local"] },
    thaiShare: 0.9, banned: [], rules: {}, minER: 4,
    notes: [["เน้นคลิปกินจริง เห็นจานชัด", "Real eating clips with the dish in clear view"], ["ศุกร์–เสาร์ เน้นปาร์ตี้หลังเลิกงาน", "Fri–Sat: after-work parties"]],
    activity: [10, 6, 3, 2, 2, 3, 6, 10, 14, 18, 26, 40, 48, 36, 24, 22, 28, 40, 52, 58, 54, 44, 30, 18],
    pack: "auto", status: "live", relaxed: "A",
    types: {
      A: { name: ["ปกติ", "Regular"], mood: ["กินเล่นทั้งวัน", "Snacking all day"], color: "#f2b45a", slots: [[11, 14, "Lunch Rush", ["มื้อเที่ยงคึกคัก", "Busy lunch"], "fresh", "awareness"], [14, 17, "Afternoon Snack", ["ของกินเล่นยามบ่าย", "Afternoon snacks"], "fresh", "consideration"], [17, 20, "Dinner Crowd", ["มื้อเย็นกับเพื่อน", "Dinner with friends"], "lively", "conversion"], [20, 23, "Late Night Bites", ["หิวดึก", "Late-night hunger"], "lively", "loyalty"]] },
      B: { name: ["ศ–ส ปาร์ตี้", "Fri–Sat party"], mood: ["ปาร์ตี้หลังเลิกงาน", "After-work party"], color: "#ff7a90", slots: [[11, 14, "Lunch Rush", ["มื้อเที่ยงคึกคัก", "Busy lunch"], "fresh", "awareness"], [14, 18, "Weekend Feast", ["ยกแก๊งมากิน", "Bring the whole gang"], "lively", "consideration"], [18, 23, "Party Table", ["คึกเต็มโต๊ะ", "A lively table"], "hype", "conversion"]] },
    },
    week: ["A", "A", "A", "A", "B", "B", "A"], nextWeek: ["A", "A", "A", "A", "B", "B", "A"],
    rep: { onTime: [53, 56], likes: 6, reqHrs: 5, reqPast: 1, renew: ["เม.ย. 2570", "Apr 2027"] },
  },
  {
    id: "peakfit", name: "Peak Fit Studio", kind: ["ฟิตเนส", "Fitness"], type: "Fitness", color: "#5fd39a", open: 6, close: 22,
    accounts: ["TikTok", "Instagram"], budget: 200000,
    vibe: ["ยิมย่านทองหล่อ พลังสูงช่วงเช้าและเย็น", "Thonglor gym, high energy morning and evening"],
    audience: ["คนทำงาน 22–40 ปี ออกกำลังกายสม่ำเสมอ", "Workers aged 22–40 who train regularly"], refs: "@mintmoves, @runwithnine",
    tags: ["fitness", "wellness", "lifestyle"], signature: { name: "Move Daily", tags: ["fitness", "wellness"] },
    thaiShare: 0.7, banned: [], rules: { familySafe: true }, minER: 4,
    notes: [["ห้ามอ้างผลลัพธ์ลดน้ำหนักเกินจริง", "No exaggerated weight-loss claims"], ["เช้าและเย็นคือช่วงคนเข้ายิม", "Mornings and evenings are gym time"]],
    activity: [4, 2, 1, 1, 6, 22, 40, 44, 30, 20, 16, 18, 26, 20, 16, 16, 24, 42, 56, 50, 36, 22, 12, 6],
    pack: "auto", status: "live", relaxed: "B",
    types: {
      A: { name: ["วันทำงาน", "Workday"], mood: ["ก่อนงาน–หลังงาน", "Before and after work"], color: "#5fd39a", slots: [[6, 9, "Sunrise Session", ["ปลุกพลังเช้า", "Morning power"], "hype", "awareness"], [9, 12, "Mid-morning Stretch", ["ยืดเหยียดสบาย ๆ", "Easy stretching"], "calm", "consideration"], [12, 17, "Lunch Burn", ["เบิร์นช่วงพัก", "Lunch-break burn"], "lively", "consideration"], [17, 22, "After-work Pump", ["หลังเลิกงานเต็มพลัง", "After-work power"], "hype", "conversion"]] },
      B: { name: ["วันหยุด", "Weekend"], mood: ["วิ่ง พัก ฟื้นตัว", "Run, rest, recover"], color: "#7aa2ff", slots: [[6, 10, "Weekend Run", ["วิ่งเช้าวันหยุด", "Weekend morning run"], "lively", "awareness"], [10, 16, "Recovery Day", ["พักกล้ามเนื้อ", "Muscle recovery"], "calm", "consideration"], [16, 22, "Weekend Burn", ["เบิร์นปิดสัปดาห์", "End-of-week burn"], "hype", "conversion"]] },
    },
    week: ["A", "A", "A", "A", "A", "B", "B"], nextWeek: ["A", "A", "A", "A", "A", "B", "B"],
    rep: { onTime: [51, 56], likes: 3, reqHrs: 7, reqPast: 3, renew: ["ธ.ค. 2569", "Dec 2026"] },
  },
  {
    id: "paperplane", name: "Paper Plane Travel", kind: ["ท่องเที่ยว", "Travel"], type: "Travel", color: "#7aa2ff", open: 8, close: 21,
    accounts: ["Instagram", "YouTube"], budget: 240000,
    vibe: ["ทริปสั้นสุดสัปดาห์ หรูพอดี เที่ยวได้จริง", "Short weekend trips, a little upscale, easy to book"],
    audience: ["คนทำงาน 25–40 ปี ชอบเที่ยวสั้น ๆ", "Workers aged 25–40 who like short trips"], refs: "@islandhop.ice, @trail.tong",
    tags: ["travel", "lifestyle", "luxury"], signature: { name: "Weekend Escape", tags: ["travel", "luxury"] },
    thaiShare: 0.5, banned: [], rules: {}, minER: 4,
    notes: [["ต้องโชว์ราคาแพ็กเกจจริงในคลิป", "Clips must show the real package price"], ["ศุกร์–อาทิตย์ เน้นดีลนาทีสุดท้าย", "Fri–Sun: last-minute deals"]],
    activity: [6, 3, 2, 1, 1, 2, 6, 14, 22, 26, 24, 28, 34, 30, 26, 24, 26, 30, 38, 44, 46, 40, 26, 12],
    pack: "pool", status: "live", relaxed: "A",
    types: {
      A: { name: ["จ–พฤ วางแผน", "Mon–Thu planning"], mood: ["ฝันถึงทริปถัดไป", "Dreaming of the next trip"], color: "#7aa2ff", slots: [[8, 12, "Wanderlust Morning", ["ฝันกลางวัน", "Daydreaming"], "calm", "awareness"], [12, 17, "Trip Planning", ["วางแผนเที่ยว", "Planning a trip"], "fresh", "consideration"], [17, 21, "Book Tonight", ["จองคืนนี้", "Book tonight"], "stylish", "conversion"]] },
      B: { name: ["ศ–อา ดีลสุดสัปดาห์", "Fri–Sun weekend deals"], mood: ["เที่ยวเลย", "Go now"], color: "#f2b45a", slots: [[8, 12, "Weekend Getaway", ["ออกเดินทาง", "Hit the road"], "fresh", "awareness"], [12, 17, "Island Hopping", ["ทะเลสดใส", "Bright sea"], "lively", "consideration"], [17, 21, "Last-minute Deals", ["ดีลนาทีสุดท้าย", "Last-minute deals"], "hype", "conversion"]] },
    },
    week: ["A", "A", "A", "A", "B", "B", "B"], nextWeek: ["A", "A", "A", "A", "B", "B", "B"],
    rep: { onTime: [40, 42], likes: 5, reqHrs: 2, reqPast: 0, renew: ["พ.ค. 2570", "May 2027"] },
  },
];

/** Hand-made shortlists from the first mockup (MD: curated playlists). Used as "Director จัดเอง" seeds. */
window.SEED_SHORTLISTS = {
  mori: [
    { id: "sl_mori_am", name: "Morning Ritual Crew", creatorIds: ["c01", "c03", "c02"], createdBy: "Director" },
    { id: "sl_mori_food", name: "Lunch & Local Eats", creatorIds: ["c21", "c19", "c02"], createdBy: "Director" },
  ],
  lumen: [{ id: "sl_lumen_night", name: "After Dark Voices", creatorIds: ["c06", "c07", "c24"], createdBy: "Director" }],
  kora: [{ id: "sl_kora_glow", name: "Honest Skin Reviews", creatorIds: ["c10", "c11", "c12"], createdBy: "Director" }],
};

/**
 * Upcoming days that matter (MD: HOLI). off = a holiday → suggest the brand's relaxed day type;
 * fest = a festival / shopping day → the Director can prepare a festive shortlist. th = Thai-only.
 */
window.HOLI = [
  { d: [2026, 10, 23], n: ["วันปิยมหาราช", "Chulalongkorn Day"], k: "off", th: true },
  { d: [2026, 10, 31], n: ["ฮาโลวีน", "Halloween"], k: "fest", tags: ["nightlife", "fashion", "art", "music"] },
  { d: [2026, 11, 11], n: ["11.11 ช้อปปิ้ง", "11.11 shopping day"], k: "fest", tags: ["fashion", "beauty", "tech", "lifestyle"] },
  { d: [2026, 12, 5], n: ["วันพ่อแห่งชาติ", "Father's Day (Thailand)"], k: "off", th: true },
  { d: [2026, 12, 10], n: ["วันรัฐธรรมนูญ", "Constitution Day"], k: "off", th: true },
  { d: [2026, 12, 12], n: ["12.12 ช้อปปิ้ง", "12.12 shopping day"], k: "fest", tags: ["fashion", "beauty", "tech", "lifestyle"] },
  { d: [2026, 12, 25], n: ["คริสต์มาส", "Christmas"], k: "fest", tags: ["lifestyle", "food", "cafe", "luxury"] },
  { d: [2026, 12, 31], n: ["วันสิ้นปี", "New Year's Eve"], k: "off", th: true },
];

/** Keyword lexicon (EN + TH) → roster tags. The matcher can only ever produce these tags. */
window.LEXICON = {
  cafe: ["cafe", "coffee", "matcha", "latte", "คาเฟ่", "กาแฟ", "มัทฉะ", "ชาเขียว"],
  food: ["food", "eat", "lunch", "dinner", "snack", "อาหาร", "กิน", "ของกิน", "มื้อ", "สตรีทฟู้ด"],
  lifestyle: ["lifestyle", "daily", "routine", "ไลฟ์สไตล์", "ชีวิตประจำวัน", "รูทีน"],
  wellness: ["wellness", "healthy", "calm", "mindful", "สุขภาพ", "ผ่อนคลาย", "เวลเนส"],
  fitness: ["fitness", "gym", "run", "workout", "ออกกำลัง", "วิ่ง", "ฟิตเนส"],
  nightlife: ["night", "bar", "party", "rooftop", "cocktail", "กลางคืน", "บาร์", "ปาร์ตี้", "ค็อกเทล"],
  music: ["music", "dj", "live", "vinyl", "ดนตรี", "เพลง", "ดีเจ"],
  luxury: ["luxury", "premium", "upscale", "หรู", "พรีเมียม", "ไฮเอนด์"],
  fashion: ["fashion", "outfit", "style", "แฟชั่น", "แต่งตัว", "สไตล์"],
  beauty: ["beauty", "skincare", "skin", "makeup", "glow", "ความงาม", "สกินแคร์", "ผิว", "แต่งหน้า"],
  travel: ["travel", "trip", "island", "trail", "เที่ยว", "ทริป", "เดินป่า", "ทะเล"],
  family: ["family", "kids", "ครอบครัว", "เด็ก"],
  local: ["local", "thai", "neighborhood", "ท้องถิ่น", "ไทย", "ย่าน", "ชุมชน"],
  tech: ["tech", "gadget", "setup", "เทค", "แกดเจ็ต", "ไอที"],
  pet: ["pet", "dog", "cat", "สัตว์เลี้ยง", "หมา", "แมว"],
  art: ["art", "craft", "design", "ศิลปะ", "งานคราฟต์", "ดีไซน์"],
};

/** Funnel stages (Music Director: circadian phases). */
window.STAGES = [
  { id: "awareness", th: "การรับรู้", en: "Awareness" },
  { id: "consideration", th: "พิจารณา", en: "Consideration" },
  { id: "conversion", th: "ตัดสินใจซื้อ", en: "Conversion" },
  { id: "loyalty", th: "ความภักดี", en: "Loyalty" },
];
