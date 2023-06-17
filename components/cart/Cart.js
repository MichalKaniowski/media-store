import { useContext, useState } from "react";
import Image from "next/image";
import styles from "./Cart.module.css";
import cartContext from "../../store/cart-context";
import OrderCustomization from "./OrderCustomization";
import CartSummary from "./CartSummary";

function Cart() {
  const cartCtx = useContext(cartContext);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [servicesCost, setServicesCost] = useState(0);
  const [isPaymentChosen, setIsPaymentChosen] = useState(false);
  const [isDeliveryChosen, setIsDeliveryChosen] = useState(false);
  const [hasUserProceeded, setHasUserProceeded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const orderCost = cartCtx.totalAmount + servicesCost + deliveryCost;

  function addItemHandler(item) {
    cartCtx.addItem(item);
  }

  function removeItemHandler(itemId) {
    cartCtx.removeItem(itemId);
  }

  function removeWholeItemHandler(itemId) {
    cartCtx.removeWholeItem(itemId);
  }

  function userProceedHandler() {
    setHasUserProceeded(true);

    if (!isDeliveryChosen) {
      setErrorMessage("You need to choose delivery method.");
    }

    if (!isPaymentChosen) {
      setErrorMessage("You need to choose payment method.");
    }

    if (isDeliveryChosen && isPaymentChosen) {
      setErrorMessage("");
    }
  }

  function deliveryMethodChangeHandler(deliveryCost) {
    setDeliveryCost(deliveryCost);
    setIsDeliveryChosen(true);
  }

  function servicesChangeHandler(servicesCost) {
    setServicesCost(servicesCost);
  }

  function paymentMethodChangeHandler() {
    setIsPaymentChosen(true);
  }

  const cartItems = cartCtx.items.map((item) => {
    const salePrice = item.sale ? item.price - item.saleAmount : undefined;

    const totalItemAmount = item.sale
      ? item.quantity * (item.price - item.saleAmount)
      : item.price * item.quantity;

    return (
      <li key={item.id} className={styles["cart-item"]}>
        <div className={styles["item-body"]}>
          <div className={styles["item-body__top"]}>
            <div>
              <Image
                src={item.image}
                width={90}
                height={90}
                alt={item.description}
              />
            </div>

            <div>
              <h3>{item.name}</h3>
            </div>
          </div>

          <div className={styles["item-body__bottom"]}>
            <div>
              {item.sale && (
                <span className={styles["discount-price"]}>
                  {salePrice.toFixed(2)} zł
                </span>
              )}
              <span
                className={`${styles["regular-price"]} ${
                  item.sale ? styles["price-not-active"] : undefined
                }`}
              >
                {item.price.toFixed(2)} zł
              </span>
            </div>

            <div
              className={styles["quantity-container"]}
              style={{ display: "flex" }}
            >
              <button
                onClick={() => removeItemHandler(item.id)}
                className={styles["quantity-button"]}
              >
                -
              </button>

              <div>
                <p>{item.quantity}</p>
              </div>

              <button
                onClick={() => addItemHandler(item)}
                className={styles["quantity-button"]}
              >
                +
              </button>
            </div>
            <div className={styles["total-product-amount"]}>
              {totalItemAmount.toFixed(2)} zł
            </div>
          </div>

          <div>
            <button
              className={styles["remove-button"]}
              aria-label="remove-button"
              onClick={() => removeWholeItemHandler(item.id)}
            >
              <Image
                src="/images/trash-can.svg"
                width={20}
                height={20}
                alt="remove item"
              />
            </button>
          </div>
        </div>
        <hr></hr>
      </li>
    );
  });

  const cart = (
    <div className={styles.cart}>
      <div className={styles["cart-items"]}>
        <h1 className={styles["cart-heading"]}>Your Order</h1>
        <ul>{cartItems}</ul>
      </div>

      <OrderCustomization
        onDeliveryMethodChange={deliveryMethodChangeHandler}
        onServicesCostChange={servicesChangeHandler}
        onPaymentMethodChange={paymentMethodChangeHandler}
      />

      <hr style={{ border: "1px solid black" }}></hr>

      <CartSummary
        productsCost={cartCtx.totalAmount.toFixed(2)}
        servicesCost={servicesCost.toFixed(2)}
        deliveryCost={deliveryCost.toFixed(2)}
        totalAmount={orderCost.toFixed(2)}
        hasUserProceeded={hasUserProceeded}
        errorMessage={errorMessage}
        onUserProceed={userProceedHandler}
      />
    </div>
  );

  return cartCtx.items.length > 0 ? cart : <h1>No items in cart</h1>;
}

export default Cart;
