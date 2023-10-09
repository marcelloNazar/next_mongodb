"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import {
  BsGraphDown,
  BsGraphDownArrow,
  BsGraphUp,
  BsGraphUpArrow,
} from "react-icons/bs";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main className="flex flex-col mx-auto my-auto">
      <div className="flex flex-col items-center">
        <button
          className="flex items-center rounded-full border-2 border-transparent active:border-gray-200 duration-200 "
          onClick={() => setIsOpen(!isOpen)}
        >
          <div>down</div>
          {!isOpen ? <AiOutlineCaretDown /> : <AiOutlineCaretUp />}
        </button>
        {isOpen && (
          <div className="flex absolute justify-end mr-20 mt-12">
            <div className="flex flex-col w-32 h-52 rounded-lg p-2 bg-gray-50 dark:bg-gray-900/80">
              <div className="flex flex-col justify-center h-full gap-4 border-b mb-2">
                <div className="flex justify-center">imagem</div>
                <div className="flex justify-center">Olá, </div>
              </div>
              <button className="hover:text-white" onClick={() => signOut()}>
                Sair
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex w-full p-1 justify-center gap-4 items-center">
        <div className="flex justify-end items-end w-full font-bold text-3xl text-red-600">
          <BsGraphDownArrow />
        </div>

        <label
          htmlFor="toggle-switch"
          className="flex items-center justify-center"
        >
          <input
            type="checkbox"
            id="toggle-switch"
            className="cursor-pointer h-8 w-16 rounded-full appearance-none bg-white bg-opacity-5 border-2 border-red-600 checked:border-green-600 checked:bg-gray-600 transition duration-200 relative"
          />
        </label>

        <div className="flex justify-start items-center w-full font-bold text-3xl text-green-600">
          <BsGraphUpArrow />
        </div>
      </div>
    </main>
  );
}
