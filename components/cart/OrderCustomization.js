import styles from "./OrderCustomization.module.css";
import Image from "next/image";
import { useState } from "react";

const deliveryMethods = [
  {
    id: "d2",
    name: "Odbiór w sklepie",
    price: 0,
    image: "/images/store.svg",
  },
  {
    id: "d3",
    name: "Paczkomat",
    price: 11.99,
    image: "/images/parcel-locker.svg",
  },
  {
    id: "d1",
    name: "Kurier",
    price: 13.99,
    image: "/images/delivery.svg",
  },
];

const paymentMethods = [
  {
    id: "m1",
    name: "Paypal",
    image: "/images/paypal.svg",
  },
  { id: "m2", name: "Karta kredytowa", image: "/images/credit-card.svg" },
  { id: "m3", name: "Google pay", image: "/images/google-pay.svg" },
  {
    id: "m4",
    name: "Gotówka przy odbiorze",
    image: "/images/cash-register.svg",
  },
];

const additionalServices = [
  {
    id: "s1",
    name: "Powiadomienie SMS",
    price: 0.99,
    image: "/images/sms.svg",
  },
  {
    id: "s2",
    name: "Szybka ochronna + naklejenie szybki",
    price: 71.99,
    image: "/images/mobile-screen.svg",
  },
];

export default function OrderCustomization(props) {
  const [activeDeliveryMethodId, setActiveDeliveryMethodId] = useState(null);
  const [activePaymentMethodId, setActivePaymentMethodId] = useState(null);
  const [chosenServices, setChosenServices] = useState([]);

  const chosenServicesIds = chosenServices.map((service) => service.id);

  function deliveryMethodChangeHandler(methodId) {
    setActiveDeliveryMethodId(methodId);
    const deliveryCost = deliveryMethods.find(
      (method) => method.id === methodId
    ).price;
    props.onDeliveryMethodChange(deliveryCost);
  }

  function paymentMethodChangeHandler(id) {
    setActivePaymentMethodId(id);
    props.onPaymentMethodChange();
  }

  function chosenServicesChangeHandler(service) {
    const { id } = service;

    let newChosenServices = [...chosenServices];
    const serviceInArray = newChosenServices.find(
      (service) => service.id === id
    );

    if (serviceInArray) {
      newChosenServices = newChosenServices.filter(
        (service) => service.id !== id
      );
    } else {
      newChosenServices.push(service);
    }

    setChosenServices(newChosenServices);

    const servicesCost = newChosenServices.reduce((accumulator, service) => {
      return accumulator + service.price;
    }, 0);

    props.onServicesCostChange(servicesCost);
  }

  const deliveryElements = deliveryMethods.map((method) => {
    return (
      <div
        key={method.id}
        className={`${styles["option"]} ${
          method.id === activeDeliveryMethodId
            ? styles["active-option"]
            : undefined
        }`}
        onClick={() => deliveryMethodChangeHandler(method.id)}
      >
        <Image src={method.image} width={27} height={27} alt={method.name} />
        <div>
          <p>{method.name}</p>
          <span>{method.price} zł</span>
        </div>
      </div>
    );
  });

  const paymentElements = paymentMethods.map((method) => {
    return (
      <div
        key={method.id}
        className={`${styles["option"]} ${
          method.id === activePaymentMethodId
            ? styles["active-option"]
            : undefined
        }`}
        onClick={() => paymentMethodChangeHandler(method.id)}
      >
        <Image src={method.image} width={30} height={30} alt={method.name} />
        <p>{method.name}</p>
      </div>
    );
  });

  const additionalServicesElements = additionalServices.map((service) => {
    return (
      <div
        key={service.id}
        className={`${styles["option"]} ${
          chosenServicesIds.includes(service.id)
            ? styles["active-option"]
            : undefined
        }`}
        onClick={() => chosenServicesChangeHandler(service)}
      >
        <Image src={service.image} width={30} height={30} alt={service.name} />
        <div>
          <p>{service.name}</p>
          <span>{service.price} zł</span>
        </div>
      </div>
    );
  });

  return (
    <div className={styles["cart-options"]}>
      <div className={styles["delivery"]}>
        <h3>1. Wybierz dostawę</h3>
        <div className={styles["options-container"]}>{deliveryElements}</div>
      </div>
      <hr></hr>
      <div className={styles["payment"]}>
        <h3>2. Wybierz płatność</h3>
        <div className={styles["options-container"]}>{paymentElements}</div>
      </div>
      <hr></hr>
      <div className={styles["additional-services"]}>
        <h3>3. Usługi dodatkowe</h3>
        <div className={styles["options-container"]}>
          {additionalServicesElements}
        </div>
      </div>
    </div>
  );
}
