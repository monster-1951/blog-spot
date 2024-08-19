"use server";
import dbConnect from "@/database/ConnectDB";
import PostModel from "@/database/models/post.model";

export const LikePost = async (postId: string, LikedUser: string) => {
  await dbConnect();

  try {
    const post = await PostModel.updateOne(
      { _id: postId },
      { $push: { likes: LikedUser } }
    );
    console.log(post, "Liked");
  } catch (error) {
    console.log("Can't like please try again later", error);
  }
};

export const UnLikePost = async (postId: string, UnLikedUser: string) => {
  await dbConnect();

  try {
    const post = await PostModel.updateOne(
      {
        _id: postId,
      },
      { $pull: { likes: UnLikedUser } }
    );
    
    console.log(post, "unliked");
  } catch (error) {
    console.log("Can't unlike please try again later", error);
  }
  const post = await PostModel.updateOne(
    {
      _id: UnLikedUser,
    },
    { $pull: { likes: UnLikedUser } }
  );

  console.log(post, "unliked");
};
