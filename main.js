import { products } from "./products.js";
import { shuffleArray, renderDashboard, generateCategories} from "./utils.js";


let currentProducts = shuffleArray(products);
const searchBarInput = document.querySelector(".filter");

renderDashboard(currentProducts);
generateCategories(products);

searchBarInput.addEventListener("input", () => {
    const activeCategory = document.querySelector(".active-category").innerText;
    let foundProducts;

    if (activeCategory.toLowerCase() !== "wszystkie")  {
        foundProducts = products.filter((product) => {
            return product.category.toLowerCase() === activeCategory.toLowerCase()
        });
    } else {
        foundProducts = products;
    }

    foundProducts = foundProducts.filter((product) => {
        return product.name.toLowerCase().includes(searchBarInput.value.toLowerCase())
    });

    renderDashboard(foundProducts);
});