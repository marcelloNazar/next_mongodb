"use client";

import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const links = [
    {
      id: 1,
      title: "Home",
      url: "/",
    },
    {
      id: 2,
      title: "Financeiro",
      url: "/finances",
    },

    {
      id: 3,
      title: "Dashboard",
      url: "/dashboard",
    },
  ];
  const session = useSession();
  const username = session.data?.user?.name;
  const imageUrl = session.data?.user?.image;

  return (
    <div className="flex bg-blue-500 w-full py-2 justify-between items-center">
      {session.data?.user ? (
        <Link href="/" className="font-bold text-xl flex gap-2">
          <Image
            className="rounded-lg"
            src={imageUrl!}
            alt="Descrição da imagem"
            width={30} // Largura da imagem em pixels
            height={30} // Altura da imagem em pixels
          />
          {username}
        </Link>
      ) : (
        <>Playgrownd</>
      )}

      <div className="flex items-center gap-4">
        {links.map((link) => (
          <Link key={link.id} href={link.url} className="">
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
