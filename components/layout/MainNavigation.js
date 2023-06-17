import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import styles from "./MainNavigation.module.css";
import SearchBar from "../searchbar/SearchBar";
import InputContext from "../../store/input-context";
import CartContext from "../../store/cart-context";
import { useRouter } from "next/router";

function MainNavigation() {
  const router = useRouter();
  const inputCtx = useContext(InputContext);
  const cartCtx = useContext(CartContext);
  const [isFilterShown, setIsFilterShown] = useState(true);

  const { pathname } = router;

  useEffect(() => {
    if (pathname === "/") {
      setIsFilterShown(true);
    } else {
      setIsFilterShown(false);
    }
  }, [pathname]);

  function handleInputChange(e) {
    inputCtx.changeValue(e.target.value);
  }

  return (
    <header>
      <nav className={styles.navbar}>
        <Link href="/">
          <strong className={styles["navbar-brand"]}>
            <span>media</span> store
          </strong>
        </Link>
        <div className={styles["logo-container"]}>
          <FontAwesomeIcon icon={faPlay} />
        </div>

        {isFilterShown && (
          <SearchBar
            onChange={handleInputChange}
            value={inputCtx.value}
            screenSize="large"
          />
        )}

        <div className={styles["cart-container"]}>
          <Link href={"/cart"}>
            <FontAwesomeIcon
              icon={faCartShopping}
              size="sm"
              style={{ color: "#ffee00" }}
            />
            <span>Koszyk</span>
            <span className={styles["number-of-items"]}>
              {cartCtx.totalQuantity}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default MainNavigation;
