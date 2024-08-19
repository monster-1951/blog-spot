import { User } from "@/types/user";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<User>(
  {
    UserName: {
      type: String,
      required: [true, "UserName is required"],
    },
    FullName: {
      type: String,
      required: [true, "Full Name is required"],
    },
    Gender:{
      type:String,
      required:[true,"What is your gender?"],
    },
    Email: {
      type: String,
      required: [true, "Email is required"],
    },
    Password: {
      type: String,
      required: [true, "Password is required"],
    },
    MobileNumber: {
      type: String,
    },
    DateOfBirth:{
      type:String,
      required:[true,"Enter your Data of Birth"]
    },
    ProfilePicture: {
      type: String,
    },
    posts:[{
      type:Schema.Types.ObjectId,
      ref:"Post"
    }],
    comments:[{
      type:Schema.Types.ObjectId,
      ref:"Comment"
    }]
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User",userSchema)

export default UserModel
