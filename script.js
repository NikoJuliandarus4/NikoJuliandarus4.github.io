// Stock System Data
let systemStock = JSON.parse(localStorage.getItem('systemStock')) || [];

// Stock Furniture Data
let furnitureStock = JSON.parse(localStorage.getItem('furnitureStock')) || [];

// Function to save data to localStorage
function saveToLocalStorage() {
    localStorage.setItem('systemStock', JSON.stringify(systemStock));
    localStorage.setItem('furnitureStock', JSON.stringify(furnitureStock));
}

// Add Stock to System
function addSystemStock() {
    const name = document.getElementById('system-name').value;
    const quantity = parseInt(document.getElementById('system-quantity').value);

    if (name && !isNaN(quantity)) {
        systemStock.push({ name, quantity });
        saveToLocalStorage();
        updateStockList('system-stock-list', systemStock);
        document.getElementById('system-name').value = '';
        document.getElementById('system-quantity').value = '';
    } else {
        alert('Please enter valid item name and quantity.');
    }
}

// Add Stock to Furniture
function addFurnitureStock() {
    const name = document.getElementById('furniture-name').value;
    const quantity = parseInt(document.getElementById('furniture-quantity').value);

    if (name && !isNaN(quantity)) {
        furnitureStock.push({ name, quantity });
        saveToLocalStorage();
        updateStockList('furniture-stock-list', furnitureStock);
        document.getElementById('furniture-name').value = '';
        document.getElementById('furniture-quantity').value = '';
    } else {
        alert('Please enter valid item name and quantity.');
    }
}

// Update Stock List
function updateStockList(listId, stockArray) {
    const list = document.getElementById(listId);
    list.innerHTML = '';

    stockArray.forEach((item, index) => {
        const stockItem = document.createElement('div');
        stockItem.className = 'stock-item';
        stockItem.innerHTML = `
            <span>${item.name} - ${item.quantity}</span>
            <div>
                <button onclick="editStock(${index}, '${listId}')">Edit</button>
                <button onclick="deleteStock(${index}, '${listId}')">Delete</button>
            </div>
        `;
        list.appendChild(stockItem);
    });
}

// Edit Stock
function editStock(index, listId) {
    const stockArray = listId === 'system-stock-list' ? systemStock : furnitureStock;
    const newQuantity = prompt('Enter new quantity:');
    if (!isNaN(newQuantity) && newQuantity !== null) {
        stockArray[index].quantity = parseInt(newQuantity);
        saveToLocalStorage();
        updateStockList(listId, stockArray);
    }
}

// Delete Stock
function deleteStock(index, listId) {
    const stockArray = listId === 'system-stock-list' ? systemStock : furnitureStock;
    stockArray.splice(index, 1);
    saveToLocalStorage();
    updateStockList(listId, stockArray);
}

// Load stock data when the page loads
window.onload = function () {
    updateStockList('system-stock-list', systemStock);
    updateStockList('furniture-stock-list', furnitureStock);
};