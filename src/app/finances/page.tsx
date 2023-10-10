"use client";
import useSWR from "swr";
import { signOut, useSession } from "next-auth/react";
import { fetchFinanceOnClient } from "../../utils/api";
import { IFinance } from "@/interfaces/Post";
import { useRouter } from "next/navigation";
import FinanceForm from "@/componets/forms/FinanceForm";
import Spinner from "@/componets/Spinner";
import { BsGraphDownArrow, BsGraphUpArrow, BsListUl } from "react-icons/bs";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useFinance } from "@/context/FinanceContext";
import Input from "@/componets/Input";
import ToggleSwitch from "@/componets/ToggleSwitch";

export default function Dashboard({ params }: any) {
  const {
    finance,
    setFinance,
    loading,
    setLoading,
    year,
    setYear,
    month,
    setMonth,
    day,
    setDay,
    category,
    setCategory,
    tipo,
    setTipo,
    ordenacao,
    setOrdenacao,
  } = useFinance();
  const session = useSession();
  console.log(session);

  const username = session.data?.user?.name;

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
  let apiUrl = `http://localhost:3000/api/finances?username=${username}`;

  if (year && year !== "") {
    apiUrl += `&year=${year}`;
  }

  if (month && month !== "") {
    apiUrl += `&month=${month}`;
  }

  if (day && day !== "") {
    apiUrl += `&day=${day}`;
  }

  const { data, mutate, error, isLoading } = useSWR(apiUrl, fetcher);

  function numberToString(number?: number) {
    const string = number?.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
    return string;
  }
  function converterDataParaDDMMYY(data: string): string {
    const partes = data.split("-"); // Divide a string nos hífens
    if (partes.length === 3) {
      const ano = partes[0].substring(2); // Pega os dois últimos dígitos do ano
      const mes = partes[1];
      const dia = partes[2];
      return `${dia}/${mes}/${ano}`;
    } else {
      throw new Error("Formato de data inválido. Use o formato AAAA-MM-DD.");
    }
  }

  const router = useRouter();
  console.log(data);

  const handleSubmit = async (data: Partial<IFinance>) => {
    setLoading(true);
    try {
      await fetch("api/finances", {
        method: "POST",
        body: JSON.stringify({
          title: data.title,
          value: data.value,
          tipo: data.tipo,
          category: data.category,
          date: data.date,
          username: session.data!.user!.name,
        }),
      });
      setLoading(false);
      mutate();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (data: Partial<IFinance>) => {
    setLoading(true);
    try {
      await fetch(`/api/finances/${finance!._id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: data.title,
          value: data.value,
          tipo: data.tipo,
          category: data.category,
          date: data.date,
          username: session.data!.user!.name,
        }),
      });
      setLoading(false);
      mutate();
    } catch {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    setFinance(null);
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
    return (
      <div role="status" className="h-full flex justify-center items-center">
        <svg
          aria-hidden="true"
          className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }
  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  if (session.status === "authenticated") {
    return (
      <div className="page-container h-[93%] ">
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
                  Data
                </th>
                <th scope="col" className="px-6 py-3 dark:bg-gray-900/20">
                  Categoria
                </th>
                <th
                  scope="col"
                  className="px-6 py-3  bg-gray-50 dark:bg-gray-800/50"
                >
                  Valor
                </th>
                <th scope="col" className="px-6 py-3  w-8">
                  Editar
                </th>
              </tr>
            </thead>
            <tbody>
              {data
                ?.filter((finance: IFinance) =>
                  finance.category
                    .toLowerCase()
                    .includes(category.toLowerCase())
                )
                .filter(
                  (finance: IFinance) => tipo === null || finance.tipo === tipo
                )
                .sort((a: IFinance, b: IFinance) => {
                  if (ordenacao === "valorCrescente") {
                    // Ordene pelo valor de forma crescente
                    return a.value - b.value;
                  } else if (ordenacao === "valorDecrescente") {
                    // Ordene pelo valor de forma decrescente
                    return b.value - a.value;
                  } else {
                    // Por padrão, ordene pela data de forma crescente
                    return a.date.localeCompare(b.date);
                  }
                })
                .map((teste: IFinance) => (
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
                      {converterDataParaDDMMYY(teste.date)}
                    </td>
                    <td className="px-6 py-4">{teste.category}</td>
                    <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800/40">
                      R$ {numberToString(teste.value)}
                    </td>
                    <td className="px-6 py-4 ">
                      <div className="flex justify-center w-full font-bold text-xl gap-1">
                        <button
                          className=" hover:text-indigo-600"
                          onClick={() => setFinance(teste)}
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
        <div className="flex flex-row lg:flex-col h-[25%] lg:h-[100%] gap-2 w-full lg:w-1/3">
          {" "}
          <div
            onClick={() => setFinance(null)}
            className="flex text-xs justify-start p-2 pt-3 gap-1 items-center flex-col w-[27%] lg:w-full bg-gray-50 dark:bg-gray-800/40 shadow-md rounded-tl-lg lg:rounded-tl-none  lg:rounded-tr-lg"
          >
            <p className="font-semibold">ORDEM / FILTRO</p>
            <div className="flex w-full gap-1 my-0.5">
              <button
                className="black-button flex items-center justify-center "
                onClick={() => setOrdenacao("valorDecrescente")}
              >
                Decresc.
              </button>
              <button
                className="black-button flex items-center justify-center "
                onClick={() => setOrdenacao("valorCrescente")}
              >
                Cresc.
              </button>
              <button
                className="black-button flex  items-center justify-center ordenacao === 'dataCrescente' ? 'dark:bg-blue-600 text-white' : ''"
                onClick={() => setOrdenacao("dataCrescente")}
              >
                Data
              </button>
            </div>
            <div className="flex w-full gap-1">
              <select
                className="input"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="2023">2023</option>
              </select>
              <select
                className="input"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="">Nenhum</option>
                <option value="01">Janeiro</option>
                <option value="02">Fevereiro</option>
                <option value="03">Março</option>
                <option value="04">Abril</option>
                <option value="05">Maio</option>
                <option value="06">Junho</option>
                <option value="07">Julho</option>
                <option value="08">Agosto</option>
                <option value="09">Setembro</option>
                <option value="10">Outubro</option>
                <option value="11">Novembro</option>
                <option value="12">Dezembro</option>
              </select>
            </div>
            <div className="flex w-full gap-1 my-0.5">
              <button
                className="black-button flex text-blue-600 items-center justify-center text-xl font-extrabold"
                onClick={() => setTipo(null)}
              >
                <BsListUl />
              </button>
              <button
                className="black-button flex text-green-600 items-center justify-center text-xl font-extrabold"
                onClick={() => setTipo(true)}
              >
                <BsGraphUpArrow />
              </button>
              <button
                className="black-button flex text-red-600 items-center justify-center text-xl font-extrabold"
                onClick={() => setTipo(false)}
              >
                <BsGraphDownArrow />
              </button>
            </div>
            <div className="w-full">
              <select
                className="input"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" className="dark:text-gray-600">
                  Categoria
                </option>

                <>
                  <option value="Salario">Salario</option>
                  <option value="Freelancer">Freelancer</option>
                </>

                <>
                  {" "}
                  <option value="Alimentação">Alimentação</option>
                  <option value="Gasolina">Gasolina</option>
                </>
              </select>
            </div>
          </div>
          <div className="flex w-5/12">
            {finance ? (
              <FinanceForm
                formSubmit={handleUpdate}
                data={finance}
                nameButton="Editar"
              />
            ) : (
              <FinanceForm formSubmit={handleSubmit} nameButton="Adicionar" />
            )}
          </div>
          <div className="flex flex-col h-3/12 lg:h-1/4 lg:w-full mr-0.5">
            <div className="flex justify-between p-4 items-center w-full h-1/3 bg-gray-50 dark:bg-gray-800/40 shadow-md rounded-tr-lg lg:rounded-none">
              <h1>Receitas:</h1>
              <h1>R$ {numberToString(totalEntradas)}</h1>
            </div>

            <div className="flex justify-between p-4 items-center w-full h-1/3 shadow-md">
              <h1>Despesas:</h1>
              <h1>R$ {numberToString(totalSaidas)}</h1>
            </div>
            <div className="flex justify-between p-4 items-center w-full h-1/3 bg-gray-50 dark:bg-gray-800/40 shadow-md lg:rounded-br-lg">
              <h1>Saldo:</h1>
              <h1>R$ {numberToString(totalEntradas - totalSaidas)}</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
