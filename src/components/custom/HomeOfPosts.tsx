"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { htmlToText } from "html-to-text";
import Image from "next/image";
import LikeTheBlog from "./LikeTheBlog";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export interface post {
  _id: string;
  postedBy: string;
  author: string;
  title: string;
  content: string;
  category: string[];
  media: string;
  comments: string[];
  likes: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface HomeOfPostProps {
  posts: post[];
  UserPosts?: boolean;
}
const HomeOfPosts = ({ posts, UserPosts }: HomeOfPostProps) => {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3">
      {posts?.map((item) => {
        return (
          <div className="" key={item._id.toString()}>
            <Card className="p-3 w-fit h-fit">
              <CardHeader className="p-5">
                <CardTitle className="text-xl md:text-3xl">
                  <Link href={`/PostView/${item._id}`} >
                  <p className="hover:text-green-600">

                  {htmlToText(item.title)}
                  </p>
                  </Link>
                </CardTitle>
                <CardDescription className="flex justify-between p-2">
                  <div>{item.category}</div>

                  <div>@{item.author}</div>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex space-x-5">
                {item.media && (
                  <Image
                    src={item.media}
                    width={200}
                    height={200}
                    alt={`Image for ${htmlToText(item.title)}`}
                    className="w-32"
                  />
                )}
                <div className="text-sm">
                  {htmlToText(item.content).slice(0, 100)}...
                </div>
              </CardContent>
              <CardFooter className="flex justify-between text-sm">
                <div className="">
                  <Button
                    variant={"outline"}
                    className="bg-inherit flex  space-x-2"
                  >
                    <LikeTheBlog
                      Liked={item.likes.includes(user?._id)}
                      _id={user?._id}
                      postId={item._id.toString()}
                    />
                    <span className="text-gray-600">
                      {" "}
                      {item.likes.length} likes
                    </span>
                  </Button>
                </div>

                <div className=" text-gray-600">
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>
              </CardFooter>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default HomeOfPosts;
