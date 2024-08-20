import { FetchPostsOfUser } from "@/actions/FetchPostsOfUser";
import { FetchUser } from "@/actions/FetchUser";
import HomeOfPosts from "@/components/custom/HomeOfPosts";
import PostCard from "@/components/custom/PostCard";
import ProfileHeader from "@/components/custom/ProfileHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { User } from "@/types/user";
import mongoose from "mongoose";

interface post {
  _id: string;
  postedBy: string;
  author: string;
  title: string;
  content: string;
  media: string;
  comments: string[];
  category: string[];
  likes: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Profile = async ({ params }: { params: { userId: string } }) => {
  const { ObjectId } = mongoose.Types;
  const transformPostData = (data: any[]): post[] => {
    return data.map((item) => ({
      _id: item._id instanceof ObjectId ? item._id.toString() : item._id,
      postedBy:
        item.postedBy instanceof ObjectId
          ? item.postedBy.toString()
          : item.postedBy,
      author: item.author,
      title: item.title,
      content: item.content,
      category: item.category,
      media: item.media,
      comments: item.comments.map((comment: any) => comment.toString()), // Convert comments if needed
      likes: item.likes.map((like: any) => like.toString()), // Convert likes if needed
      createdAt:
        item.createdAt instanceof Date
          ? item.createdAt.toISOString()
          : item.createdAt,
      updatedAt:
        item.updatedAt instanceof Date
          ? item.updatedAt.toISOString()
          : item.updatedAt,
      __v: item.__v,
    }));
  };
  const id = params.userId;
  const CurrentUser = (await FetchUser(id)) as User;
  const CurrentUserPosts = (await FetchPostsOfUser(id)) as post[];
  const CurrentPosts = transformPostData(CurrentUserPosts);
  return (
    <div className="sm:w-[70%] lg:w-[50%] mx-auto w-full ">
      <ProfileHeader />
      <div>
        {CurrentPosts.map((item: post) => {
          return (
            <PostCard
              _id={item._id}
              author={item.author}
              category={item.category}
              content={item.content}
              createdAt={item.createdAt}
              likes={item.likes}
              media={item.media}
              postedBy={item.postedBy}
              title={item.title}
              key={item._id}
              updatedAt={item.updatedAt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
