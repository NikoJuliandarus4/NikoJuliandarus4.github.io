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


// Aktifitas barang

document.addEventListener("DOMContentLoaded", function () {
    const logFormMasuk = document.getElementById("logFormMasuk");
    const logFormKeluar = document.getElementById("logFormKeluar");
    const logTableBodyMasuk = document.getElementById("logTableBodyMasuk");
    const logTableBodyKeluar = document.getElementById("logTableBodyKeluar");

    // Load existing data from localStorage or initialize empty arrays
    let logDataMasuk = JSON.parse(localStorage.getItem("logDataMasuk")) || [];
    let logDataKeluar = JSON.parse(localStorage.getItem("logDataKeluar")) || [];

    // Render both tables initially
    renderTable("Masuk");
    renderTable("Keluar");

    // Add new Barang Masuk
    logFormMasuk.addEventListener("submit", function (event) {
        event.preventDefault();

        const eventName = document.getElementById("eventNameMasuk").value;
        const itemName = document.getElementById("itemNameMasuk").value;
        const itemQuantity = parseInt(document.getElementById("itemQuantityMasuk").value, 10);
        const itemTime = document.getElementById("itemTimeMasuk").value;

        const newItem = {
            id: Date.now(),
            eventName: eventName,
            name: itemName,
            quantity: itemQuantity,
            time: itemTime
        };

        logDataMasuk.push(newItem);
        saveAndRender("Masuk");

        logFormMasuk.reset();
    });

    // Add new Barang Keluar
    logFormKeluar.addEventListener("submit", function (event) {
        event.preventDefault();

        const eventName = document.getElementById("eventNameKeluar").value;
        const itemName = document.getElementById("itemNameKeluar").value;
        const itemQuantity = parseInt(document.getElementById("itemQuantityKeluar").value, 10);
        const itemTime = document.getElementById("itemTimeKeluar").value;

        const newItem = {
            id: Date.now(),
            eventName: eventName,
            name: itemName,
            quantity: itemQuantity,
            time: itemTime
        };

        logDataKeluar.push(newItem);
        saveAndRender("Keluar");

        logFormKeluar.reset();
    });

    // Save data to localStorage and render the table
    function saveAndRender(type) {
        if (type === "Masuk") {
            localStorage.setItem("logDataMasuk", JSON.stringify(logDataMasuk));
            renderTable("Masuk");
        } else if (type === "Keluar") {
            localStorage.setItem("logDataKeluar", JSON.stringify(logDataKeluar));
            renderTable("Keluar");
        }
    }

    // Render the table based on the type
    function renderTable(type) {
        const tableBody = type === "Masuk" ? logTableBodyMasuk : logTableBodyKeluar;
        const logData = type === "Masuk" ? logDataMasuk : logDataKeluar;

        tableBody.innerHTML = "";

        logData.forEach(item => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td data-label="Nama Event">${item.eventName}</td>
                <td data-label="Nama Barang">${item.name}</td>
                <td data-label="Jumlah">${item.quantity}</td>
                <td data-label="Waktu">${item.time}</td>
                <td data-label="Aksi">
                    <button onclick="editItem(${item.id}, '${type}')">Edit</button>
                    <button onclick="deleteItem(${item.id}, '${type}')">Hapus</button>
                </td>
            `;

            tableBody.appendChild(row);
        });
    }

    // Edit item
    window.editItem = function (id, type) {
        const logData = type === "Masuk" ? logDataMasuk : logDataKeluar;
        const item = logData.find(i => i.id === id);

        if (item) {
            if (type === "Masuk") {
                document.getElementById("eventNameMasuk").value = item.eventName;
                document.getElementById("itemNameMasuk").value = item.name;
                document.getElementById("itemQuantityMasuk").value = item.quantity;
                document.getElementById("itemTimeMasuk").value = item.time;
            } else {
                document.getElementById("eventNameKeluar").value = item.eventName;
                document.getElementById("itemNameKeluar").value = item.name;
                document.getElementById("itemQuantityKeluar").value = item.quantity;
                document.getElementById("itemTimeKeluar").value = item.time;
            }

            logData.splice(logData.indexOf(item), 1);
            saveAndRender(type);
        }
    };

    // Delete item
    window.deleteItem = function (id, type) {
        let logData = type === "Masuk" ? logDataMasuk : logDataKeluar;
        logData = logData.filter(i => i.id !== id);

        if (type === "Masuk") {
            logDataMasuk = logData;
        } else {
            logDataKeluar = logData;
        }

        saveAndRender(type);
    };
});