// cart-functions.js

// Cart management functions
const cart = [];

function addItemToCart(item) {
    cart.push(item);
}

function removeItemFromCart(item) {
    const index = cart.indexOf(item);
    if (index > -1) {
        cart.splice(index, 1);
    }
}

function calculateTotal() {
    return cart.reduce((total, item) => total + item.price, 0);
}

// Delivery calculation with GPS
function calculateDeliveryCost(location) {
    // Mock delivery cost calculation based on GPS coordinates.
    const baseCost = 5; // base delivery cost
    const distance = 10; // assume a distance of 10 km for example.
    const costPerKm = 1.5;
    return baseCost + (distance * costPerKm);
}

// WhatsApp integration
function sendWhatsAppMessage(number, message) {
    const apiUrl = `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(message)}`;
    window.open(apiUrl);
}

// Export functions
module.exports = { addItemToCart, removeItemFromCart, calculateTotal, calculateDeliveryCost, sendWhatsAppMessage };