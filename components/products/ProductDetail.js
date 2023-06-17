import styles from "./ProductDetail.module.css";
import Image from "next/image";
import Card from "../ui/Card";
import { nanoid } from "nanoid";

function capitalize(word) {
  const capitalizedWord = word[0].toUpperCase() + word.slice(1);
  return capitalizedWord;
}

export default function ProductDetail(props) {
  const { name, description, specification, price, image, sale, saleAmount } =
    props.productData;

  // console.log("Props.product in component: ", props.productData);

  const specificationEntries = Object.entries(specification);

  const specificationElements = specificationEntries.map((entry) => {
    return (
      <div key={nanoid()} className={styles["specification-row"]}>
        <span className={styles["specification-title"]}>
          {capitalize(entry[0])}:
        </span>
        <span className={styles["specification-data"]}>{` ${entry[1]}`}</span>
      </div>
    );
  });

  return (
    <div className={styles["product-container"]}>
      <div className={styles["product-content"]}>
        <h1>{capitalize(name)}</h1>
        <div className={styles["row"]}>
          <div className={`${styles["column"]} ${styles["child-1"]}`}>
            <Image
              src={image}
              width={460}
              height={476}
              layout="intrinsic"
              alt={description}
              className={styles["product-image"]}
            />
          </div>

          <div className={styles["column"]}>
            <div className={styles["banners-container"]}>
              <Image
                src="/images/discount-code-prices-banner.webp"
                width={200}
                height={50}
                alt="Z kodem rabatowym w super cenach"
                className={styles["banner-image"]}
              />
              <Image
                src="/images/delayed-payment-banner.webp"
                width={200}
                height={50}
                alt="Do 20 rat 0% i do września nie płacisz."
                className={styles["banner-image"]}
              />
              <Image
                src="/images/great-prices-headphones-banner.webp"
                width={200}
                height={50}
                alt="Słuchawki w super cenach"
                className={styles["banner-image"]}
              />
              <Image
                src="/images/3-devices-protection-banner.webp"
                width={200}
                height={50}
                alt="Ochrona 3 urządzeń za 29.99zł"
                className={styles["banner-image"]}
              />
            </div>
            {specificationElements}
          </div>

          <Card
            className={`${styles["column"]} ${styles["add-to-cart-window"]}`}
          >
            <span
              className={`${styles["regular-price"]} ${
                sale ? styles["price-not-active"] : undefined
              }`}
            >
              {price.toFixed(2)} zł
            </span>
            {sale && (
              <span className={styles["discount-price"]}>
                {(price - saleAmount).toFixed(2)} zł
              </span>
            )}

            <p className={styles["last-30-days-lowest-price"]}>
              Najniższa cena z 30 dni przed obniżką:{" "}
              {sale ? (price - saleAmount).toFixed(2) : price} zł
            </p>
            <hr style={{ margin: "10px 0" }}></hr>

            <div className={styles["delivery-row"]}>
              <Image
                src="/images/truck.svg"
                width={20}
                height={20}
                alt="Delivery date"
              />
              <p className={styles["delivery-date"]}>U Ciebie dzisiaj</p>
            </div>

            <div className={styles["delivery-row"]}>
              <Image
                src="/images/location-dot.svg"
                width={20}
                height={20}
                alt="Delivery date"
              />
              <p className={styles["delivery-date"]}>W sklepie dzisiaj</p>
            </div>

            <button className={styles["cart-button"]}>Do koszyka</button>
          </Card>
        </div>
      </div>
    </div>
  );
}
