"use client";
import { signOut, useSession } from "next-auth/react";
import { fetchOnClient } from "../../utils/api";
import { IPost } from "@/interfaces/Post";
import { useRouter } from "next/navigation";

export default function Dashboard({ params }: any) {
  const session = useSession();
  console.log(session);

  const username = session.data?.user?.name

  const { data, error, isLoading, mutate } = fetchOnClient(String(username));

  const router = useRouter();

  if (session.status === "loading") {
    return <p>Carregando</p>;
  }
  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  if (session.status === "authenticated") {
    return (
      <div className="flex flex-col justify-center items-center">
        {data?.map((teste: IPost) => (
          <div key={teste._id}>
            <h2>{teste.title}</h2>
            <h2>{teste.desc}</h2>
          </div>
        ))}
        {session.status === "authenticated" && (
          <button className="btn" onClick={() => signOut()}>
            logout
          </button>
        )}
      </div>
    );
  }
}
