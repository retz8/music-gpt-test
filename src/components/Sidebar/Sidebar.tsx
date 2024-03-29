"use client";

import React, { useState } from "react";
import SidebarTop from "./SidebarTop";
import ChatHistories from "./ChatHistories";
import UserInfo from "./UserInfo";
import RightOpenIcon from "../ui/RightOpenIcon";

export default function Sidebar() {
  const [isVisible, setIsVisible] = useState<boolean>(true);

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

          <div className="grow">
            <ChatHistories />
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
