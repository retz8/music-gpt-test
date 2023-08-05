// user profile image + user name
import React from "react";
import GuestProfilePic from "/public/mock/defaultProfilePic.jpeg";
import Image from "next/image";

export default function UserInfo() {
  return (
    <div
      className="flex items-center justify-center px-4 py-2
    border-2 border-slate-300 rounded-2xl shadow-lg"
    >
      <div className="flex w-12 h-12">
        <Image
          className="object-cover rounded-full"
          src={GuestProfilePic}
          width={500}
          height={500}
          alt="User Profile Pic"
        />
      </div>
      <p className="text-xl ml-4">Guest</p>
    </div>
  );
}
