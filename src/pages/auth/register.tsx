import Link from "next/link";

function RegisterPage() {
  return (
    <div>
      <h1>Register Page</h1>
      <p>
        Sudah punya akun? Login <Link href={"/auth/login"}>Di Sini</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
