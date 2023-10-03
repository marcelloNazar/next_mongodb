"use client";

import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const links = [
    {
      id: 1,
      title: "Home",
      url: "/",
    },
    {
      id: 2,
      title: "Portfolio",
      url: "/finances",
    },
    {
      id: 3,
      title: "Blog",
      url: "/blog",
    },
    {
      id: 4,
      title: "About",
      url: "/about",
    },
    {
      id: 5,
      title: "Contact",
      url: "/contact",
    },
    {
      id: 6,
      title: "Dashboard",
      url: "/dashboard",
    },
  ];
  const session = useSession();

  return (
    <div className="flex bg-blue-500 w-full h-1/4 justify-between items-center">
      <Link href="/" className="font-bold text-xl">
        Marcello Nazar
      </Link>
      <div className="flex items-center gap-4">
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.url}
            className=""
          >
            {link.title}
          </Link>
        ))}
        {session.status === "authenticated" && (
          <button className="btn" onClick={() => signOut()}>
            logout
          </button>
        )}
      </div>
    </div>
  );
}
