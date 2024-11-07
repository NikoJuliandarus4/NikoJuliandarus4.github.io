// Array untuk menyimpan stok barang System dan Furniture
let systems = [];
let furnitures = [];

// Memuat data dari LocalStorage saat halaman dimuat
window.onload = function() {
    loadSystems();
    loadFurnitures();
    renderSystemTable();
    renderFurnitureTable();
};

// Fungsi untuk menambahkan stok barang System
function addSystem() {
    const name = document.getElementById("systemName").value;
    const quantity = document.getElementById("systemQuantity").value;

    if (name && quantity) {
        const product = { name, quantity: parseInt(quantity) };
        systems.push(product);
        saveSystems(); // Simpan data ke LocalStorage
        renderSystemTable(); // Render ulang tabel System
        document.getElementById("systemName").value = "";
        document.getElementById("systemQuantity").value = "";
    } else {
        alert("Masukkan nama dan jumlah stok barang System");
    }
}

// Fungsi untuk menambahkan stok barang Furniture
function addFurniture() {
    const name = document.getElementById("furnitureName").value;
    const quantity = document.getElementById("furnitureQuantity").value;

    if (name && quantity) {
        const product = { name, quantity: parseInt(quantity) };
        furnitures.push(product);
        saveFurnitures(); // Simpan data ke LocalStorage
        renderFurnitureTable(); // Render ulang tabel Furniture
        document.getElementById("furnitureName").value = "";
        document.getElementById("furnitureQuantity").value = "";
    } else {
        alert("Masukkan nama dan jumlah stok barang Furniture");
    }
}

// Fungsi untuk menyimpan data System ke LocalStorage
function saveSystems() {
    localStorage.setItem("systems", JSON.stringify(systems));
}

// Fungsi untuk menyimpan data Furniture ke LocalStorage
function saveFurnitures() {
    localStorage.setItem("furnitures", JSON.stringify(furnitures));
}

// Fungsi untuk memuat data System dari LocalStorage
function loadSystems() {
    const storedSystems = localStorage.getItem("systems");
    if (storedSystems) {
        systems = JSON.parse(storedSystems);
    }
}

// Fungsi untuk memuat data Furniture dari LocalStorage
function loadFurnitures() {
    const storedFurnitures = localStorage.getItem("furnitures");
    if (storedFurnitures) {
        furnitures = JSON.parse(storedFurnitures);
    }
}

// Fungsi untuk merender tabel System
function renderSystemTable() {
    const tableBody = document.getElementById("systemTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ""; // Clear existing rows

    systems.forEach((product, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = product.name;
        row.insertCell(1).textContent = product.quantity;
        
        const actionCell = row.insertCell(2);
        actionCell.innerHTML = `
            <button class="edit" onclick="editSystem(${index})">Edit</button>
            <button class="delete" onclick="deleteSystem(${index})">Hapus</button>
        `;
    });
}

// Fungsi untuk merender tabel Furniture
function renderFurnitureTable() {
    const tableBody = document.getElementById("furnitureTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ""; // Clear existing rows

    furnitures.forEach((product, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = product.name;
        row.insertCell(1).textContent = product.quantity;
        
        const actionCell = row.insertCell(2);
        actionCell.innerHTML = `
            <button class="edit" onclick="editFurniture(${index})">Edit</button>
            <button class="delete" onclick="deleteFurniture(${index})">Hapus</button>
        `;
    });
}

// Fungsi untuk mengedit data System
function editSystem(index) {
    const newName = prompt("Masukkan nama baru:", systems[index].name);
    const newQuantity = prompt("Masukkan jumlah baru:", systems[index].quantity);

    if (newName && newQuantity) {
        systems[index].name = newName;
        systems[index].quantity = parseInt(newQuantity);
        saveSystems();
        renderSystemTable();
    }
}

// Fungsi untuk mengedit data Furniture
function editFurniture(index) {
    const newName = prompt("Masukkan nama baru:", furnitures[index].name);
    const newQuantity = prompt("Masukkan jumlah baru:", furnitures[index].quantity);

    if (newName && newQuantity) {
        furnitures[index].name = newName;
        furnitures[index].quantity = parseInt(newQuantity);
        saveFurnitures();
        renderFurnitureTable();
    }
}

// Fungsi untuk menghapus data System
function deleteSystem(index) {
    systems.splice(index, 1); // Hapus produk dari array
    saveSystems(); // Simpan ulang data ke LocalStorage
    renderSystemTable(); // Render ulang tabel
}

// Fungsi untuk menghapus data Furniture
function deleteFurniture(index) {
    furnitures.splice(index, 1); // Hapus produk dari array
    saveFurnitures(); // Simpan ulang data ke LocalStorage
    renderFurnitureTable(); // Render ulang tabel
}