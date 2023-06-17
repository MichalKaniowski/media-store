import { MongoClient } from "mongodb";
import { useContext } from "react";
import Head from "next/head";
import InputContext from "../store/input-context";
import SearchBar from "../components/searchbar/SearchBar";
import Products from "../components/products/Products";

function HomePage(props) {
  const ctx = useContext(InputContext);

  function handleInputChange(e) {
    ctx.changeValue(e.target.value);
  }

  return (
    <>
      <Head>
        <title>Media Store</title>
        <meta
          name="description"
          content="Sprzęt AGD, RTV, Multimedia. Szeroka Oferta Usług Instalacji, Montażu, Wniesienia i Innych."
        />
      </Head>
      <SearchBar
        onChange={handleInputChange}
        value={ctx.value}
        screenSize="small"
      />
      <Products inputValue={ctx.value} products={props.products} />
    </>
  );
}

export default HomePage;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.MONGO_KEY);
  const db = client.db();
  const productsCollection = db.collection("products2");
  const mongoProducts = await productsCollection.find().toArray();

  const products = mongoProducts.map((product) => {
    return {
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      image: product.image,
      sale: product.sale || null,
      saleAmount: product.saleAmount || null,
    };
  });

  return {
    revalidate: 60,
    props: {
      products: shuffleArray(products),
    },
  };
}
