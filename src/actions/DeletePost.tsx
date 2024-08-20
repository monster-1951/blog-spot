'use server'
import dbConnect from "@/database/ConnectDB"
import PostModel from "@/database/models/post.model";
import { revalidatePath } from "next/cache";

export const DeletePost = async (_id:string) => {
  await dbConnect();

  try {
    const deletePost = await PostModel.findByIdAndDelete(_id)
    console.log(deletePost,"died 😭")
    revalidatePath('/Profile')
  } catch (error) {
    console.log("Failed to delete the post",error)
  }
}
