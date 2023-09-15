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
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  // 맨 나중에 추가
  const [chatMessages, setChatMessages] = useState<SingleChatType[]>([]); // State to store the typed message

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const sendQuery = async () => {
    if (!message) return;
    setResponse("");
    setLoading(true);
    try {
      const result = await fetch("/api/ask", {
        method: "POST",
        body: JSON.stringify(message),
      });
      const json = await result.json();
      console.log(json);
      setResponse(json.answer);
      setLoading(false);
      return json.answer;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    // add isConversationStarted logic

    if (message.trim() !== "") {
      // Handle submitting the message (you can implement this part)
      console.log("Submitted:", message);

      if (isConversationStarted === false) {
        const newIsConversationStarted = true;
        setIsConversationStarted(newIsConversationStarted);
      }

      // API call to receive response from LLM
      // For now, use a dummy response
      console.log("asking...");
      // await sendQuery();
      const fakeResponse = await sendQuery();

      const newChatMessage: SingleChatType = {
        user: message,
        ai: fakeResponse,
      };

      setChatMessages([...chatMessages, newChatMessage]);

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
              <ChatList chatMessages={chatMessages} />
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
