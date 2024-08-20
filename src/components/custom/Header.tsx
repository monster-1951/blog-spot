"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { Input } from "../ui/input";
import { FiEdit } from "react-icons/fi";
import { sessionUser } from "@/types/session";
import UserProfile from "./UserProfile";
import { Button } from "../ui/button";
import Link from "next/link";
import { CiShare2 } from "react-icons/ci";
import NotificationBell from "./NotificationBell";

interface HeaderProps {
  HomeHeader?: boolean;
  CreatePostHeader?: boolean;
}
const Header = ({ HomeHeader, CreatePostHeader }: HeaderProps) => {
  const { data: session } = useSession();
  const user: sessionUser = session?.user;
  // const id = user._id
  const menuItems = [
    { link: `/`, value: "Home" },
    { link: `/createPost/`, value: "Write" },
    { link: `/Profile/${user?._id}`, value: "Profile" },
  ];
  console.log(user);
  return (
    <nav
      className={`flex p-3 border ${
        CreatePostHeader && "w-full sm:w-full"
      } space-x-2 justify-between `}
    >
      {/* Medium text */}

      <div className="flex">
        <Link href={"/"} className="my-auto">
          <h1
            className={`font-serif p-2 font-extrabold text-xl sm:text-3xl my-auto ${
              CreatePostHeader && "hidden sm:inline"
            }`}
          >
            Medium
          </h1>
        </Link>
        {HomeHeader && (
          <div className="p-2 h-full flex flex-col justify-center">
            {/* Search Bar */}
            <Input
              placeholder="Search"
              type="search"
              className="outline-none sm:w-60 bg-gray-50 sm:rounded-full w-24 my-auto h-fit "
            />
          </div>
        )}
        {/* draft in whose account */}
        {CreatePostHeader && (
          <div className=" my-auto">
            <p
              className={`sm:align-baseline font-light text-lg `}
            >
              <span className="font-bold">Draft in </span><span className="text-sm">{session?.user.UserName}</span>
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-end w-fit space-x-8 p-3 my-auto">
        {/* Link to Write Post */}
        {HomeHeader && user && (
          <>
            <div className="hidden sm:inline p-2 my-auto  w-20 ">
              <Link href={`/createPost`} className="flex justify-between ">
                <FiEdit className="my-auto" />
                <p>Write</p>
              </Link>
            </div>
          </>
        )}
        {CreatePostHeader && (
          <>
            {/* Publish Button */}
            <Link href={`/createPost/${user?._id}`} className="my-auto">
              <Button className="rounded-full bg-green-600 h-6" type="submit">
                Publish
              </Button>
            </Link>
            {/* Share button */}
            <CiShare2 className={`my-auto ${CreatePostHeader && "hidden"}`} />
          </>
        )}
        {/* Notification Bell */}
        <NotificationBell style={`my-auto ${CreatePostHeader && "hidden"}`} />
        {/* User ProfileIcon */}
        <UserProfile
          session={session || CreatePostHeader ? true : false}
          id={session?.user._id}
          uname={session?.user.UserName}
          menuItems={menuItems}
        />

        {/* Login /Logout button */}
        {!user && (
          <Link href={"/login"}>
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
