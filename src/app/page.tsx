import AppIntro from "@/components/Home/AppIntro";
import AppTitle from "@/components/Home/AppTitle";
import ChatBox from "@/components/Home/ChatBox";
import ExamplesBox from "@/components/Home/ExamplesBox";
import LimitationsBox from "@/components/Home/LimitationsBox";
import React from "react";

export default async function HomePage() {
  return (
    <section
      className="w-full h-full 
    flex flex-col justify-between items-center py-10"
    >
      <div
        className="flex flex-col items-center 
      px-2 md:px-0 mt-4 md:mt-20 gap-5"
      >
        <AppTitle />

        <AppIntro />

        <ExamplesBox />

        <LimitationsBox />
      </div>

      <div className="w-full">
        <ChatBox />
      </div>
    </section>
  );
}
