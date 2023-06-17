import { nanoid } from "nanoid";
import styles from "./Products.module.css";
import ProductItem from "./ProductItem";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

function Products(props) {
  const router = useRouter();
  const { products } = props;
  const [activeCategory, setActiveCategory] = useState("wszystkie");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const buttonRef = useRef();

  const categories = products.map((product) => product.category);
  const categoriesSet = new Set(categories);
  const uniquesCategories = ["wszystkie", ...categoriesSet];

  function handleCategoryChange(chosenCategory) {
    setActiveCategory(chosenCategory);
  }

  useEffect(() => {
    let productsFilteredByCategory;
    if (activeCategory === "wszystkie") {
      productsFilteredByCategory = products;
    } else {
      productsFilteredByCategory = products.filter(
        (product) => product.category === activeCategory
      );
    }
    const filteredProducts = productsFilteredByCategory.filter((product) =>
      product.name.toLowerCase().includes(props.inputValue.trim().toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  }, [props.inputValue, activeCategory, products]);

  function productClickHandler(e, productId) {
    if (e.target.innerText !== buttonRef.current.innerText) {
      router.push(`/products/${productId}`);
    }
  }

  const categoriesList = uniquesCategories.map((category) => (
    <div
      key={nanoid()}
      className={`${styles.category} ${
        category === activeCategory ? styles["active-category"] : undefined
      }`}
      onClick={() => handleCategoryChange(category)}
    >
      {category}
    </div>
  ));

  const productList = filteredProducts.map((product) => (
    <li key={product.id} onClick={(e) => productClickHandler(e, product.id)}>
      <ProductItem item={product} ref={buttonRef} />
    </li>
  ));

  return (
    <div className={styles["products-container"]}>
      <aside className={styles.navigation}>
        <div className={styles.categories}>
          <div>
            <p className={styles["navigation-heading"]}>Produkty</p>
          </div>
          {categoriesList}
        </div>
      </aside>

      <ul className={styles["products-list"]}>{productList}</ul>
    </div>
  );
}

export default Products;
