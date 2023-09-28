"use client";
import { signOut, useSession } from "next-auth/react";
import { fetchOnClient } from "../../utils/api";
import { IPost } from "@/interfaces/Post";
import { useRouter } from "next/navigation";
import Header from "@/componets/Header";

export default function Dashboard({ params }: any) {
  const session = useSession();
  console.log(session);

  const username = session.data?.user?.name;

  const { data, error, isLoading, mutate } = fetchOnClient(String(username));

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;

    try {
      await fetch("api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          img: "teste",
          content: "teste",
          username: session.data!.user!.name,
        }),
      });
      mutate();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch {
      console.log(error);
    }
  };

  if (session.status === "loading") {
    return (
      <div>
        <div className="block p-4 m-auto bg-white rounded-lg shadow w-72">
          <div className="w-full h-2 bg-gray-400 rounded-full mt-3">
            <div className="w-3/4 h-full text-center text-xs text-white bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }
  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  if (session.status === "authenticated") {
    return (
      <div className="flex justify-center items-center pt-10 h-screen w-full">
        <div className="flex flex-col">
          {session.status === "authenticated" && (
            <button className="btn" onClick={() => signOut()}>
              logout
            </button>
          )}
          {data?.map((teste: IPost) => (
            <div className="flex flex-col" key={teste._id}>
              <span onClick={() => handleDelete(teste._id)}>X</span>
              <h2>{teste.title}</h2>
              <h2>{teste.desc}</h2>
            </div>
          ))}
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <h2>Add</h2>
          <input
            type="text"
            placeholder="Title"
            className="mr-1 mb-1 px-4 py-1 border w-full rounded bg-white text-black outline-none focus:border-2 focus:border-gray-900"
          />
          <input
            type="text"
            placeholder="Desc"
            className="mr-1 mb-1 px-4 py-1 border w-full rounded bg-white text-black outline-none focus:border-2 focus:border-gray-900"
          />
          <button className="btn">Send</button>
        </form>
      </div>
    );
  }
}
