import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type productType = {
  id: number;
  name: string;
  price: number;
  size: string;
};

{
  /* Try to using dynamic routing  if the user is not logged in 
  will redirect to the login page*/
}
function ProductPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [products, setProducts] = useState([]);

  {
    /* this useEffect is used to check if the user is logged in, if not, 
    will redirect to the login page */
  }
  useEffect(() => {
    if (!isLogin) {
      router.push("/auth/login");
    }
  }, []);

  {
    /* this useEffect for fecthing data from API and set it to state setProducts */
  }
  useEffect(() => {
    fetch("/api/product")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data);
      });
  }, []);

  return (
    <div>
      <h1>Product Page</h1>
      {products.map((product: productType) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

export default ProductPage;
