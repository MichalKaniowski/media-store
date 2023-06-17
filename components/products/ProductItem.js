import React, { useContext } from "react";
import styles from "./ProductItem.module.css";
import Image from "next/image";
import Card from "../ui/Card";
import cartContext from "../../store/cart-context";

function ProductItem(props, ref) {
  const cartCtx = useContext(cartContext);

  const { name, description, price, image, sale, saleAmount } = props.item;

  const salePrice = (price - saleAmount).toFixed(2);

  function addProductToCartHandler() {
    cartCtx.addItem(props.item);
  }

  return (
    <Card className={styles["product-item"]}>
      <Image width={200} height={200} src={image} alt={description} />
      <h3>{name}</h3>
      <p>{description}</p>
      <div className={styles["prices-container"]}>
        <span
          className={`${styles["regular-price"]} ${
            sale ? styles["price-not-active"] : undefined
          }`}
        >
          {price} zł
        </span>
        {sale && (
          <span className={styles["discount-price"]}>{salePrice} zł</span>
        )}
      </div>
      {sale && <div className={styles["onsale-banner"]}>On Sale</div>}
      <button
        onClick={addProductToCartHandler}
        className={styles["cart-button"]}
        ref={ref}
      >
        Add To Cart
      </button>
    </Card>
  );
}

export default React.forwardRef(ProductItem);
