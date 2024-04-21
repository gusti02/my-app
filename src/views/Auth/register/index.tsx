import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

// this is ResisterView
const RegisterView = () => {
  // useState for form and handle submit
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();

  // this is handle submit and fetch data
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);
    // fetch data
    const data = {
      email: event.target.email.value,
      fullname: event.target.fullname.value,
      password: event.target.password.value,
    };
    const result = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // if result status is 200, and then set isloading to false and push to login
    if (result.status === 200) {
      event.target.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError(result.status === 400 ? "Email Already Exists" : "");
    }
  };
  return (
    <div className="flex justify-center items-center flex-col w-screen h-screen">
      <h1 className="text-3xl font-bold mt-5">Register</h1>
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
              Fullname
            </label>
            <input
              className="mt-2 border-2 rounded-md pl-2 bg-slate-100"
              type="text"
              placeholder="Jhon Doe"
              name="fullname"
              id="fullname"
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
              {isLoading ? "Loading ..." : "Register"}
            </button>
          </div>
        </form>
      </div>
      <p className="mt-2">
        Have an account? Sign in{" "}
        <Link className="text-blue-500" href={"/auth/login"}>
          here
        </Link>
      </p>
    </div>
  );
};

export default RegisterView;
