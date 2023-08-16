import React from "react";

const examples = [
  "May include incorrect information",
  "Be careful at hallucination",
];

export default function LimitationsBox() {
  return (
    <div
      className="w-80 md:w-96 flex flex-col py-5 px-6
        border border-gray-300 rounded-3xl"
    >
      <p>Limitations:</p>

      <div className="ml-10 flex flex-col justify-center">
        {examples.map((example, index) => (
          <div key={index} className="flex items-start text-black/70">
            <p>{example}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
