import React from "react";

const introText = `Welcome to MusicGPT! Ask anything about music history and theory!`;

export default function AppIntro() {
  return (
    <div className="flex max-w-md">
      <p className="text-center text-base">{introText}</p>
    </div>
  );
}
