import Link from "next/link";
import { useRouter } from "next/router";

function LoginPage() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/product");
  };
  return (
    <div>
      <div>Login Page</div>
      <button onClick={() => handleLogin()}>Login</button>
      <p>
        Belum punya akun? Register <Link href={"/auth/register"}>Di Sini</Link>
      </p>
    </div>
  );
}

export default LoginPage;
