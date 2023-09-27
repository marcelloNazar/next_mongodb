"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      res.status === 201 &&
        router.push("/login?success=Account has been created");
    } catch (err: any) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Create an Account</h1>
      <h2>Please sign up to see the dashboard.</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <input
          type="text"
          placeholder="Username"
          required
          className="mr-1 mb-1 px-4 py-1 border w-full rounded bg-white text-black outline-none focus:border-2 focus:border-gray-900"
        />
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
        <button className="btn">Register</button>
        {error && "Something went wrong!"}
      </form>
      <span>- OR -</span>
      <Link className="btn" href="/login">
        Login with an existing account
      </Link>
    </div>
  );
};

export default Register;
