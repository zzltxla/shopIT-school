const search = new URLSearchParams(window.location.search);
const id = search.get("id");

const cartCount = document.querySelector("#cart-count")
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart () {
    if (cartCount) {
        cartCount.textContent = cart.length;
    }   
}
addToCart();

if (document.URL.includes("product.html")) { //check if on product page
    fetch(api_url + "/" + id) //fetch selected product data
    .then(response => response.json())
    .then(product => {
        showProduct(product)
    })
    .catch(error => console.error("Error fetching product data:", error))


    //back to previous page button
    const backButton = document.querySelector("#back-button");
    backButton.addEventListener("click", function () {window.history.back()});
}

const wrapper = document.querySelector(".product-wrapper");
const title = document.querySelector("h1");
const price = document.querySelector("h3");

const cartButton = document.querySelector("#cart");

function showProduct (product) {
    wrapper.style.backgroundImage = "url('" + product.imageUrl + "')";
    title.textContent = product.name;
    price.textContent = product.price + "$";

    cartButton.addEventListener("click",(event) => {
        event.preventDefault();
    
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        addToCart();

        window.history.back();
    });

}








