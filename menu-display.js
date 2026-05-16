// menu-display.js

const defaultMenusData = [
  { id: 1, name: "Bakso Tetelan", price: 20000, desc: "Bakso dengan tambahan tetelan daging sapi empuk dan gurih dalam kuah kaldu spesial.", img: "https://images.unsplash.com/photo-1590483736622-39fa9a8fae85?q=80&w=400&auto=format&fit=crop", badge: "", category: "bakso" },
  { id: 2, name: "Bakso Beranak", price: 30000, desc: "Bakso besar berisi bakso-bakso kecil di dalamnya. Dua kali nikmat dalam satu suapan.", img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=400&auto=format&fit=crop", badge: "POPULER", category: "bakso" },
  { id: 3, name: "Bakso Mercon 🌶️", price: 20000, desc: "Sensasi pedas meledak dari dalam. Cocok untuk pecinta makanan pedas sejati.", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=400&auto=format&fit=crop", badge: "PEDAS", category: "bakso" },
  { id: 4, name: "Bakso Keju Lumer 🧀", price: 22000, desc: "Bakso dengan kejutan keju meleleh di dalamnya. Unik, creamy, dan memanjakan lidah.", img: "https://images.unsplash.com/photo-1625944230945-1b7dd12a80f1?q=80&w=400&auto=format&fit=crop", badge: "", category: "bakso" },
  { id: 5, name: "Bakso Urat", price: 20000, desc: "Bakso dengan tekstur kenyal dari serat urat daging sapi pilihan. Gurih dan memuaskan.", img: "https://images.unsplash.com/photo-1548811462-86ee2b3eeb0c?q=80&w=400&auto=format&fit=crop", badge: "", category: "bakso" },
  { id: 6, name: "Bakso Telor", price: 18000, desc: "Bakso klasik dengan telur rebus di dalamnya. Sederhana namun selalu lezat.", img: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=400&auto=format&fit=crop", badge: "", category: "bakso" },
  { id: 7, name: "Bakso Iga", price: 30000, desc: "Bakso premium dengan campuran daging iga sapi pilihan. Kuah kaldu yang kaya dan dalam.", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400&auto=format&fit=crop", badge: "PREMIUM", category: "bakso" },
  { id: 8, name: "Bakso Original", price: 15000, desc: "Bakso klasik tanpa tambahan. Kenyal, gurih, dan selalu pas untuk semua selera.", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&auto=format&fit=crop", badge: "", category: "bakso" },
  { id: 9, name: "Pilus", price: 2000, desc: "", img: "", badge: "", category: "topping" },
  { id: 10, name: "Cikur", price: 3000, desc: "", img: "", badge: "", category: "topping" },
  { id: 11, name: "Kerupuk Lidah", price: 3000, desc: "", img: "", badge: "", category: "topping" },
  { id: 12, name: "Kerupuk Kulit", price: 5000, desc: "", img: "", badge: "", category: "topping" },
  { id: 13, name: "Es Teh Manis (ice/non)", price: 5000, desc: "", img: "", badge: "", category: "minuman" },
  { id: 14, name: "Lemon Tea", price: 6000, desc: "", img: "", badge: "", category: "minuman" },
  { id: 15, name: "Lecy Tea", price: 6000, desc: "", img: "", badge: "", category: "minuman" },
  { id: 16, name: "Es Jeruk", price: 7000, desc: "", img: "", badge: "", category: "minuman" },
  { id: 17, name: "Fanta Ice", price: 7000, desc: "", img: "", badge: "", category: "minuman" },
  { id: 18, name: "Sprite Ice", price: 7000, desc: "", img: "", badge: "", category: "minuman" },
  { id: 19, name: "Coca-Cola Ice", price: 7000, desc: "", img: "", badge: "", category: "minuman" }
];

function getMenuData() {
  let menus = localStorage.getItem('basoria_menus');
  if (!menus) {
    localStorage.setItem('basoria_menus', JSON.stringify(defaultMenusData));
    return defaultMenusData;
  }
  return JSON.parse(menus);
}

function getBadgeHtml(badge) {
  if (!badge) return '';
  const b = badge.toUpperCase();
  let bClass = 'badge-gold';
  if (b.includes('PEDAS')) bClass = 'badge-red';
  if (b.includes('PREMIUM')) bClass = 'badge-navy';
  return `<span class="badge ${bClass}">${b}</span>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const menus = getMenuData();
  
  const baksoContainer = document.getElementById('dynamic-bakso-container');
  const otherContainer = document.getElementById('dynamic-other-container');

  if (baksoContainer) {
    const baksos = menus.filter(m => m.category === 'bakso');
    let html = '';
    baksos.forEach((b, index) => {
      let delayClass = '';
      if (index % 3 === 1) delayClass = 'delay-100';
      if (index % 3 === 2) delayClass = 'delay-200';

      html += `
        <div class="menu-full-card fade-up ${delayClass}">
          <div class="menu-full-card-img">
            <img src="${b.img || 'img/suasana.jpg'}" alt="${b.name}">
          </div>
          <div class="menu-full-card-body">
            <div class="mfc-top">
              <div class="mfc-name">${b.name}</div>
              <div style="color:var(--gold); font-size:0.8rem; margin-bottom:0.5rem;">★★★★★</div>
              <div class="mfc-price">Rp ${b.price.toLocaleString('id-ID')}</div>
            </div>
            <p class="mfc-desc">${b.desc || '-'}</p>
            
            <div class="mfc-footer">
              <span class="mfc-time">Tersedia</span>
              <a href="kontak.html" class="mfc-btn">Pesan</a>
            </div>
          </div>
        </div>
      `;
    });
    baksoContainer.innerHTML = html;
  }

  if (otherContainer) {
    const toppings = menus.filter(m => m.category === 'topping');
    const minumans = menus.filter(m => m.category === 'minuman');

    let toppingHtml = `
      <div class="fade-up">
        <p class="eyebrow dark">PELENGKAP</p>
        <h2 class="section-heading" style="margin-bottom:2rem;">Topping <em>Favorit</em></h2>
    `;
    toppings.forEach(t => {
      toppingHtml += `
        <div class="menu-list-row fade-up"><span class="menu-list-name">${t.name}</span><span class="menu-list-price">Rp ${t.price.toLocaleString('id-ID')}</span></div>
      `;
    });
    toppingHtml += `</div>`;

    let minumanHtml = `
      <div class="fade-up delay-100">
        <p class="eyebrow dark">MINUMAN</p>
        <h2 class="section-heading" style="margin-bottom:2rem;">Minuman <em>Segar</em></h2>
    `;
    minumans.forEach(m => {
      minumanHtml += `
        <div class="menu-list-row fade-up"><span class="menu-list-name">${m.name}</span><span class="menu-list-price">Rp ${m.price.toLocaleString('id-ID')}</span></div>
      `;
    });
    minumanHtml += `</div>`;

    otherContainer.innerHTML = toppingHtml + minumanHtml;
  }

  // --- Untuk Halaman index.html (Preview Menu) ---
  const previewContainer = document.getElementById('dynamic-preview-container');
  if (previewContainer) {
    // Tampilkan gabungan bakso & minuman dll minimal 10 item (atau semuanya jika kurang dari 10)
    // Filter hanya yang memiliki gambar untuk ditampilkan di preview card
    const itemsWithImg = menus.filter(m => m.img !== '');
    // Tampilkan hingga 10 item (atau fallback ke semua item)
    const previewMenus = itemsWithImg.length > 0 ? itemsWithImg.slice(0, 10) : menus.slice(0, 10);
    
    let html = '';
    previewMenus.forEach((m, index) => {
      let delayClass = `delay-${(index % 3) * 100}`;
      html += `
        <div class="menu-card-preview fade-up ${delayClass}">
          <div class="menu-card-preview-img">
            <img src="${m.img || 'img/suasana.jpg'}" alt="${m.name}">
          </div>
          <div class="menu-card-preview-body">
            <div class="menu-card-preview-name">${m.name}</div>
            
            <div class="mcp-stars">
               <span style="color:var(--gold); font-size:0.85rem;">★★★★★</span> <span style="font-size:0.6rem; color:var(--text-muted);">(12 Ulasan)</span>
            </div>
            
            <div class="mcp-price">Rp ${m.price.toLocaleString('id-ID')}</div>
            
            <div class="mcp-footer">
              <span class="mcp-time">Siap 10 Menit</span>
              <a href="menu.html" class="mcp-btn">Pesan</a>
            </div>
          </div>
        </div>
      `;
    });
    previewContainer.innerHTML = html;
  }
});

