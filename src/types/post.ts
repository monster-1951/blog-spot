import { Document, Types } from "mongoose";
import { category } from "./category";
import { comment } from "./comment";
import { User } from "./user";

export interface post extends Document{
    postedBy:Types.ObjectId,
    author:string,
    title:string,
    content:string,
    category:category[],
    media?:string,
    comments?:comment[],
    likes?:User[]
}