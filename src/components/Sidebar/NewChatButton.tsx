"use client";

import { db } from "@/configs/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function NewChatButton() {
  const router = useRouter(); // need to move to another screen when the button is pressed
  const { data: session } = useSession();

  const createNewChat = async () => {
    // why async? -> if it's a backend logic (communicating with db) => mostly it's async

    // how to add new data to firebase?
    // 1. by something called "collection" -> collection is like a table in sql
    // 2. by something called "document" -> document is like a row in sql
    // 3. by something called "field" -> field is like a column in sql

    // first argument: collection name, path(field) [users - email - chats]
    // second argument: data to be added

    // ! 키워드는 절대 undefined가 아님을 의미함
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        messages: [],
        userId: session?.user?.email!,
        createAt: serverTimestamp(),
      }
    );

    router.push(`/chat/${doc.id}`); // id is the unique id of the document generate by firebase
    // we need to build out the chat screen with dynamic id -> dynamic routes
  };

  return (
    <div onClick={createNewChat} className="bg-white">
      <button className=" h-2">New Chat</button>
    </div>
  );
}
