import { AuthProvider } from "@/componets/providers/AuthProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Lora, Nunito } from "next/font/google";
import Header from "@/componets/Header";
import { FinanceProvider } from "@/context/FinanceContext";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700"],
  variable: "--font-lora",
});
const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Teste Next 13.5",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <FinanceProvider>
          <body
            className={`${lora.variable}${nunito.variable} overflow-y-hidden bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-400 `}
          >
            <div className="max-w-6xl px-2 h-screen mx-auto flex flex-col justify-between">
              <Header />
              {children}
            </div>
          </body>
        </FinanceProvider>
      </AuthProvider>
    </html>
  );
}
