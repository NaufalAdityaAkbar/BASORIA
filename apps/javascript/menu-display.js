// menu-display.js

// Dynamic path resolver to support both root index.html and sub-folder apps/ pages
function resolvePath(path) {
  const isSubPage = window.location.pathname.includes('/apps/');
  
  if (path && (path.startsWith('public/') || path.startsWith('https://images.unsplash.com'))) {
    return (isSubPage ? '../' : '') + path;
  }
  
  if (path && path.endsWith('.html')) {
    if (path === 'index.html') {
      return isSubPage ? '../index.html' : 'index.html';
    }
    return isSubPage ? path : 'apps/' + path;
  }
  
  return path;
}

const defaultMenusData = [
  { id: 1, name: "Bakso Tetelan", price: 20000, desc: "Bakso dengan tambahan tetelan daging sapi empuk dan gurih dalam kuah kaldu spesial.", img: "public/tetelan.jpeg", badge: "", category: "bakso" },
  { id: 2, name: "Bakso Beranak", price: 30000, desc: "Bakso besar berisi bakso-bakso kecil di dalamnya. Dua kali nikmat dalam satu suapan.", img: "public/beranak.jpeg", badge: "POPULER", category: "bakso" },
  { id: 3, name: "Bakso Mercon 🌶️", price: 20000, desc: "Sensasi pedas meledak dari dalam. Cocok untuk pecinta makanan pedas sejati.", img: "public/rawit.jpeg", badge: "PEDAS", category: "bakso" },
  { id: 4, name: "Bakso Keju Lumer 🧀", price: 22000, desc: "Bakso dengan kejutan keju meleleh di dalamnya. Unik, creamy, dan memanjakan lidah.", img: "public/lumer.jpeg", badge: "", category: "bakso" },
  { id: 5, name: "Bakso Urat", price: 20000, desc: "Bakso dengan tekstur kenyal dari serat urat daging sapi pilihan. Gurih dan memuaskan.", img: "public/kikilan.jpeg", badge: "", category: "bakso" },
  { id: 6, name: "Bakso Telor", price: 18000, desc: "Bakso klasik dengan telur rebus di dalamnya. Sederhana namun selalu lezat.", img: "public/telor.jpeg", badge: "", category: "bakso" },
  { id: 7, name: "Bakso Iga", price: 30000, desc: "Bakso premium dengan campuran daging iga sapi pilihan. Kuah kaldu yang kaya dan dalam.", img: "public/tulang.jpeg", badge: "PREMIUM", category: "bakso" },
  { id: 8, name: "Bakso Original", price: 15000, desc: "Bakso klasik tanpa tambahan. Kenyal, gurih, dan selalu pas untuk semua selera.", img: "public/daging.jpeg", badge: "", category: "bakso" },
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

// Safe localStorage wrapper to prevent crashes under file:// protocol
let inMemoryStorage = {};

function safeGetItem(key) {
  try {
    return localStorage.getItem(key) || inMemoryStorage[key] || null;
  } catch (e) {
    console.warn("Storage read blocked, using in-memory fallback:", e);
    return inMemoryStorage[key] || null;
  }
}

function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.warn("Storage write blocked, using in-memory fallback:", e);
    inMemoryStorage[key] = value;
    return true;
  }
}

function migrateMenuData(menus) {
  const map = {
    "img/bakso-tetelan.jpg": "public/tetelan.jpeg",
    "img/bakso-beranak.jpg": "public/beranak.jpeg",
    "img/bakso-mercon.jpg": "public/rawit.jpeg",
    "img/bakso-keju.jpg": "public/lumer.jpeg",
    "img/bakso-urat.jpg": "public/kikilan.jpeg",
    "img/bakso-telor.jpg": "public/telor.jpeg",
    "img/bakso-iga.jpg": "public/tulang.jpeg",
    "img/bakso-original.jpg": "public/daging.jpeg",

    // Map old Unsplash URLs to local images for smooth migration
    "https://images.unsplash.com/photo-1590483736622-39fa9a8fae85?q=80&w=400&auto=format&fit=crop": "public/tetelan.jpeg",
    "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=400&auto=format&fit=crop": "public/beranak.jpeg",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=400&auto=format&fit=crop": "public/rawit.jpeg",
    "https://images.unsplash.com/photo-1625944230945-1b7dd12a80f1?q=80&w=400&auto=format&fit=crop": "public/lumer.jpeg",
    "https://images.unsplash.com/photo-1548811462-86ee2b3eeb0c?q=80&w=400&auto=format&fit=crop": "public/kikilan.jpeg",
    "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=400&auto=format&fit=crop": "public/telor.jpeg",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400&auto=format&fit=crop": "public/tulang.jpeg",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&auto=format&fit=crop": "public/daging.jpeg"
  };

  let changed = false;
  const updated = menus.map(m => {
    if (m.img && map[m.img]) {
      changed = true;
      return { ...m, img: map[m.img] };
    }
    if (m.img && (m.img.startsWith("img/bakso-") || m.img.startsWith("https://images.unsplash.com"))) {
      changed = true;
      const nameLower = (m.name || "").toLowerCase();
      if (nameLower.includes("tetelan")) return { ...m, img: "public/tetelan.jpeg" };
      if (nameLower.includes("beranak")) return { ...m, img: "public/beranak.jpeg" };
      if (nameLower.includes("mercon") || nameLower.includes("rawit")) return { ...m, img: "public/rawit.jpeg" };
      if (nameLower.includes("keju") || nameLower.includes("lumer")) return { ...m, img: "public/lumer.jpeg" };
      if (nameLower.includes("urat") || nameLower.includes("kikil")) return { ...m, img: "public/kikilan.jpeg" };
      if (nameLower.includes("telor") || nameLower.includes("telur")) return { ...m, img: "public/telor.jpeg" };
      if (nameLower.includes("iga") || nameLower.includes("tulang")) return { ...m, img: "public/tulang.jpeg" };
      if (nameLower.includes("original") || nameLower.includes("biasa") || nameLower.includes("daging")) return { ...m, img: "public/daging.jpeg" };
      return { ...m, img: "public/daging.jpeg" };
    }
    return m;
  });

  if (changed) {
    safeSetItem('basoria_menus', JSON.stringify(updated));
  }
  return updated;
}

function getMenuData() {
  let menus = safeGetItem('basoria_menus');
  if (!menus) {
    safeSetItem('basoria_menus', JSON.stringify(defaultMenusData));
    return defaultMenusData;
  }
  try {
    const parsed = JSON.parse(menus);
    return migrateMenuData(parsed);
  } catch (err) {
    return defaultMenusData;
  }
}

function getBadgeHtml(badge) {
  if (!badge) return '';
  const b = badge.toUpperCase();
  let bClass = 'badge-gold';
  if (b.includes('PEDAS')) bClass = 'badge-red';
  if (b.includes('PREMIUM')) bClass = 'badge-navy';
  return `<span class="badge ${bClass}">${b}</span>`;
}

// Dynamic robust online image fallback resolver
function getOnlineImageFallback(item) {
  if (item.img && (item.img.startsWith('public/') || item.img.startsWith('http://') || item.img.startsWith('https://'))) {
    return item.img;
  }
  
  const name = (item.name || '').toLowerCase();
  
  // Bakso Varian
  if (name.includes('tetelan')) {
    return 'public/tetelan.jpeg';
  }
  if (name.includes('beranak')) {
    return 'public/beranak.jpeg';
  }
  if (name.includes('mercon') || name.includes('rawit')) {
    return 'public/rawit.jpeg';
  }
  if (name.includes('keju') || name.includes('lumer')) {
    return 'public/lumer.jpeg';
  }
  if (name.includes('urat') || name.includes('kikil')) {
    return 'public/kikilan.jpeg';
  }
  if (name.includes('telor') || name.includes('telur')) {
    return 'public/telor.jpeg';
  }
  if (name.includes('iga') || name.includes('tulang')) {
    return 'public/tulang.jpeg';
  }
  if (name.includes('original') || name.includes('biasa') || name.includes('polos') || name.includes('daging')) {
    return 'public/daging.jpeg';
  }
  if (item.category === 'bakso') {
    return 'public/daging.jpeg';
  }

  // Topping & Pelengkap
  if (name.includes('teh')) {
    return 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=400&auto=format&fit=crop';
  }
  if (name.includes('jeruk')) {
    return 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=400&auto=format&fit=crop';
  }
  if (name.includes('kelapa')) {
    return 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=400&auto=format&fit=crop';
  }
  if (name.includes('alpukat')) {
    return 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=400&auto=format&fit=crop';
  }
  if (name.includes('coca') || name.includes('cola') || name.includes('soda')) {
    return 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=400&auto=format&fit=crop';
  }
  if (name.includes('mineral') || name.includes('air')) {
    return 'https://images.unsplash.com/photo-1608885898957-a599fb1b4661?q=80&w=400&auto=format&fit=crop';
  }

  return 'public/daging.jpeg';
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
            <img src="${resolvePath(getOnlineImageFallback(b))}" alt="${b.name}">
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
              <a href="${resolvePath('kontak.html')}" class="mfc-btn">Pesan</a>
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
    // Tampilkan gabungan bakso & minuman dll
    // Filter hanya yang memiliki gambar atau bisa diselesaikan lewat fallback
    const previewMenus = menus.slice(0, 10);
    
    let html = '';
    previewMenus.forEach((m, index) => {
      let delayClass = `delay-${(index % 3) * 100}`;
      html += `
        <div class="menu-card-preview fade-up ${delayClass}">
          <div class="menu-card-preview-img">
            <img src="${resolvePath(getOnlineImageFallback(m))}" alt="${m.name}">
          </div>
          <div class="menu-card-preview-body">
            <div class="menu-card-preview-name">${m.name}</div>
            
            <div class="mcp-stars">
               <span style="color:var(--gold); font-size:0.85rem;">★★★★★</span> <span style="font-size:0.6rem; color:var(--text-muted);">(12 Ulasan)</span>
            </div>
            
            <div class="mcp-price">Rp ${m.price.toLocaleString('id-ID')}</div>
            
            <div class="mcp-footer">
               <span class="mcp-time">Siap 10 Menit</span>
               <a href="${resolvePath('menu.html')}" class="mcp-btn">Pesan</a>
            </div>
          </div>
        </div>
      `;
    });
    previewContainer.innerHTML = html;

    // --- PREMIUM INTERACTIVITY: Drag-to-Scroll & Mouse-Wheel & Mobile Touch Scroll ---
    let isDown = false;
    let isDragging = false;
    let startX;
    let scrollLeft;

    // Set initial cursor state
    previewContainer.style.cursor = 'grab';

    // Touch events for ultra-smooth mobile swipe and snap behavior
    previewContainer.addEventListener('touchstart', () => {
      // Temporarily disable scroll snap for smooth free scrolling tracking finger
      previewContainer.style.scrollSnapType = 'none';
      previewContainer.style.scrollBehavior = 'auto';
    }, { passive: true });

    previewContainer.addEventListener('touchend', () => {
      // Restore scroll snap to beautifully snap to nearest card when user lifts finger
      previewContainer.style.scrollSnapType = 'x mandatory';
      previewContainer.style.scrollBehavior = 'smooth';
    }, { passive: true });

    // Mouse drag support
    previewContainer.addEventListener('mousedown', (e) => {
      isDown = true;
      isDragging = false;
      
      // Temporarily disable snapping and smooth scroll during dragging for a highly responsive feel
      previewContainer.style.scrollSnapType = 'none';
      previewContainer.style.scrollBehavior = 'auto';
      previewContainer.style.cursor = 'grabbing';
      
      startX = e.pageX - previewContainer.offsetLeft;
      scrollLeft = previewContainer.scrollLeft;
    });

    previewContainer.addEventListener('mouseleave', () => {
      if (isDown) {
        isDown = false;
        previewContainer.style.cursor = 'grab';
        previewContainer.style.scrollSnapType = 'x mandatory';
        previewContainer.style.scrollBehavior = 'smooth';
      }
    });

    previewContainer.addEventListener('mouseup', () => {
      isDown = false;
      previewContainer.style.cursor = 'grab';
      
      // Re-enable horizontal snap and smooth scrolling on release
      previewContainer.style.scrollSnapType = 'x mandatory';
      previewContainer.style.scrollBehavior = 'smooth';
    });

    previewContainer.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      
      const x = e.pageX - previewContainer.offsetLeft;
      const walk = (x - startX) * 1.6; // Scroll speed multiplier
      
      if (Math.abs(x - startX) > 5) {
        isDragging = true;
      }
      
      previewContainer.scrollLeft = scrollLeft - walk;
    });

    // Prevent links inside card from firing click events if the user is dragging
    previewContainer.addEventListener('click', (e) => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);

    // Mouse Wheel Scroll translation (vertical wheel to horizontal scroll)
    previewContainer.addEventListener('wheel', (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        previewContainer.scrollLeft += e.deltaY * 0.9;
      }
    }, { passive: false });
  }
});

