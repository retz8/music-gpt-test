import React from "react";
import { FaMusic } from "react-icons/fa";

type Props = {
  size?: "small" | "large";
};

export default function MusicIcon({ size = "small" }: Props) {
  return (
    <FaMusic
      className={`${size === "small" ? "w-5 h-5" : "w-8 h-8"} fill-black`}
    />
  );
}
