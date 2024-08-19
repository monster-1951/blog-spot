"use client";
import { BsThreeDots } from "react-icons/bs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import  EditProfileAlert from "./EditProfileAlert";


const ProfileHeader = () => {
  const { data: session } = useSession();
  const User = session?.user;
  return (
    <nav className="p-3 px-10 sm:px-5 border-b-2 flex justify-between w-full h-20">
      <span> @{User?.UserName}</span>
      <span className="">
       <EditProfileAlert/>
      </span>
    </nav>
  );
};

export default ProfileHeader;
