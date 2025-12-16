function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value ?? "";
}

function setHTML(id, value) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = value ?? "";
}

function setHref(id, href) {
  const el = document.getElementById(id);
  if (el) {
    if (href) {
      el.href = href;
      el.style.display = "";
    } else {
      el.style.display = "none";
    }
  }
}

function applyConfig() {
  const cfg = window.SITE_CONFIG;
  if (!cfg) return;

  document.title = `${cfg.name} • ${cfg.cityLine}`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", cfg.seo?.description || "");

  document.querySelectorAll('[id^="siteName"]').forEach(el => setText(el.id, cfg.name));
  document.querySelectorAll('[id^="siteTagline"]').forEach(el => setText(el.id, cfg.tagline));
  document.querySelectorAll('[id^="footerName"]').forEach(el => setText(el.id, cfg.name));

  document.querySelectorAll('[id^="phoneDisplay"]').forEach(el => setText(el.id, cfg.phoneDisplay));
  document.querySelectorAll('[id^="phoneLink"]').forEach(el => setHref(el.id, cfg.phoneTel ? `tel:${cfg.phoneTel}` : null));

  document.querySelectorAll('[id^="addr"]').forEach(el => {
    if (el.id.endsWith("1")) setText(el.id, cfg.addressLine1);
    if (el.id.endsWith("2")) setText(el.id, cfg.addressLine2);
  });
  document.querySelectorAll('[id^="mapsLink"]').forEach(el => setHref(el.id, cfg.googleMapsUrl));

  const hoursEls = document.querySelectorAll('[id^="hoursList"]');
  if (hoursEls.length && Array.isArray(cfg.hours)) {
    const html = cfg.hours
      .map(h => `<li><span style="font-weight:750">${h.days}</span><span style="margin-left:auto">${h.hours}</span></li>`)
      .join("");
    hoursEls.forEach(el => setHTML(el.id, html));
  }

  const hiEls = document.querySelectorAll('[id^="highlightsList"]');
  if (hiEls.length && Array.isArray(cfg.highlights)) {
    const html = cfg.highlights
      .map((t, i) => `<li><span class="badge">${i+1}</span><div>${t}</div></li>`)
      .join("");
    hiEls.forEach(el => setHTML(el.id, html));
  }

  setHref("facebookLink", cfg.social?.facebook);
  setHref("instagramLink", cfg.social?.instagram);

  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("nav a[data-page], .mobile-nav a[data-page]").forEach(a => {
    if ((a.getAttribute("data-page") || "").toLowerCase() === path) a.classList.add("active");
  });
}

document.addEventListener("DOMContentLoaded", applyConfig);
