"use client";

/**
 * ConversationAndChatbox Component
 * - recieves user message
 * - call API route to get response from model
 * - display response
 */

import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import ChatBox from "./ChatBox";
import { useConversationContext } from "@/contexts/ConversationProvider";
import ConversationHeader from "./ConversationHeader";
import { SingleChatType } from "@/types/ConversationTypes";
import ChatList from "./ChatList";

export default function ConversationAndChatbox() {
  const { isConversationStarted, setIsConversationStarted } =
    useConversationContext();
  const [message, setMessage] = useState<string>(""); // State to store the typed message
  const [loading, setLoading] = useState<boolean>(false);
  // 맨 나중에 추가
  const [chatMessages, setChatMessages] = useState<SingleChatType[]>([]); // State to store the typed message

  // For better UX, store chat histories with separate states.
  const [userQueries, setUserQueries] = useState<string[]>([]);
  const [aiResponses, setAiResponses] = useState<string[]>([]);

  const [history, setHistory] = useState<SingleChatType[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const sendQuery = async () => {
    if (!message) return "No Query Recieved";
    setLoading(true);
    try {
      const history = [...userQueries];

      const result = await fetch("/api/ask", {
        method: "POST",
        body: JSON.stringify({ question: message, history: history }),
      });
      const json = await result.json();
      setLoading(false);

      return json.answer;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (message.trim() !== "") {
      // Handle submitting the message (you can implement this part)
      console.log("Submitted:", message);

      if (isConversationStarted === false) {
        const newIsConversationStarted = true;
        setIsConversationStarted(newIsConversationStarted);
      }

      setUserQueries([...userQueries, message]); // update user queries array with new query

      console.log("asking...");
      // await sendQuery();
      const response = await sendQuery();

      console.log("AI Response:", response);
      setAiResponses([...aiResponses, response]); // update AI responses array with new response

      // Clear the input field
      setMessage("");
    }
  };

  // Enter Key Submit
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && message.trim() !== "") {
      handleSubmit();
    }
  };

  // const fakeFlag = false;

  return (
    // 맨 위 div 는 스타일링할때 추가한것
    <div className={`w-full ${isConversationStarted && "grow"}`}>
      <div className="relative w-full flex flex-col h-full justify-between">
        {isConversationStarted && (
          <div className="flex flex-col">
            <div className="sticky top-0 z-20">
              <ConversationHeader />
            </div>

            <div
              className="max-w-screen-xl w-full mx-auto 
            h-[1500px] mb-10"
            >
              <ChatList
                userQueries={userQueries}
                aiResponses={aiResponses}
                loading={loading}
              />
              {/* <ChatList
                userMessage={message}
                aiMessage={response}
                loading={loading}
              /> */}
            </div>
          </div>
        )}

        <div className={`sticky bottom-0 flex pb-10`}>
          <ChatBox
            message={message}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleKeyPress={handleKeyPress}
          />
        </div>
      </div>
    </div>
  );
}

// 유저가 채팅을 입력하면 바로 UI를 보여줘야함.
// 유저의 메세지 + AI 로딩
// query가 끝나면 AI 메세지를 보여줘야함.
