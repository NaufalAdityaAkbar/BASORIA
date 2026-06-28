// admin.js

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

const defaultMenus = [
  { id: 1, name: "Bakso Tetelan", price: 20000, desc: "Bakso dengan tambahan tetelan daging sapi empuk dan gurih dalam kuah kaldu spesial.", img: "public/tetelan.jpeg", badge: "", category: "bakso" },
  { id: 2, name: "Bakso Beranak", price: 30000, desc: "Bakso besar berisi bakso-bakso kecil di dalamnya. Dua kali nikmat dalam satu suapan.", img: "public/bakso_beranak.jpeg", badge: "POPULER", category: "bakso" },
  { id: 3, name: "Bakso Mercon 🌶️", price: 20000, desc: "Sensasi pedas meledak dari dalam. Cocok untuk pecinta makanan pedas sejati.", img: "public/rawit.jpeg", badge: "PEDAS", category: "bakso" },
  { id: 4, name: "Bakso Keju Lumer 🧀", price: 22000, desc: "Bakso dengan kejutan keju meleleh di dalamnya. Unik, creamy, dan memanjakan lidah.", img: "public/lumer.jpeg", badge: "", category: "bakso" },
  { id: 5, name: "Bakso Urat", price: 20000, desc: "Bakso dengan tekstur kenyal dari serat urat daging sapi pilihan. Gurih dan memuaskan.", img: "public/kikilan.jpeg", badge: "", category: "bakso" },
  { id: 6, name: "Bakso Telor", price: 18000, desc: "Bakso klasik dengan telur rebus di dalamnya. Sederhana namun selalu lezat.", img: "public/telor.jpeg", badge: "", category: "bakso" },
  { id: 7, name: "Bakso Iga", price: 30000, desc: "Bakso premium dengan campuran daging iga sapi pilihan. Kuah kaldu yang kaya dan dalam.", img: "public/tulang.jpeg", badge: "PREMIUM", category: "bakso" },
  { id: 8, name: "Bakso Original", price: 15000, desc: "Bakso klasik tanpa tambahan. Kenyal, gurih, dan selalu pas untuk semua selera.", img: "public/original.jpeg", badge: "", category: "bakso" },
  { id: 9, name: "Pilus Cikur", price: 3000, desc: "", img: "public/piluscikur.jpeg", badge: "", category: "topping" },
  { id: 11, name: "Kerupuk Lidah", price: 3000, desc: "", img: "public/lidah.jpeg", badge: "", category: "topping" },
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
    "img/bakso-beranak.jpg": "public/bakso_beranak.jpeg",
    "img/bakso-mercon.jpg": "public/rawit.jpeg",
    "img/bakso-keju.jpg": "public/lumer.jpeg",
    "img/bakso-urat.jpg": "public/kikilan.jpeg",
    "img/bakso-telor.jpg": "public/telor.jpeg",
    "img/bakso-iga.jpg": "public/tulang.jpeg",
    "img/bakso-original.jpg": "public/daging.jpeg",

    // Map old Unsplash URLs to local images for smooth migration
    "https://images.unsplash.com/photo-1590483736622-39fa9a8fae85?q=80&w=400&auto=format&fit=crop": "public/tetelan.jpeg",
    "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=400&auto=format&fit=crop": "public/bakso_beranak.jpeg",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=400&auto=format&fit=crop": "public/rawit.jpeg",
    "https://images.unsplash.com/photo-1625944230945-1b7dd12a80f1?q=80&w=400&auto=format&fit=crop": "public/lumer.jpeg",
    "https://images.unsplash.com/photo-1548811462-86ee2b3eeb0c?q=80&w=400&auto=format&fit=crop": "public/kikilan.jpeg",
    "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=400&auto=format&fit=crop": "public/telor.jpeg",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400&auto=format&fit=crop": "public/tulang.jpeg",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&auto=format&fit=crop": "public/original.jpeg"
  };

  let changed = false;

  // Merge "Pilus" and "Cikur" if they are present as separate items
  const hasPilusOrCikur = menus.some(m => m.name === "Pilus" || m.name === "Cikur");
  if (hasPilusOrCikur) {
    menus = menus.filter(m => m.name !== "Pilus" && m.name !== "Cikur" && m.id !== 9 && m.id !== 10);
    menus.push({ id: 9, name: "Pilus Cikur", price: 3000, desc: "", img: "public/piluscikur.jpeg", badge: "", category: "topping" });
    menus.sort((a, b) => a.id - b.id);
    changed = true;
  }

  const updated = menus.map(m => {
    if (m.img && map[m.img]) {
      changed = true;
      return { ...m, img: map[m.img] };
    }
    if (m.img && (m.img.startsWith("img/bakso-") || m.img.startsWith("https://images.unsplash.com"))) {
      changed = true;
      const nameLower = (m.name || "").toLowerCase();
      if (nameLower.includes("tetelan")) return { ...m, img: "public/tetelan.jpeg" };
      if (nameLower.includes("beranak")) return { ...m, img: "public/bakso_beranak.jpeg" };
      if (nameLower.includes("mercon") || nameLower.includes("rawit")) return { ...m, img: "public/rawit.jpeg" };
      if (nameLower.includes("keju") || nameLower.includes("lumer")) return { ...m, img: "public/lumer.jpeg" };
      if (nameLower.includes("urat") || nameLower.includes("kikil")) return { ...m, img: "public/kikilan.jpeg" };
      if (nameLower.includes("telor") || nameLower.includes("telur")) return { ...m, img: "public/telor.jpeg" };
      if (nameLower.includes("iga") || nameLower.includes("tulang")) return { ...m, img: "public/tulang.jpeg" };
      if (nameLower.includes("original") || nameLower.includes("biasa") || nameLower.includes("daging")) return { ...m, img: "public/original.jpeg" };
      return { ...m, img: "public/original.jpeg" };
    }
    return m;
  });

  if (changed) {
    safeSetItem('basoria_menus', JSON.stringify(updated));
  }
  return updated;
}

function getMenus() {
  let menus = safeGetItem('basoria_menus');
  if (!menus) {
    safeSetItem('basoria_menus', JSON.stringify(defaultMenus));
    return defaultMenus;
  }
  try {
    const parsed = JSON.parse(menus);
    return migrateMenuData(parsed);
  } catch (err) {
    return defaultMenus;
  }
}

function saveMenus(menus) {
  safeSetItem('basoria_menus', JSON.stringify(menus));
}

function renderTable() {
  const menus = getMenus();
  const tbody = document.getElementById('menu-table-body');
  tbody.innerHTML = '';

  menus.forEach(menu => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${menu.img ? `<img src="${resolvePath(menu.img)}" alt="${menu.name}">` : '-'}</td>
      <td><strong>${menu.name}</strong></td>
      <td>Rp ${menu.price.toLocaleString('id-ID')}</td>
      <td><span style="text-transform:uppercase;font-size:0.6rem;">${menu.category}</span></td>
      <td>${menu.badge || '-'}</td>
      <td>
        <button class="action-btn btn-edit" onclick="editMenu(${menu.id})">EDIT</button>
        <button class="action-btn btn-delete" onclick="deleteMenu(${menu.id})">HAPUS</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function openModal() {
  document.getElementById('menuForm').reset();
  document.getElementById('menuId').value = '';
  document.getElementById('modalTitle').innerText = 'Tambah Menu';
  document.getElementById('menuModal').classList.add('active');
}

function closeModal() {
  document.getElementById('menuModal').classList.remove('active');
}

function editMenu(id) {
  const menus = getMenus();
  const menu = menus.find(m => m.id === id);
  if (menu) {
    document.getElementById('menuId').value = menu.id;
    document.getElementById('menuName').value = menu.name;
    document.getElementById('menuPrice').value = menu.price;
    document.getElementById('menuDesc').value = menu.desc;
    document.getElementById('menuCategory').value = menu.category;
    document.getElementById('menuImg').value = menu.img;
    document.getElementById('menuBadge').value = menu.badge;
    document.getElementById('modalTitle').innerText = 'Edit Menu';
    document.getElementById('menuModal').classList.add('active');
  }
}

function deleteMenu(id) {
  if (confirm("Apakah Anda yakin ingin menghapus menu ini?")) {
    let menus = getMenus();
    menus = menus.filter(m => m.id !== id);
    saveMenus(menus);
    renderTable();
  }
}

document.getElementById('menuForm').addEventListener('submit', function (e) {
  e.preventDefault();
  let menus = getMenus();
  const id = document.getElementById('menuId').value;

  const menuData = {
    name: document.getElementById('menuName').value,
    price: parseInt(document.getElementById('menuPrice').value),
    desc: document.getElementById('menuDesc').value,
    category: document.getElementById('menuCategory').value,
    img: document.getElementById('menuImg').value,
    badge: document.getElementById('menuBadge').value
  };

  if (id) {
    // Edit
    const index = menus.findIndex(m => m.id == id);
    menus[index] = { ...menus[index], ...menuData };
  } else {
    // Add
    menuData.id = Date.now(); // unique ID
    menus.push(menuData);
  }

  saveMenus(menus);
  closeModal();
  renderTable();
});

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderTable();
});
