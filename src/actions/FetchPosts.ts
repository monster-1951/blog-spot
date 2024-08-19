"use server";

import dbConnect from "@/database/ConnectDB";
import PostModel from "@/database/models/post.model";

export const FetchPosts = async () => {
  await dbConnect();

  try {
    const AllPosts = await PostModel.find().lean().exec();
      // console.log(AllPosts,"🍻AllPosts");
    return AllPosts;
  } catch (error) {
    console.log("Error in Fetching the posts", error, "😭");
    return error 
  }
};
