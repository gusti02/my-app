import ProductView from "@/views/product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/swr/fetcher";

/* Try to using dynamic routing  if the user is not logged in 
  will redirect to the login page*/
function ProductPage() {
  const router = useRouter();
  // const [isLogin, setIsLogin] = useState(true);
  const [products, setProducts] = useState([]);

  {
    /* this useEffect is used to check if the user is logged in, if not, 
    will redirect to the login page */
  }
  // useEffect(() => {
  //   if (!isLogin) {
  //     router.push("/auth/login");
  //   }
  // }, []);

  const { data, error, isLoading } = useSWR("/api/product", fetcher);

  {
    /* this useEffect for fecthing data from API and set it to state setProducts */
  }
  // useEffect(() => {
  //   fetch("/api/product")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setProducts(data.data);
  //     });
  // }, []);

  return (
    <div>
      <ProductView products={isLoading ? [] : data?.data} />
    </div>
  );
}

export default ProductPage;
