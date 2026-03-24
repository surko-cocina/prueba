// cart.js

// Dependencies
const axios = require('axios');

// Haversine formula for calculating distance between two GPS coordinates
function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

// Function to get address suggestions using Nominatim API
async function getAddressSuggestions(query) {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching address suggestions:', error);
        return [];
    }
}

// Delivery cost calculation example based on distance
function calculateDeliveryCost(distance) {
    const baseCost = 5; // Base cost in dollars
    const costPerKm = 1; // Cost per km in dollars
    return baseCost + (costPerKm * distance);
}

// WhatsApp checkout integration
function checkoutViaWhatsApp(orderDetails) {
    const message = encodeURIComponent(`Checkout Details: ${JSON.stringify(orderDetails)}`);
    const whatsappUrl = `https://wa.me/your_number?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Example usage
const exampleAddressQuery = '1600 Amphitheatre Parkway, Mountain View, CA';
getAddressSuggestions(exampleAddressQuery).then(suggestions => {
    console.log('Address Suggestions:', suggestions);
});

// Example GPS coordinates
const lat1 = 37.422; // Example: Latitude of first location
const lon1 = -122.084; // Example: Longitude of first location
const lat2 = 37.774; // Example: Latitude of second location
const lon2 = -122.419; // Example: Longitude of second location
const distance = haversine(lat1, lon1, lat2, lon2);
console.log(`Distance: ${distance} km`);
const deliveryCost = calculateDeliveryCost(distance);
console.log(`Delivery Cost: $${deliveryCost}`);
