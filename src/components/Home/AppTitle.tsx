import React from "react";
import MusicIcon from "../ui/MusicIcon";

export default function AppTitle() {
  return (
    <div className="flex items-center">
      <MusicIcon size="large" />
      <p className="ml-5 font-bold text-4xl">MusicGPT</p>
    </div>
  );
}
