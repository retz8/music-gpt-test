import { SingleChatType } from "@/types/ConversationTypes";
import React from "react";
import ChatListItem from "./ChatListItem";

type Props = {
  userQueries: string[];
  aiResponses: string[];
  loading: boolean;
};

export default function ChatList({ userQueries, aiResponses, loading }: Props) {
  const chatLength = userQueries.length;

  return (
    <div className="flex flex-col">
      {userQueries.map((query, index) => (
        <div key={`index ${query} ${index}`} className="flex flex-col">
          <ChatListItem type="user" text={query} />
          {index !== chatLength - 1 ? (
            <ChatListItem type="ai" text={aiResponses[index]} loading={false} />
          ) : (
            <ChatListItem
              type="ai"
              text={aiResponses[index]}
              loading={loading}
            />
          )}
        </div>
      ))}
    </div>
  );
}
