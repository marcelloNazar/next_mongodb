"use client";
import useSWR from "swr";
import { signOut, useSession } from "next-auth/react";
import { fetchFinanceOnClient } from "../../utils/api";
import { IFinance } from "@/interfaces/Post";
import { useRouter } from "next/navigation";
import FinanceForm from "@/componets/forms/FinanceForm";

export default function Dashboard({ params }: any) {
  const session = useSession();
  console.log(session);

  const username = session.data?.user?.name;

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `http://localhost:3000/api/finances?username=${username}`,
    fetcher
  );

  const router = useRouter();

  const handleSubmit = async (data: Partial<IFinance>) => {
    const title = data.title;
    const value = data.value;
    const tipo = data.tipo ? true : false;
    const category = data.category;

    try {
      await fetch("api/finances", {
        method: "POST",
        body: JSON.stringify({
          title,
          value,
          type: tipo,
          category,
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
      await fetch(`/api/finances/${id}`, {
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
      <div className="page-container">
        <div className="list-container">
          {data?.map((teste: IFinance) => (
            <div
              className="flex w-full justify-between items-center border-b"
              key={teste._id}
            >
              <div className="item-data w-5/12">{teste.title}</div>
              <div className="item-data w-3/12">{teste.category}</div>
              <div className="item-data w-2/12">{teste.value}</div>
              <div className="item-data w-1/12">
                {teste.tipo ? "entrada" : "saida"}
              </div>
              <div className="item-data w-1/12">
                <div>editar</div>
                <span onClick={() => handleDelete(teste._id)}>X</span>
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/3">
          <FinanceForm formSubmit={handleSubmit} />
        </div>
      </div>
    );
  }
}
