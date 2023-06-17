import { MongoClient, ObjectId } from "mongodb";
import ProductDetail from "../../components/products/ProductDetail";

export default function ProductDetails(props) {
  return <ProductDetail productData={props.productData} />;
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(process.env.MONGO_KEY);
  const db = client.db();
  const productsCollection = db.collection("products");
  const dbProducts = await productsCollection.find().toArray();

  const ids = dbProducts.map((product) => product._id.toString());

  return {
    fallback: true,
    paths: ids.map((id) => ({
      params: { productId: id },
    })),
  };
}

export async function getStaticProps(context) {
  const productId = context.params.productId;
  console.log(productId);
  const client = await MongoClient.connect(process.env.MONGO_KEY);
  const db = client.db();
  const productsCollection = db.collection("products2");
  const productData = await productsCollection.findOne({
    _id: new ObjectId(productId),
  });

  const product = {
    ...productData,
    _id: productData._id.toString(),
  };

  return {
    props: {
      productData: product,
    },
  };
}
