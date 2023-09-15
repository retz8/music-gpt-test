"use client";

import React from "react";

export default function TmpButton() {
  const handleOnClick = async () => {
    try {
      const result = await fetch("/api/setup", {
        method: "POST",
      });
      const json = await result.json();
      console.log("result: ", json);
    } catch (err) {
      console.log("error: ", err);
    }
  };
  return <button onClick={handleOnClick}>클릭</button>;
}
