import { products } from "./products.js";

const filter = document.querySelector(".filter");
const productsContainer = document.querySelector(".products-list");

let basket = [];
let basketMoney = 0;

let categories = new Set();


export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

export const addToBasket = (product) => {
    const basketText = document.querySelector(".bucket-container span");
    const emptyTheBasketButton = document.querySelector(".empty-the-basket-button");

    basket.push(product);  
    if (product.sale)  {
        basketMoney += product.price - product.saleAmount;
    }  else {
        basketMoney += product.price;
    }
    basketText.innerText = basketMoney.toFixed(2);

    emptyTheBasketButton.addEventListener("click", () => {
        basket = [];
        basketMoney = 0;
        basketText.innerText = "Koszyk";
        emptyTheBasketButton.classList.remove("active");
    });

    emptyTheBasketButton.classList.add("active");
}

const createCategory = (categoryText, categoryIndex) => {
    const categoriesContainer = document.querySelector(".categories");
    const category = createProductItemComponent("div", "category", categoryText.charAt(0).toUpperCase() + categoryText.slice(1));

    if (categoryIndex === 0) {
        category.classList.add("active-category");
    }

    category.addEventListener("click", () => {
        document.querySelector(".active-category").classList.remove("active-category");
        category.classList.add("active-category");
        let currentProducts;

        if (filter.value){
            currentProducts = products.filter((product) => {
                return product.name.toLowerCase().includes(filter.value.toLowerCase());
            });
        } else {
            currentProducts = products;
        }

        if (category.innerText.toLowerCase() !== "wszystkie") {
            currentProducts = currentProducts.filter((product) => product.category.toLowerCase() === category.innerText.toLowerCase());
        }

        renderDashboard(currentProducts);
    });

    categoriesContainer.appendChild(category);
}

export const generateCategories = (products) => {
    products.forEach((product) => {
        categories.add(product.category);
    });

    categories = ["wszystkie", ...categories];

    categories.forEach((category, index) => {
        createCategory(category, index);
    });
}

const createProductItemComponent = (kindOfItem, clas, innerText) => {
    const productInnerItem = document.createElement(kindOfItem);
    productInnerItem.className = clas;
    productInnerItem.innerHTML = innerText;

    return productInnerItem;
}

const createImgElement = (clas, altText, source) => {
    const imgElement = document.createElement("img");
    imgElement.className = clas;
    imgElement.alt = altText;
    imgElement.src = source;

    return imgElement;
}

const createProductItem = (product) => {
    const productItem = createProductItemComponent("div", "product-content", "");
    const productImg = createImgElement("product-image", "product image", product.image);
    const productTitle = createProductItemComponent("p", "product-title", product.name);
    const productDescription = createProductItemComponent("p", "product-description", product.description);
    const pricesContainer = createProductItemComponent("div", "prices-container", "");
    const regularPrice = createProductItemComponent("span", "regular-price", product.price + " pln");

    let discountedPrice;
    if (product.sale) {
        regularPrice.classList.add("price-not-active");
        discountedPrice = createProductItemComponent("span", "discounted-price", (product.price-product.saleAmount).toFixed(2));
        pricesContainer.appendChild(discountedPrice);
        
        const onSaleBanner = createProductItemComponent("span", "on-sale-banner", "On Sale");
        productItem.appendChild(onSaleBanner);
    }

    const basketButton = createProductItemComponent("button", "basket-button", "Add to Basket");
    basketButton.id = "basket-button-" + product.id;

    basketButton.addEventListener("click", () => {
        const productId = basketButton.id.slice(-1);
        const product = products.filter((product) => {
            return parseInt(product.id) === parseInt(productId);
        });
        addToBasket(product[0]);
    });

    pricesContainer.appendChild(regularPrice);

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

    productsContainer.appendChild(productElement);
}

export const renderDashboard = (products) => {
    productsContainer.innerHTML = "";
    
    products.forEach((product) => {
        createProductElement(product);
    });

    if (products.length === 0) {
        document.querySelector(".empty-state-container").style.display = "block";
    } else {
        document.querySelector(".empty-state-container").style.display = "none";
    }
}