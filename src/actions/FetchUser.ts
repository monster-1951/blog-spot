'use server'
import dbConnect from "@/database/ConnectDB"
import UserModel from "@/database/models/user.model";

export const FetchUser = async (id:string) => {
  await dbConnect()
  try {
    const user = await UserModel.find({_id:id});
    // console.log(user,"👤")
    // console.log(id,"id")
    return user
  } catch (error) {
    console.log("Error in finding the user", error);
    return error
}
}
