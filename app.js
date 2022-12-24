import { products } from "./products.js";

const currentProducts = products;


const createProductItem = (product) => {
    const productItem = document.createElement("div");
    productItem.className = "product-content";

    const productImg = document.createElement("img");
    productImg.className = "product-image";
    productImg.alt = "product image";
    productImg.src = product.image;

    const productTitle = document.createElement("p");
    productTitle.className = "product-title";
    productTitle.innerText = product.name;

    const productDescription = document.createElement("p");
    productDescription.className = "product-description";
    productDescription.innerText = product.description;
    
    const pricesContainer = document.createElement("div");
    pricesContainer.className = "prices-container";

    const regularPrice = document.createElement("span");
    regularPrice.className = "regular-price";
    regularPrice.innerText = product.price + " pln";

    
    const discountedPrice = document.createElement("span");
    if (product.sale) {
        discountedPrice.className = "discounted-price";
        discountedPrice.innerText = product.price - product.sale + " pln";
    }

    const basketButton = document.createElement("button");
    basketButton.className = "basket-button";
    basketButton.innerText = "Add to Basket";

    pricesContainer.appendChild(regularPrice);

    if (discountedPrice) {
        pricesContainer.appendChild(discountedPrice);
    }

    productItem.appendChild(productImg);
    productItem.appendChild(productTitle);
    productItem.appendChild(productDescription);
    productItem.appendChild(pricesContainer);
    

    productItem.appendChild(basketButton);

    return productItem;
}

const createProductElement = (product) => {
    const productElement = document.createElement("li");
    productElement.className = "product";
    productElement.appendChild(createProductItem(product));

    const mainContainer = document.querySelector(".products-list");
    mainContainer.appendChild(productElement);
}


currentProducts.forEach((product) => {
    createProductElement(product);
});
