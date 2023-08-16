import "./globals.css";
import type { Metadata } from "next";
import { globalFont } from "@/utils/fonts/globalFont";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "Music GPT",
  description: "AI Chatbot for music theory and history",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={globalFont.className}>
      <body className="flex flex-col md:flex-row">
        <header className="flex md:hidden sticky top-0 z-40">
          <div className="w-full mx-auto">
            <Header />
          </div>
        </header>

        {/* 처음에는 w-80 넣기 */}
        <div className="h-screen hidden md:flex">
          <Sidebar />
        </div>

        <main className="grow overflow-auto z-30">
          <div className="h-full max-w-screen-xl mx-auto">{children}</div>
        </main>
      </body>
    </html>
  );
}
