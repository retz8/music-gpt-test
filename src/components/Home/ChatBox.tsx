"use client";

import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import ChatBoxSubmitIcon from "../ui/ChatBoxSubmitIcon";

type Props = {
  message: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  handleKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
};

// 처음엔 Props 추가하지말것
export default function ChatBox({
  message,
  handleInputChange,
  handleSubmit,
  handleKeyPress,
}: Props) {
  return (
    <div className="w-7/12 min-w-[300px] mx-auto p-4 border rounded-xl flex">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        className="flex-grow focus:outline-none"
      />
      <button
        onClick={handleSubmit}
        className={`ml-3 ${
          message?.trim() === ""
            ? "text-gray-400 cursor-default"
            : "text-yellow-500 cursor-pointer"
        }`}
        disabled={message?.trim() === ""}
      >
        <ChatBoxSubmitIcon />
      </button>
    </div>
  );
}
