"use client";

// When isConversationStarted is true, WelcomeSection is hidden

import React from "react";
import AppTitle from "./AppTitle";
import AppIntro from "./AppIntro";
import ExamplesBox from "./ExamplesBox";
import LimitationsBox from "./LimitationsBox";
import { useConversationContext } from "@/contexts/ConversationProvider";

export default function WelcomeSection() {
  const { isConversationStarted } = useConversationContext();

  if (isConversationStarted) {
    return <></>;
  }

  return (
    // 처음에 ㄴ이렇게, 나중에 conversationAndChatbox styling 할때
    // <>
    //   <AppTitle />

    //   <AppIntro />

    //   <ExamplesBox />

    //   <LimitationsBox />
    // </>

    <div
      className="pt-10 flex flex-col items-center
px-2 md:px-0 mt-4 md:mt-20 gap-5"
    >
      <AppTitle />

      <AppIntro />

      <ExamplesBox />

      <LimitationsBox />
    </div>
  );
}
