import { ProductType } from "@/types/products.type";
import ProductView from "@/views/product";

function ProductPage(props: { products: ProductType[] }) {
  const { products } = props;
  return (
    <div>
      <ProductView products={products} />
    </div>
  );
}

export default ProductPage;

// calling when do request
// every do request will be called
export async function getServerSideProps() {
  // fetch data, ketika melakukan Server Side Rendering, URL API harus lengkap
  const res = await fetch("http://localhost:3000/api/product");
  const response = await res.json();
  console.log(response);
  return {
    props: {
      products: response.data,
    },
  };
}
