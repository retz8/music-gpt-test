import AppIntro from "@/components/Home/AppIntro";
import AppTitle from "@/components/Home/AppTitle";
import ChatBox from "@/components/Home/ChatBox";
import ConversationAndChatbox from "@/components/Home/ConversationAndChatbox";
import ExamplesBox from "@/components/Home/ExamplesBox";
import LimitationsBox from "@/components/Home/LimitationsBox";
import WelcomeSection from "@/components/Home/WelcomeSection";
import React from "react";

// Chatbox Conversation UI 만들기 전엔 아래 코드로

// export default async function HomePage() {
//   return (
//     <section
//       className="w-full h-full
//     flex flex-col justify-between items-center py-10"
//     >
//       <div
//         className="flex flex-col items-center
//       px-2 md:px-0 mt-4 md:mt-20 gap-5"
//       >
//         <AppTitle />

//         <AppIntro />

//         <ExamplesBox />

//         <LimitationsBox />
//       </div>

//       <div className="w-full">
//         <ChatBox />
//       </div>
//     </section>
//   );
// }

// ----------------------------------------------------------------------
// Chatbox Conversation UI를 만들땐 이 코드로
export default async function HomePage() {
  return (
    <section
      className="w-full h-full
    flex flex-col justify-between items-center"
    >
      <div className="w-full max-w-screen-xl">
        <WelcomeSection />
      </div>

      {/* 스타일링 이전 */}
      {/* <div className="w-full grow bg-yellow-300">
      <ConversationAndChatbox />
      </div> */}

      <ConversationAndChatbox />
    </section>
  );
}
