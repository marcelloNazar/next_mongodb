import {
  BsGraphDown,
  BsGraphDownArrow,
  BsGraphUp,
  BsGraphUpArrow,
} from "react-icons/bs";

export default function Home() {
  return (
    <main className="container mx-auto my-auto">
      <div className="flex w-full p-1 justify-center gap-4 items-center">
        <div className="flex justify-end items-end w-full font-semibold text-3xl bg-white text-red-600">
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

        <div className="flex justify-start items-center bg-white w-full text-3xl text-green-600">
          <BsGraphUpArrow />
        </div>
      </div>
    </main>
  );
}
