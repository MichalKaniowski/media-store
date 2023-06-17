import styles from "./SearchBar.module.css";
import Image from "next/image";

export default function SearchBar(props) {
  return (
    <div
      className={`${styles["filter-container"]} ${
        props.screenSize === "large" ? styles["large"] : undefined
      }`}
    >
      <input
        type="text"
        className={styles["filter"]}
        placeholder="Search in shop"
        value={props.value}
        onChange={props.onChange}
      />
      <button
        className={styles["magnifier-button"]}
        aria-label="magnifier-button"
      >
        <Image
          src="images/magnifying-glass.svg"
          width={17}
          height={17}
          alt="search for products"
        />
      </button>
    </div>
  );
}
