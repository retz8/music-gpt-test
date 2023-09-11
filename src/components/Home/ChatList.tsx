import { SingleChatType } from "@/types/ConversationTypes";
import React from "react";
import ChatListItem from "./ChatListItem";

type Props = {
  chatMessages: SingleChatType[];
};

export default function ChatList({ chatMessages }: Props) {
  return (
    <div className="flex flex-col">
      {chatMessages.map(({ user, ai }, index) => (
        <div key={`index ${user}`} className="flex flex-col">
          <ChatListItem type="user" text={user} />
          <ChatListItem type="ai" text={ai} />
        </div>
      ))}
    </div>
  );
}
