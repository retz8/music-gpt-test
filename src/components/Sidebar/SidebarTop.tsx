// App Title + close button
import React from "react";
import MusicIcon from "../ui/MusicIcon";
import LeftCloseIcon from "../ui/LeftCloseIcon";
import RightOpenIcon from "../ui/RightOpenIcon";

type Props = {
  isVisible: boolean;
  onClick: () => void;
};

export default function SidebarTop({ isVisible, onClick }: Props) {
  return (
    <div className="flex justify-between items-center py-4 px-2">
      <div className="flex justify-center">
        <MusicIcon />
        <p className="ml-3 font-semibold text-2xl">MusicGPT</p>
      </div>

      {isVisible && (
        <button onClick={onClick}>
          <LeftCloseIcon />
        </button>
      )}
    </div>
  );
}
