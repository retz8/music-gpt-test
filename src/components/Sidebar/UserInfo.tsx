// user profile image + user name
import React from "react";
import GuestProfilePic from "/public/mock/defaultProfilePic.jpeg";
import Image from "next/image";

export default function UserInfo() {
  return (
    <div
      className="flex items-center justify-center px-4 py-2
    border border-slate-200 rounded-2xl shadow-lg"
    >
      <div className="flex w-8 h-8">
        <Image
          className="object-cover rounded-full"
          src={GuestProfilePic}
          width={800}
          height={800}
          alt="User Profile Pic"
        />
      </div>
      <p className="text-lg ml-4">Guest</p>
    </div>
  );
}
