import { db } from "@/configs/firebase";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

type Props = {
  id: string;
};

export default function ChatRow({ id }: Props) {
  // 1. 필요한 const 다 선언
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  // 2.
  // read data from firestore using query with orderBy -> user email로 chats을 긁어오고 messages까지 다 긁어옴
  // createdAt을 기준으로 정렬
  const [messages] = useCollection(
    query(
      collection(db, "users", session?.user?.email!, "chats", id, "messages"),
      orderBy("createdAt", "asc")
    )
  );

  // 3. Active ChatRow 판별
  useEffect(() => {
    if (!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname]);

  // 4. delete chat
  const removeChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  };

  return (
    <Link href={`/chat/${id}`}>
      <p className="flex-1 hidden md:inline-flex truncate">
        {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
      </p>
      {/* icon 들 추가해야됨, 특히 쓰레기 통 추가해서 delete 기능 */}
    </Link>
  );
}
