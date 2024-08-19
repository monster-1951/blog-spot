import { Document } from "mongoose";
import { User } from "./user";
import { post } from "./post";

export interface comment extends Document{
    commentedBy:User,
    commentedOnPost:post,
    commentContent:string
}