import styles from "./CartSummary.module.css";

export default function CartSummary(props) {
  function userProceedHandler() {
    props.onUserProceed();
  }

  return (
    <div className={styles["cart-summary"]}>
      <div className={styles["cart-summary-content"]}>
        <div>
          <p className={styles["cart-summary-heading"]}>Wartość produktów:</p>
          <span className={styles["cart-summary-price"]}>
            {props.productsCost} zł
          </span>
        </div>
        <div>
          <p className={styles["cart-summary-heading"]}>Wartość dodatków:</p>
          <span className={styles["cart-summary-price"]}>
            {props.servicesCost} zł
          </span>
        </div>
        <div>
          <p className={styles["cart-summary-heading"]}>Koszt dostawy:</p>
          <span className={styles["cart-summary-price"]}>
            {props.deliveryCost} zł
          </span>
        </div>
        <div>
          <p className={styles["cart-summary-heading"]}>Łącznie:</p>
          <span className={styles["cart-summary-price"]}>
            {props.totalAmount} zł
          </span>
        </div>
        <button onClick={userProceedHandler}>Dalej</button>
        {props.hasUserProceeded && props.errorMessage && (
          <p style={{ color: "red" }}>{props.errorMessage}</p>
        )}
        {props.hasUserProceeded && props.errorMessage === "" && (
          <p style={{ color: "red" }}>Shop has currently a maintance break.</p>
        )}
      </div>
    </div>
  );
}
