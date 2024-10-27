const form = document.querySelector("form");
const confirmationMessage = document.querySelector("h1");
const confirmMain = document.querySelector("#confirm-main");

window.addEventListener("DOMContentLoaded", () => {
    if (confirmMain) {
        confirmationMessage.textContent = `Thank you for your order!`;

        cart = JSON.parse(localStorage.getItem("cart")) || [];

        showCart();
    }
    localStorage.removeItem("cart");
    localStorage.removeItem("userInfo");
})
