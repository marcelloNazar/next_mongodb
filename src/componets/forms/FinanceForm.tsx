"use client";
import { useState, useEffect } from "react";
import { IFinance } from "@/interfaces/Post";
import { FinanceResolver } from "@/utils/validators";
import { useForm } from "react-hook-form";
import Input from "../Input";

type FinanceFormProps = {
  data?: Partial<IFinance>;
  formSubmit: (data: Partial<IFinance>) => void;
};

//Formulario para cadastro de animais
const FinanceForm: React.FC<FinanceFormProps> = ({ data = {}, formSubmit }) => {
  function numberToString(number?: number) {
    const string = number?.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
    return string;
  }
  function letrasMaiusculas(str: string) {
    return str.toUpperCase();
  }

  const formMethods = useForm<IFinance>({ resolver: FinanceResolver as any });
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    watch,
  } = formMethods;

  const title = watch("title");
  const category = watch("category");
  const [valor, setValor] = useState(
    data.value ? data.value.toString().replace(".", ",") : ""
  );
  const [tipo, setTipo] = useState(data.tipo || false);

  const handleSetData = (data: Partial<IFinance>) => {
    setValue("title", data.title || "");
    setValue("category", data.category || "");
    setValor(numberToString(data.value) || "");
    setValue("tipo", data.tipo || false);
  };

  useEffect(() => {
    setValue("title", letrasMaiusculas(title || ""));
  }, [title]);

  useEffect(() => {
    handleSetData(data);
  }, []);

  const submitForm = (values: IFinance) => {
    formSubmit({
      title,
      category,
      tipo,
      value: Number(valor.replace(",", ".")),
    });
  };

  const handleValorChange = (inputValor: string) => {
    const decimalPart = inputValor.split(",")[1];

    if (
      inputValor === "" ||
      (!isNaN(Number(inputValor.replace(",", "."))) &&
        (!decimalPart || decimalPart.length <= 2))
    ) {
      setValor(inputValor);
    }
  };

  return (
    <div className="modal-container justify-between">
      <form onSubmit={handleSubmit(submitForm)} className="body-modal">
        <Input
          type="text"
          {...register("title")}
          placeholder="Titulo"
          error={errors?.title?.message}
        />

        <Input
          type="text"
          {...register("value")}
          placeholder="Valor"
          value={valor}
          onChange={(e) => handleValorChange(e.target.value)}
          error={errors?.value?.message}
        />
        <div className="w-full px-1">
          <select className="input" {...register("category")}>
            <option value="" className="dark:text-gray-600">
              Categoria
            </option>
            <option value="Alimentação">Alimentação</option>
            <option value="Gasolina">Gasolina</option>
          </select>
          {errors?.category?.message && (
            <p className="text-xs text-red-600">{errors?.category?.message}</p>
          )}
        </div>
        <div className="w-full p-1">
          <label className="flex items-center justify-center">
            <input
              {...register("tipo")}
              type="checkbox"
              className="form-checkbox h-5 w-5 text-gray-600"
              onChange={()=> setTipo(tipo!)}
            />
            <span className="ml-2 text-gray-700">Castrado</span>
          </label>
        </div>
        <button
          onClick={handleSubmit(submitForm)}
          type="submit"
          className="btn"
        >
          Adicionar
        </button>
      </form>
    </div>
  );
};

export default FinanceForm;
