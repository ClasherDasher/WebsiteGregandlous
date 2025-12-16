
async function loadMenu() {
  const container = document.getElementById("menuContainer");
  if (!container) return;

  try {
    const res = await fetch("./menu.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Menu JSON not found");
    const data = await res.json();

    container.innerHTML = (data.categories || []).map(cat => {
      const items = (cat.items || []).map(item => {
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
          <div class="menu-items">${items}</div>
        </section>
      `;
    }).join("");

  } catch (err) {
    container.innerHTML = `
      <div class="card" style="padding:18px">
        <h2>Menu not loading yet</h2>
        <p>Make sure <code>menu.json</code> exists in your repo root, and you’re viewing via GitHub Pages (or a local server).</p>
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", loadMenu);
