// menu.js (updated)
async function loadMenu() {
  const container = document.getElementById("menuContainer");
  if (!container) return;

  try {
    const res = await fetch("./menu.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`Menu JSON fetch failed: ${res.status}`);
    const data = await res.json();

    const html = (data.categories || []).map(cat => {
      const itemsHtml = (cat.items || []).map(item => {
        const price = item.price ? `<div class="price">${item.price}</div>` : "";
        const meta = item.description ? `<div class="meta">${item.description}</div>` : "";
        return `
          <div class="menu-item">
            <div>
              <b>${item.name}</b>
              ${meta}
            </div>
            ${price}
          </div>
        `;
      }).join("");

      return `
        <section class="card menu-category">
          <h2>${cat.name}</h2>
          ${cat.note ? `<p>${cat.note}</p>` : ""}
          <div class="menu-items">${itemsHtml}</div>
        </section>
      `;
    }).join("");

    container.innerHTML = html;
  } catch (err) {
    console.error(err);
    container.innerHTML = `
      <div class="card" style="padding:18px">
        <h2>Menu Loading Error</h2>
        <p>Check console for details. Ensure menu.json is in the root and accessible.</p>
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", loadMenu);
