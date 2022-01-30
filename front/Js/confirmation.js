// Get OrderId 
const params = new URL(document.location).searchParams;
const orderId = params.get("orderId");

// Show Order Number
document.getElementById("orderId").textContent = orderId;

