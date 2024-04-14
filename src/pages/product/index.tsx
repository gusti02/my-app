import { useRouter } from "next/router";
import { useEffect, useState } from "react";

{
  /* Try to using dynamic routing */
}

function ProductPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  {
    /* this useEffect is used to check if the user is logged in, if not, 
    will redirect to the login page */
  }
  useEffect(() => {
    if (!isLogin) {
      router.push("/auth/login");
    }
  }, []);
  return (
    <div>
      <h1>Product Page</h1>
    </div>
  );
}

export default ProductPage;
