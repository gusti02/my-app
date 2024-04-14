import { useRouter } from "next/router";

function DetailProductPage() {
  const { query } = useRouter();
  return (
    <div>
      <h1>Detail Product</h1>
      <p>Product : {query.product} </p>
    </div>
  );
}

export default DetailProductPage;
