import React from "react";
import { ThreeDots } from "react-loader-spinner";

type Props = {
  type: "user" | "ai";
  text: string;
  loading?: boolean;
};

export default function ChatListItem({ type, text, loading = false }: Props) {
  return (
    <div className="flex py-2 items-center">
      {type === "user" ? <p>user:</p> : <p>ai:</p>}

      {loading ? (
        <ThreeDots
          height="40"
          width="40"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      ) : (
        <p>{text}</p>
      )}
    </div>
  );
}
