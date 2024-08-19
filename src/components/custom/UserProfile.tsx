"use client";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import UserIcon from "./UserIcon";
import Link from "next/link";
import Image from "next/image";



interface menuItem{
  link:string,
  value:string
}



interface UserProfileProps {
  session: boolean;
  id?: string;
  uname?:string,
  menuItems:menuItem[]
}




const UserProfile = ({ id, session,uname ,menuItems}: UserProfileProps) => {
  const [dp, setdp] = useState("");
  const getUser = async () => {
    const response = await axios
      .get(`/api/getCurrentUser/${id}`)
      .then((res) => res.data.user?.ProfilePicture);
    setdp(response);
  };

  useEffect(() => {
    if (session) getUser();
  });
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          {session && dp ? (
            <Image
              src={dp}
              alt="dp"
              width={50}
              height={50}
              className="rounded-xl w20"
            />
          ) : (
            <div className="w-fit">
              <UserIcon style={`my-auto w-250 h-250 ${!session && `hidden`}`} />
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>@{session&&uname}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {menuItems.map((item,i) => {
            return (
              <Link href={item.link} key={i}>
              <DropdownMenuItem>{item.value}</DropdownMenuItem>
              </Link>
            );
          }
          )}
          <DropdownMenuItem>
            {session && (
              <Button
                onClick={() => {
                  signOut();
                }}
              >
                Log-Out
              </Button>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserProfile;

// {!(session===undefined) ? (
//   <div className="w-fit">
//     <FaUserCircle className="w-200 h-200" />
//   </div>
// ) : (
//   <img
//     src={`data:image/jpeg;base64,${dp}`}
//     alt="dp"
//     width={30}
//     height={30}
//     className="rounded-lg"
//   />
// )}
