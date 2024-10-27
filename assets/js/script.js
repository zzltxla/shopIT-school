let articleWrapper = document.querySelector(".article-wrapper");
let cartArticleWrapper = document.querySelector("#cart-article-wrapper");
let totalPrice = 0;


const api_url = "http://localhost:3000/products";
if (document.URL.includes("index.html")) { //check if on homepage
    fetch(api_url) //fetch data from JSON file
        .then(response=> response.json())
        .then((products) => {
                products.forEach((product) => {
                    createArticle(product)
                })  //create article
        })
        .catch (error =>console.error("Error fetching data:", error))
}
    
function createArticle (product) {
    const article = document.createElement("article");

    const p = document.createElement("p");

    if (document.URL.includes("index.html")) { //if on homepage
        p.textContent = "see more";

        const img = document.createElement("img");

        img.src = product.imageUrl; 
        img.alt = product.description;
    
        article.appendChild(img);
    }


    if (document.URL.includes("cart.html") || document.URL.includes("confirmation.html")) { //if on cart
        p.textContent = `${product.price} $`

        const name = document.createElement("h2");
        name.textContent = product.name;
        article.appendChild(name);

        article.style.backgroundImage = `url("${product.imageUrl}")`;
    };

    article.appendChild(p);
    articleWrapper.appendChild(article);

    article.addEventListener("click", () => window.location.href = `../views/product.html?id=${product.id}`);
}


const logo = document.querySelector(".logo");

logo.addEventListener('click', () => window.location.href = "/index.html");














