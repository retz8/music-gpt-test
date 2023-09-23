"use client";

import { signIn } from "next-auth/react";
import React from "react";

export default function Login() {
  return (
    <div>
      <button onClick={() => signIn("google")}>Login</button>
    </div>
  );
}
