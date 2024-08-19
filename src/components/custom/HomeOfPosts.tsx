"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Document } from "mongoose";

import Image from "next/image";
import LikeTheBlog from "./serverComponents/LikeTheBlog";
import { Button } from "../ui/button";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { LikePost } from "@/actions/LikePost";

const sample = [
  {
    _id: "66c2effa044e950608b95a6d",
    postedBy: "66c18b3153ee4b3e6ea26b6d",
    author: "elena_novak",
    title:
      '<p><span style="color: rgb(34, 170, 68);">Exploring the Beauty of the Swiss Alps</span></p>',
    content:
      '<p><span style="color: rgb(34, 170, 68);">The Swiss Alps are a stunning destination for travelers seeking breathtaking landscapes and outdoor adventures. From skiing in the winter to hiking in the summer, the Alps offer a year-round escape for nature enthusiasts. This blog delves into the must-see spots and activities in the region.</span></p>',
    category: ["Travel"],
    media: "",
    comments: [],
    likes: ["66c18b3153ee4b3e6ea26b6d"],
    createdAt: "2024-08-19T07:10:50.979Z",
    updatedAt: "2024-08-19T07:10:50.979Z",
    __v: 0,
  },
];
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
}
const HomeOfPosts = ({ posts }: HomeOfPostProps) => {
  const { data: session } = useSession();
  const user = session?.user;
  const [Liked, setLiked] = useState(false);
  console.log(posts, "posts from Home Of Posts ❤️");
  const htmlToText = (htmlString: string): string => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;

    // Extract the plain text, with formatting evaluated
    return tempElement.textContent || tempElement.innerText || "";
  };
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3">
      {posts?.map((item, number) => {
        return (
          <div
            className=""
            key={item._id.toString()}
          >
            <Card className="p-3 w-fit h-fit">
              <CardHeader className="p-5">
                <CardTitle className="text-xl md:text-3xl">
                  {htmlToText(item.title)}
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
                    onClick={() => {
                      setLiked(!Liked);
                    }}
                  >
                    
                    <LikeTheBlog
                      Liked={item.likes.includes(user?._id)}
                      _id={user?._id}
                      postId={item._id.toString()}
                    /> 
                    <span className="text-gray-600"> {item.likes.length} likes</span>
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
