import Link from "next/link";

function RegisterPage() {
  return (
    <div>
      <div>Register Page</div>
      <p>
        Sudah punya akun? Login <Link href={"/auth/login"}>Di Sini</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
