// admin.js

const defaultMenus = [
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

function getMenus() {
  let menus = localStorage.getItem('basoria_menus');
  if (!menus) {
    localStorage.setItem('basoria_menus', JSON.stringify(defaultMenus));
    return defaultMenus;
  }
  return JSON.parse(menus);
}

function saveMenus(menus) {
  localStorage.setItem('basoria_menus', JSON.stringify(menus));
}

function renderTable() {
  const menus = getMenus();
  const tbody = document.getElementById('menu-table-body');
  tbody.innerHTML = '';

  menus.forEach(menu => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${menu.img ? `<img src="${menu.img}" alt="${menu.name}">` : '-'}</td>
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
  if(confirm("Apakah Anda yakin ingin menghapus menu ini?")) {
    let menus = getMenus();
    menus = menus.filter(m => m.id !== id);
    saveMenus(menus);
    renderTable();
  }
}

document.getElementById('menuForm').addEventListener('submit', function(e) {
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
