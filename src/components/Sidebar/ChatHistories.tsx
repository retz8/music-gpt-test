import React from "react";
import ChatRow from "./ChatRow";
import { QuerySnapshot } from "firebase/firestore";

type Props = {
  chats: QuerySnapshot | undefined;
};

export default function ChatHistories({ chats }: Props) {
  return (
    <div className="h-full flex items-center justify-center">
      <p className="text-lg">Chat Histories...</p>
      {chats?.docs.map((chat) => (
        <ChatRow key={chat.id} id={chat.id} />
      ))}
    </div>
  );
}
