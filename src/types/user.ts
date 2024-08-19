import { Document } from "mongoose";
import { post } from "./post";
import { comment } from "./comment";


export interface User extends Document {
    UserName:string,
    FullName:string,
    Gender:"Male"|"Female"|"Prefer not to say"
    Email:string,
    MobileNumber?:string,
    Password:string,
    ProfilePicture?:string,
    DateOfBirth:string,
    posts?:post[]
    comments?:comment[]
}