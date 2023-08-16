import React from "react";

const examples = [
  "Why I need to study music history",
  "How to read sheet music?",
];

export default function ExamplesBox() {
  return (
    <div
      className="w-80 md:w-96 flex flex-col py-5 px-6
        border border-gray-300 rounded-3xl"
    >
      <p>Examples:</p>

      <div className="ml-10 flex flex-col justify-center">
        {examples.map((example, index) => (
          <div key={index} className="flex items-start text-black/70">
            <p>Q.</p>
            <p className="ml-2">{example}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
