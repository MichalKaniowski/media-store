import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Layout from "../components/layout/Layout";
import { InputContextProvider } from "../store/input-context";
import { CartProvider } from "../store/cart-context";

export default function App({ Component, pageProps }) {
  return (
    <InputContextProvider>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </InputContextProvider>
  );
}
