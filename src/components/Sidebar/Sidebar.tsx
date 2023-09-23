"use client";

import React, { useState } from "react";
import SidebarTop from "./SidebarTop";
import ChatHistories from "./ChatHistories";
import UserInfo from "./UserInfo";
import RightOpenIcon from "../ui/RightOpenIcon";
import NewChatButton from "./NewChatButton";
import { useCollection } from "react-firebase-hooks/firestore";
import { useSession } from "next-auth/react";
import { db } from "@/configs/firebase";
import { collection } from "firebase/firestore";

export default function Sidebar() {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const { data: session } = useSession();
  // read data from firebase cloudstore using react-frebase-hooks
  // use email (from session) to find dataset
  const [chats, loading, error] = useCollection(
    session && collection(db, "users", session.user?.email!, "chats")
  );
  // 나중에 여기에다가 ChatRow.tsxdㅔ서 쓴 query() 덮어씌우기

  const onClickVisibilityIcon = () => {
    const newIsVisible = !isVisible;
    setIsVisible(newIsVisible);
  };

  return (
    <div
      className={`${isVisible ? "w-64" : "w-12"} 
      ease-in-out duration-300 
      h-full flex flex-col items-center border-r-2 
    border-slate-400 z-50 overflow-hidden`}
    >
      {isVisible ? (
        <div className="flex flex-col h-full w-full">
          <div className="p-2">
            <SidebarTop isVisible={isVisible} onClick={onClickVisibilityIcon} />
          </div>

          <div className="">
            <NewChatButton />
          </div>

          <div className="grow">
            <ChatHistories chats={chats} />
          </div>

          <div className="p-2">
            <UserInfo />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-end px-4 py-6">
          <button onClick={onClickVisibilityIcon} className="cursor-pointer">
            <RightOpenIcon />
          </button>
        </div>
      )}
    </div>
  );
}
