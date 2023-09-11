import React from "react";

type Props = {
  type: "user" | "ai";
  text: string;
};

export default function ChatListItem({ type, text }: Props) {
  return (
    <div className="flex py-2">
      {type === "user" ? <p>user:</p> : <p>ai:</p>}

      <p>{text}</p>
    </div>
  );
}
