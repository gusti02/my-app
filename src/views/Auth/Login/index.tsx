import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

function LoginView() {
  // useState for form and handle submit
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";

  // this is handle submit and fetch data
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Email or Password is Incorrect");
      }
    } catch (error: any) {
      setIsLoading(false);
      setError("Email or Password is Incorrect");
    }
  };
  return (
    <div className="flex justify-center items-center flex-col w-screen h-screen">
      <h1 className="text-3xl font-bold mt-5">Login</h1>
      {/* If Email Already Exists this will show */}
      {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
      <div className="flex justify-center items-center flex-col w-full">
        <form
          className="w-1/3 shadow-md shadow-slate-200 p-5 border-2 rounded-md"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className="mt-2 border-2 border-slate-200 rounded-md pl-2 bg-slate-100"
              type="email"
              placeholder="Example@email.com"
              name="email"
              id="email"
            />
            <label className="mt-5" htmlFor="fullname">
              Password
            </label>
            <input
              className="mt-2 border-2 rounded-md pl-2 pt-1 bg-slate-100"
              type="password"
              placeholder="***********"
              name="password"
              id="password"
            />
            <button
              className="mt-5 border-2 border-slate-200 rounded-md pl-2 bg-black text-white p-1"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading ..." : "Login"}
            </button>
          </div>
        </form>
        <button
          className="mt-3"
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
        >
          Sign in with Google
        </button>
      </div>
      <p className="mt-2">
        Don{"'"}t Have an account? Sign up{" "}
        <Link className="text-blue-500" href={"/auth/register"}>
          here
        </Link>
      </p>
    </div>
  );
}

export default LoginView;
