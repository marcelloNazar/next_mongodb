"use client";
import useSWR from "swr";
import { signOut, useSession } from "next-auth/react";
import { fetchFinanceOnClient } from "../../utils/api";
import { IFinance } from "@/interfaces/Post";
import { useRouter } from "next/navigation";
import FinanceForm from "@/componets/forms/FinanceForm";
import Spinner from "@/componets/Spinner";
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

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

  function numberToString(number?: number) {
    const string = number?.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
    return string;
  }

  const router = useRouter();
  console.log(data);

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
          tipo: tipo,
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

  let totalEntradas = 0;
  let totalSaidas = 0;

  data?.forEach((teste: IFinance) => {
    if (teste.tipo) {
      // Se for uma entrada (teste.tipo === true), adicione ao total de entradas
      totalEntradas += teste.value;
    } else {
      // Se for uma saída (teste.tipo === false), adicione ao total de saídas
      totalSaidas += teste.value;
    }
  });

  if (session.status === "loading") {
    return <Spinner />;
  }
  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  if (session.status === "authenticated") {
    return (
      <div className="page-container max-h-full">
        <div className="w-full h-full relative overflow-x-hidden shadow-md sm:rounded-lg">
          <table className="w-full h-full text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50"
                >
                  Titulo
                </th>
                <th scope="col" className="px-6 py-3 w-12 dark:bg-gray-900/20">
                  Tipo
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50"
                >
                  Categoria
                </th>
                <th scope="col" className="px-6 py-3 dark:bg-gray-900/20">
                  Valor
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50 w-12"
                >
                  Editar
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((teste: IFinance) => (
                <tr
                  key={teste._id}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800/40"
                  >
                    {teste.title.length > 27
                      ? teste.title.substring(0, 27) + "..."
                      : teste.title}
                  </th>
                  <td className="px-6 py-4 justify-center">
                    {teste.tipo ? (
                      <div className="flex justify-center w-full font-bold text-xl text-green-600">
                        <BsGraphUpArrow />
                      </div>
                    ) : (
                      <div className="flex justify-center w-full font-bold text-xl text-red-600">
                        <BsGraphDownArrow />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800/40">
                    {teste.category}
                  </td>
                  <td className="px-6 py-4">
                    R$ {numberToString(teste.value)}
                  </td>
                  <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800/40">
                    <div className="flex justify-center w-full font-bold text-xl gap-1">
                      <button
                        className=" hover:text-indigo-600"
                        onClick={() => handleDelete(teste._id)}
                      >
                        <AiFillEdit />
                      </button>
                      <button
                        className=" hover:text-red-600"
                        onClick={() => handleDelete(teste._id)}
                      >
                        <AiFillDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="h-full rounded-md">
              <tr className="font-semibold text-gray-900 dark:text-white">
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800/40"></th>
                <td className="px-6 py-3"></td>
                <td className="px-6 py-3 bg-gray-50 dark:bg-gray-800/40"></td>
                <td className="px-6 py-3"></td>
                <td className="px-6 py-3 bg-gray-50 dark:bg-gray-800/40"></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="flex flex-col h-full gap-2 w-1/3">
          <div className="flex flex-col h-full w-full gap-2">
            <div className="flex justify-center items-center flex-col w-full h-1/4 bg-green-500 dark:bg-gray-800/40 shadow-md rounded-lg"></div>

            <div className="flex justify-start p-4 items-start flex-col w-full h-1/4 bg-green-500 dark:bg-gray-800/40 shadow-md rounded-lg">
              <h1>Total Receitas:</h1>
              <h1>R$ {numberToString(totalEntradas)}</h1>
            </div>

            <div className="flex justify-start p-4 items-start flex-col w-full h-1/4 bg-green-500 dark:bg-gray-800/40 shadow-md rounded-lg">
              <h1>Total Despesas:</h1>
              <h1>R$ {numberToString(totalSaidas)}</h1>
            </div>
            <div className="flex justify-start p-4 items-start flex-col w-full h-1/4 bg-green-500 dark:bg-gray-800/40 shadow-md rounded-lg">
              <h1>Saldo:</h1>
              <h1>R$ {numberToString(totalEntradas - totalSaidas)}</h1>
            </div>
          </div>
          <FinanceForm formSubmit={handleSubmit} />
        </div>
      </div>
    );
  }
}
