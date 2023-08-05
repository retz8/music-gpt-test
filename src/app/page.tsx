import React from "react";

export default async function HomePage() {
  return (
    <section className="w-full flex justify-center">
      <h1>Hello World</h1>
    </section>
  );
}

// async function getData(): Promise<any[]> {
//   const res = await fetch("https://jsonplaceholder.typicode.com/users", {

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

// CSR, SSG, ISR, SSR
// hybrid rendering
// default: SSR

// GET(R) / POST(C) / PUT(U) / DELETE(D) (RESTful API - CRUD)
