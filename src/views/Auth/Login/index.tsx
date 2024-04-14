import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Login.module.css";

function LoginView() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/product");
  };
  return (
    <div className={styles.login}>
      <h1>Login Page</h1>
      <button onClick={() => handleLogin()}>Login</button>
      <p>
        Belum punya akun? Register <Link href={"/auth/register"}>Di Sini</Link>
      </p>
    </div>
  );
}

export default LoginView;
