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
  if (el && href) el.href = href;
  if (el && !href) el.style.display = "none";
}

function applyConfig() {
  const cfg = window.SITE_CONFIG;
  if (!cfg) return;

  // Title + basic SEO
  document.title = `${cfg.name} • ${cfg.cityLine}`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", cfg.seo?.description || "");

  // Header / footer
  setText("siteName", cfg.name);
  setText("siteTagline", cfg.tagline);
  setText("footerName", cfg.name);

  // Common contact info
  setText("phoneDisplay", cfg.phoneDisplay);
  setHref("phoneLink", `tel:${cfg.phoneTel}`);

  setText("addr1", cfg.addressLine1);
  setText("addr2", cfg.addressLine2);
  setHref("mapsLink", cfg.googleMapsUrl);

  // Hours list
  const hoursEl = document.getElementById("hoursList");
  if (hoursEl && Array.isArray(cfg.hours)) {
    hoursEl.innerHTML = cfg.hours
      .map(h => `<li><span style="color:var(--text); font-weight:750">${h.days}</span><span style="margin-left:auto; color:var(--muted)">${h.hours}</span></li>`)
      .join("");
  }

  // Highlights
  const hiEl = document.getElementById("highlightsList");
  if (hiEl && Array.isArray(cfg.highlights)) {
    hiEl.innerHTML = cfg.highlights
      .map((t, i) => `<li><span class="badge">${i+1}</span><div>${t}</div></li>`)
      .join("");
  }

  // Social links (hide if blank)
  setHref("facebookLink", cfg.social?.facebook);
  setHref("instagramLink", cfg.social?.instagram);

  // Set active nav link
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("nav a[data-page], .mobile-nav a[data-page]").forEach(a => {
    if ((a.getAttribute("data-page") || "").toLowerCase() === path) a.classList.add("active");
  });
}

document.addEventListener("DOMContentLoaded", applyConfig);
