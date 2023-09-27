"use client";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const Login = ({ url }: any) => {
  const session = useSession();
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", {
      email,
      password,
    });
  };

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <input
          type="text"
          placeholder="Email"
          required
          className="mr-1 mb-1 px-4 py-1 border w-full rounded bg-white text-black outline-none focus:border-2 focus:border-gray-900"
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="mr-1 mb-1 px-4 py-1 border w-full rounded bg-white text-black outline-none focus:border-2 focus:border-gray-900"
        />
        <button className="btn">Login</button>
      </form>
      <button
        onClick={() => {
          signIn("google");
        }}
        className="btn"
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;
