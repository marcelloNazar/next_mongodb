"use client";
import { IFinance } from "@/interfaces/Post";
import React, { createContext, ReactNode, useState } from "react";

interface FinanceContextType {
  finance: IFinance | null;
  setFinance: (finance: IFinance | null) => void;
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
  year: string;
  setYear: (year: string) => void;
  month: string;
  setMonth: (month: string) => void;
  day: string;
  setDay: (day: string) => void;
}

interface Props {
  children: ReactNode;
}

export const FinanceContext = createContext<FinanceContextType>({
  finance: null,
  setFinance: () => {},
  loading: false,
  setLoading: () => {},
  year: "", // Valor inicial do estado year
  setYear: () => {}, // Função para atualizar year
  month: "", // Valor inicial do estado month
  setMonth: () => {}, // Função para atualizar month
  day: "", // Valor inicial do estado day
  setDay: () => {}, // Função para atualizar day
});

export const FinanceProvider: React.FC<Props> = ({ children }) => {
  const [finance, setFinance] = useState<IFinance | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");

  const [year, setYear] = useState<string>(currentYear);
  const [month, setMonth] = useState<string>(currentMonth);
  const [day, setDay] = useState<string>("");

  return (
    <FinanceContext.Provider
      value={{
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
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = React.useContext(FinanceContext);
  if (context === undefined) {
    throw new Error("useAtendimento must be used within a AtendimentoProvider");
  }
  return context;
};

export default FinanceContext;