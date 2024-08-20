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
import { Button } from "../ui/button";
import LikeTheBlog from "./LikeTheBlog";
import { useSession } from "next-auth/react";
import EditIcon from "./Icons/EditIcon";
import DeleteIcon from "./Icons/DeleteIcon";
import Link from "next/link";
import DeletePostDialog from "./DeletePostDialog";

interface PostCardProps {
  _id: string;
  postedBy: string;
  author: string;
  title: string;
  content: string;
  media: string;
  comments?: string[];
  category: string[];
  likes: string[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

const PostCard = ({
  _id,
  author,
  category,
  content,
  createdAt,
  likes,
  media,
  postedBy,
  title,
}: PostCardProps) => {
  const { data: session } = useSession();
  const user = session?.user;
  console.log(_id, "ID of this post");
  return (
    <Card className="p-3 w-fit h-fit">
      <CardHeader className="p-5">
        <CardTitle className="text-xl md:text-3xl">
          {htmlToText(title)}
        </CardTitle>
        <CardDescription className="flex justify-between p-2">
          <div>{category}</div>

          <div>@{author}</div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex space-x-5">
        {media && (
          <Image
            src={media}
            width={200}
            height={200}
            alt={`Image for ${htmlToText(title)}`}
            className="w-32"
          />
        )}
        <div className="text-sm">{htmlToText(content).slice(0, 100)}...</div>
      </CardContent>
      <CardFooter className="flex justify-between text-sm">
        <div className="">
          <Button variant={"outline"} className="bg-inherit flex  space-x-2">
            <LikeTheBlog
              Liked={likes.includes(user?._id)}
              _id={user?._id}
              postId={_id.toString()}
            />
            <span className="text-gray-600"> {likes.length} likes</span>
          </Button>
        </div>

        <div className=" text-gray-600">
          {new Date(createdAt).toLocaleDateString()}
        </div>

        <div className="flex">
          <Link href={`/EditPost/${_id}`}>
            <Button className="outline-none w-fit" variant={"outline"}>
              <EditIcon />
            </Button>
          </Link>

          <Button className="outline-none w-fit" variant={"outline"}>
            <DeletePostDialog _id={_id} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
