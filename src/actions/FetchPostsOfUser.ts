import dbConnect from "@/database/ConnectDB";
import PostModel from "@/database/models/post.model";
import { User } from "@/types/user";

interface post {
  _id: string;
  postedBy: string;
  author: string;
  title: string;
  content: string;
  media: string;
  comments: string[];
  likes: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const FetchPostsOfUser = async (id: string) => {
  await dbConnect();
  // console.log(posts)
  try {
    const AllPosts: post[] = await PostModel.find({ postedBy: id });
    //   console.log(AllPosts)
    return AllPosts as post[]
  } catch (error) {
    return error;
  }
};
