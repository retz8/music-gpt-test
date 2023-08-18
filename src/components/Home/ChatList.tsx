import { SingleChatType } from "@/types/ConversationTypes";
import React from "react";

type Props = {
  chatMessages: SingleChatType[];
};

export default function ChatList({ chatMessages }: Props) {
  return (
    <div className="flex flex-col">
      {chatMessages.map(({ user, ai }, index) => (
        <div key={`index ${user}`} className="flex flex-col">
          <p>{user}</p>
          <p>{ai}</p>
        </div>
      ))}
    </div>
  );
}
