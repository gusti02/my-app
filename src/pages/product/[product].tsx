import { useRouter } from "next/router";
import { fetcher } from "@/utils/swr/fetcher";
import useSWR from "swr";
import DetailProduct from "@/views/detailProduct";
import { ProductType } from "@/types/products.type";

function DetailProductPage({ product }: { product: ProductType }) {
  const { query } = useRouter();

  {
    /* Client-Side Rendering */
  }
  const { data, error, isLoading } = useSWR(
    `/api/product/${query.product}`,
    fetcher
  );

  return (
    <div>
      {/* Client-Side Rendering */}
      {/* <DetailProduct product={isLoading ? {}: data.data} /> */}

      {/* Server-Side Rendering */}
      <DetailProduct product={product} />

      {/* Static-Site Generation */}
      {/* <DetailProduct product={product} /> */}
    </div>
  );
}

export default DetailProductPage;

{
  /* Server-Side Rendering */
}
export async function getServerSideProps({
  params,
}: {
  params: { product: string };
}) {
  // fetch data, ketika melakukan Server Side Rendering, URL API harus lengkap
  const res = await fetch(
    `http://localhost:3000/api/product/${params.product}`
  );
  const response = await res.json();
  return {
    props: {
      product: response.data,
    },
  };
}

{
  /* Di Static-Site Generation ketika melakukan dynamic routing, memerlukan getStaticPath */
}
// export async function getStaticPaths() {
//   const res = await fetch("http://localhost:3000/api/product");
//   const response = await res.json();

//   const paths = response.data.map((product: ProductType) => ({
//     params: {
//       product: product.id,
//     },
//   }));
//   return { paths, fallback: false };
// }

{
  /* Static-Site Generation */
}
// export async function getStaticProps({
//   params,
// }: {
//   params: { product: string };
// }) {
//   const res = await fetch(
//     `http://localhost:3000/api/product/${params.product}`
//   );
//   const response = await res.json();
//   return {
//     props: {
//       product: response.data,
//     },
//   };
// }
