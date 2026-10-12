const translations = {
  ja: {
    navHome: "ホーム", navCar: "愛車", navBook: "予約", navHistory: "履歴",
    greeting: "こんにちは、Rakshithさん", careAtGlance: "今日の愛車の状況です",
    nextActions: "次に必要なこと", quickActions: "クイックメニュー", viewAll: "すべて見る",
    shaken: "車検", due42: "満了日まであと42日", oil: "オイル交換", quoteReady: "お見積もりの承認待ち",
    insurance: "保険更新", due88: "更新まであと88日", bookService: "整備を予約", findStorage: "保管場所を探す", addRecord: "記録を追加",
    myCar: "愛車", vehicleDetails: "車両情報とメンテナンス予定", edit: "編集", parking: "駐車スタイル", existingParking: "駐車場あり",
    mileage: "走行距離", nextShaken: "次回車検", serviceSchedule: "メンテナンス予定", requestService: "サービスを依頼",
    chooseJourney: "ご利用スタイルを選択", haveParking: "駐車場をお持ちの方", haveParkingDesc: "整備予約とお知らせ", needStorage: "保管場所をお探しの方", needStorageDesc: "提携先での保管とケア",
    serviceType: "サービス", preferredDate: "希望日", location: "地域・受け渡し場所", note: "ご要望", sendRequest: "見積もりを依頼",
    approvalNote: "料金を確認し、お客様が承認するまで作業は開始されません。引き取り・お届けは別途お見積もりします。",
    activity: "予約・整備履歴", currentRequest: "進行中", history: "完了したサービス", quote: "お見積もり", approve: "承認する", approved: "承認済み", viewQuote: "見積もりを見る", taxIncluded: "税込", requested: "依頼受付", preparing: "見積作成", confirmed: "予約確定", completed: "作業完了", goodCondition: "車両状態に問題はありません", parkedAt: "現在地：自宅駐車場・江戸川区",
    requestSent: "ご依頼を受け付けました。提携先を確認後、お見積もりをご連絡します。", quoteApproved: "お見積もりを承認しました。予約確定後にお知らせします。",
    saved: "車両情報を保存しました", statusRequested: "見積もり確認中", statusComplete: "完了", noRequests: "進行中の依頼はありません。",
    serviceOil: "オイル交換", serviceShaken: "車検・点検", serviceTyre: "タイヤ交換", serviceWash: "洗車・ディテイリング", serviceStorage: "提携先での保管",
    name: "車名", plate: "ナンバー", year: "年式", save: "保存", demoData: "試験用データ",
  },
  en: {
    navHome: "Home", navCar: "My car", navBook: "Book", navHistory: "History",
    greeting: "Good afternoon, Rakshith", careAtGlance: "Here’s today’s vehicle overview",
    nextActions: "Next actions", quickActions: "Quick actions", viewAll: "View all",
    shaken: "Shaken inspection", due42: "Due in 42 days", oil: "Oil change", quoteReady: "Quote waiting for approval",
    insurance: "Insurance renewal", due88: "Due in 88 days", bookService: "Book service", findStorage: "Find storage", addRecord: "Add record",
    myCar: "My car", vehicleDetails: "Vehicle details and care schedule", edit: "Edit", parking: "Parking style", existingParking: "Existing parking",
    mileage: "Mileage", nextShaken: "Next shaken", serviceSchedule: "Service schedule", requestService: "Request a service",
    chooseJourney: "Choose your starting point", haveParking: "I already have parking", haveParkingDesc: "Reminders and maintenance booking", needStorage: "I need storage", needStorageDesc: "Partner storage plus care",
    serviceType: "Service", preferredDate: "Preferred date", location: "Area or pickup location", note: "Anything we should know?", sendRequest: "Request a quote",
    approvalNote: "No work starts until you review the price and approve it. Collection and return are quoted separately.",
    activity: "Bookings and service history", currentRequest: "In progress", history: "Completed services", quote: "Quote", approve: "Approve quote", approved: "Approved", viewQuote: "View quote", taxIncluded: "Tax included", requested: "Requested", preparing: "Quote ready", confirmed: "Confirmed", completed: "Completed", goodCondition: "No vehicle issues reported", parkedAt: "Current location: Home parking, Edogawa",
    requestSent: "Request received. We’ll check partner availability and send you a quote.", quoteApproved: "Quote approved. We’ll notify you when the appointment is confirmed.",
    saved: "Vehicle details saved", statusRequested: "Checking quote", statusComplete: "Completed", noRequests: "You have no active requests.",
    serviceOil: "Oil change", serviceShaken: "Shaken / inspection", serviceTyre: "Tyre change", serviceWash: "Wash / detailing", serviceStorage: "Partner storage",
    name: "Vehicle name", plate: "Plate number", year: "Year", save: "Save", demoData: "Pilot demo",
  }
};

const defaultState = {
  lang: "ja",
  vehicle: { name: "Toyota Prius", year: "2021", plate: "品川 330 あ 12-34", mileage: "24,680", parking: "existing" },
  requests: [{ id: 1, service: "serviceOil", date: "2026-10-18", location: "Edogawa, Tokyo", status: "quote", price: 8800, partner: "Koiwa Auto Service", slot: "10:30–11:00", items: [{ nameJa: "エンジンオイル 0W-20", nameEn: "Engine oil 0W-20", price: 5200 }, { nameJa: "オイルフィルター", nameEn: "Oil filter", price: 1800 }, { nameJa: "交換作業料", nameEn: "Service labour", price: 1800 }] }]
};

let state = loadState();
function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem("carmori-state"));
    if (!saved) return structuredClone(defaultState);
    const demoRequest = defaultState.requests[0];
    return {
      ...defaultState,
      ...saved,
      vehicle: { ...defaultState.vehicle, ...(saved.vehicle || {}) },
      requests: (saved.requests || defaultState.requests).map(request => request.id === demoRequest.id ? {
        ...demoRequest,
        ...request,
        items: request.items || demoRequest.items
      } : request)
    };
  }
  catch { return structuredClone(defaultState); }
}
function saveState() { localStorage.setItem("carmori-state", JSON.stringify(state)); }
function t(key) { return translations[state.lang][key] || key; }
function formatYen(value) { return new Intl.NumberFormat(state.lang === "ja" ? "ja-JP" : "en-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(value); }
function pageHeader(eyebrow, title, sub) { return `<p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="muted">${sub}</p>`; }

function dashboard() {
  const mileage = Number(String(state.vehicle.mileage).replace(/[^0-9.]/g, "")) || 0;
  const today = new Intl.DateTimeFormat(state.lang === "ja" ? "ja-JP" : "en-JP", { month: "long", day: "numeric", weekday: "long" }).format(new Date());
  return `<section class="page">
    ${pageHeader(today, t("greeting"), t("careAtGlance"))}
    <article class="hero-card">
      <div class="vehicle-title"><span>${t("existingParking")}</span><small>CAR-001</small></div>
      <p class="car-name">${escapeHtml(state.vehicle.name)}</p><p class="plate">${escapeHtml(state.vehicle.plate)}</p>
      <div class="health-row"><span class="health-dot"></span>${t("goodCondition")}</div><p class="plate">${t("parkedAt")}</p>
      <div class="hero-actions"><a class="button" href="#book">＋ ${t("bookService")}</a><a class="button secondary" href="#vehicle">${t("myCar")}</a></div>
    </article>
    <div class="stats"><div class="stat"><strong>42</strong><span>${t("nextShaken")}</span></div><div class="stat"><strong>${mileage.toLocaleString()}</strong><span>${t("mileage")} km</span></div><div class="stat"><strong>${state.requests.length}</strong><span>${t("currentRequest")}</span></div></div>
    <div class="section-head"><h2>${t("nextActions")}</h2><a href="#activity">${t("viewAll")}</a></div>
    <div class="card-list">
      <article class="card card-row"><span class="icon">◷</span><div><h3>${t("shaken")}</h3><p>${t("due42")}</p></div><span class="badge warning">42 days</span></article>
      <article class="card card-row"><span class="icon">⌁</span><div><h3>${t("oil")}</h3><p>${t("quoteReady")}</p></div><span class="badge ready">${t("quote")}</span></article>
      <article class="card card-row"><span class="icon">◇</span><div><h3>${t("insurance")}</h3><p>${t("due88")}</p></div><span class="badge neutral">88 days</span></article>
    </div>
    <div class="section-head"><h2>${t("quickActions")}</h2></div>
    <div class="quick-grid">
      <a class="card quick-card" href="#book"><span class="icon">＋</span><h3>${t("bookService")}</h3></a>
      <a class="card quick-card" href="#book?storage"><span class="icon">⌂</span><h3>${t("findStorage")}</h3></a>
      <a class="card quick-card" href="#vehicle"><span class="icon">▤</span><h3>${t("addRecord")}</h3></a>
    </div>
  </section>`;
}

function vehicle() {
  return `<section class="page">
    ${pageHeader(t("demoData"), t("myCar"), t("vehicleDetails"))}
    <article class="hero-card"><p class="car-name">${escapeHtml(state.vehicle.name)}</p><p class="plate">${escapeHtml(state.vehicle.plate)}</p></article>
    <form id="vehicleForm" class="form-card">
      <div class="field"><label for="carName">${t("name")}</label><input id="carName" name="name" value="${escapeHtml(state.vehicle.name)}" required></div>
      <div class="choice-grid">
        <div class="field"><label for="year">${t("year")}</label><input id="year" name="year" inputmode="numeric" value="${escapeHtml(state.vehicle.year)}"></div>
        <div class="field"><label for="mileage">${t("mileage")} (km)</label><input id="mileage" name="mileage" inputmode="numeric" value="${escapeHtml(state.vehicle.mileage)}"></div>
      </div>
      <div class="field"><label for="plate">${t("plate")}</label><input id="plate" name="plate" value="${escapeHtml(state.vehicle.plate)}"></div>
      <button class="button block" type="submit">${t("save")}</button>
    </form>
    <div class="section-head"><h2>${t("serviceSchedule")}</h2></div>
    <div class="card-list"><article class="card card-row"><span class="icon">◷</span><div><h3>${t("shaken")}</h3><p>2026-11-23</p></div><span class="badge warning">42 days</span></article><article class="card card-row"><span class="icon">⌁</span><div><h3>${t("serviceOil")}</h3><p>25,000 km</p></div><span class="badge ready">320 km</span></article></div>
  </section>`;
}

function book() {
  const storageSelected = location.hash.includes("storage");
  return `<section class="page">
    ${pageHeader(t("demoData"), t("requestService"), t("chooseJourney"))}
    <form id="bookingForm" class="form-card">
      <span class="fieldset-label">${t("chooseJourney")}</span>
      <div class="choice-grid">
        <div class="choice"><input id="existing" name="journey" type="radio" value="existing" ${storageSelected ? "" : "checked"}><label for="existing"><strong>${t("haveParking")}</strong><small>${t("haveParkingDesc")}</small></label></div>
        <div class="choice"><input id="storage" name="journey" type="radio" value="storage" ${storageSelected ? "checked" : ""}><label for="storage"><strong>${t("needStorage")}</strong><small>${t("needStorageDesc")}</small></label></div>
      </div>
      <div class="field"><label for="service">${t("serviceType")}</label><select id="service" name="service"><option value="serviceOil">${t("serviceOil")}</option><option value="serviceShaken">${t("serviceShaken")}</option><option value="serviceTyre">${t("serviceTyre")}</option><option value="serviceWash">${t("serviceWash")}</option><option value="serviceStorage">${t("serviceStorage")}</option></select></div>
      <div class="field"><label for="date">${t("preferredDate")}</label><input id="date" name="date" type="date" min="${new Date().toISOString().slice(0,10)}" required></div>
      <div class="field"><label for="location">${t("location")}</label><input id="location" name="location" placeholder="Edogawa, Tokyo" required></div>
      <div class="field"><label for="note">${t("note")}</label><textarea id="note" name="note"></textarea></div>
      <p class="notice">${t("approvalNote")}</p>
      <button class="button block" type="submit">${t("sendRequest")}</button>
    </form>
  </section>`;
}

function activity() {
  const active = state.requests.map(r => `<article class="card"><div class="card-row"><span class="icon">${r.service === "serviceStorage" ? "⌂" : "⌁"}</span><div><h3>${t(r.service)}</h3><p>${escapeHtml(r.date)} ${r.slot ? `· ${escapeHtml(r.slot)}` : ""}</p><p>${escapeHtml(r.partner || r.location)}</p></div><span class="badge ${r.status === "approved" ? "ready" : "warning"}">${r.status === "approved" ? t("approved") : r.price ? t("quote") : t("statusRequested")}</span></div><div class="progress-steps"><span class="progress-step done">${t("requested")}</span><span class="progress-step ${r.price ? "active" : ""}">${t("preparing")}</span><span class="progress-step ${r.status === "approved" ? "active" : ""}">${t("confirmed")}</span><span class="progress-step">${t("completed")}</span></div>${r.price ? `<div class="quote-summary"><div><small>${t("quote")} · ${t("taxIncluded")}</small><strong>${formatYen(r.price)}</strong></div><button class="button quote-button" data-id="${r.id}">${r.status === "quote" ? t("viewQuote") : t("approved")}</button></div>` : ""}</article>`).join("");
  return `<section class="page">
    ${pageHeader(t("demoData"), t("activity"), t("vehicleDetails"))}
    <div class="section-head"><h2>${t("currentRequest")}</h2></div>
    <div class="card-list">${active || `<div class="empty"><span class="icon">✓</span>${t("noRequests")}</div>`}</div>
    <div class="section-head"><h2>${t("history")}</h2></div>
    <div class="timeline">
      <article class="timeline-item"><span class="timeline-dot">✓</span><div class="timeline-content"><h3>${t("serviceTyre")}</h3><p>2026-04-12 · ¥12,400 · Tokyo Tyre Partner</p></div></article>
      <article class="timeline-item"><span class="timeline-dot">✓</span><div class="timeline-content"><h3>${t("serviceOil")}</h3><p>2025-12-02 · ¥7,800 · Local Service Partner</p></div></article>
    </div>
  </section>`;
}

function escapeHtml(value = "") { return String(value).replace(/[&<>'"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[c])); }
function toast(message) { const el = document.querySelector("#toast"); el.textContent = message; el.classList.add("show"); setTimeout(() => el.classList.remove("show"), 3200); }
function currentRoute() { return (location.hash.slice(1).split("?")[0] || "dashboard"); }

function render() {
  const route = currentRoute();
  const pages = { dashboard, vehicle, book, activity };
  document.documentElement.lang = state.lang;
  document.querySelector("#languageButton").textContent = state.lang === "ja" ? "English" : "日本語";
  document.querySelector("#app").innerHTML = (pages[route] || dashboard)();
  document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = t(el.dataset.i18n));
  document.querySelectorAll("[data-nav]").forEach(el => el.classList.toggle("active", el.dataset.nav === route));
  bindEvents();
  window.scrollTo(0, 0);
}

function bindEvents() {
  document.querySelector("#vehicleForm")?.addEventListener("submit", event => {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    state.vehicle = { ...state.vehicle, name: data.get("name"), year: data.get("year"), mileage: data.get("mileage"), plate: data.get("plate") };
    saveState(); toast(t("saved")); render();
  });
  document.querySelector("#bookingForm")?.addEventListener("submit", event => {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    state.requests.unshift({ id: Date.now(), journey: data.get("journey"), service: data.get("journey") === "storage" ? "serviceStorage" : data.get("service"), date: data.get("date"), location: data.get("location"), note: data.get("note"), status: "requested", price: null });
    saveState(); toast(t("requestSent")); location.hash = "activity";
  });
  document.querySelectorAll(".quote-button").forEach(button => button.addEventListener("click", () => openQuote(Number(button.dataset.id))));
}

function openQuote(id) {
  const request = state.requests.find(r => r.id === id); if (!request) return;
  const dialog = document.querySelector("#quoteDialog");
  const items = request.items || [{ nameJa: "サービス料金", nameEn: "Service charge", price: request.price }];
  dialog.innerHTML = `<div class="dialog-head"><div><small>${t("quote")}</small><h2>${t(request.service)}</h2></div><button id="closeDialog" aria-label="Close">×</button></div><div class="dialog-body"><div class="partner-box"><strong>${escapeHtml(request.partner || "CarMori Partner")}</strong><span>${escapeHtml(request.date)} · ${escapeHtml(request.slot || request.location)}</span></div><div>${items.map(item => `<div class="line-item"><span>${escapeHtml(state.lang === "ja" ? item.nameJa : item.nameEn)}</span><b>${formatYen(item.price)}</b></div>`).join("")}</div><div class="line-total"><span>${state.lang === "ja" ? "合計（税込）" : "Total (tax included)"}</span><span>${formatYen(request.price)}</span></div><p class="notice">${t("approvalNote")}</p><div class="dialog-actions"><button class="button outline" id="cancelQuote">${state.lang === "ja" ? "閉じる" : "Close"}</button>${request.status === "quote" ? `<button class="button" id="confirmQuote">${t("approve")}</button>` : `<button class="button" disabled>${t("approved")}</button>`}</div></div>`;
  dialog.showModal();
  dialog.querySelector("#closeDialog").onclick = () => dialog.close();
  dialog.querySelector("#cancelQuote").onclick = () => dialog.close();
  dialog.querySelector("#confirmQuote")?.addEventListener("click", () => { request.status = "approved"; saveState(); dialog.close(); toast(t("quoteApproved")); render(); });
}

document.querySelector("#notificationButton").addEventListener("click", () => { location.hash = "activity"; toast(state.lang === "ja" ? "承認待ちのお見積もりが1件あります。" : "You have one quote waiting for approval."); });
document.querySelector("#languageButton").addEventListener("click", () => { state.lang = state.lang === "ja" ? "en" : "ja"; saveState(); render(); });
window.addEventListener("hashchange", render);
render();
