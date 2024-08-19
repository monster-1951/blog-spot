import { comment } from "@/types/comment";
import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema<comment>({
    commentedBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:[true,"Who wrote this comment?"]
    },
    commentedOnPost:{
        type:Schema.Types.ObjectId,
        ref:"Post",
        required:[true,"This comment belongs to which post"]
    },
    commentContent:{
        type:String,
        required:[true,"What is the comment?"]
    }
},{timestamps:true})


const CommentModel = mongoose.models.Comment as mongoose.Model<comment> || mongoose.model<comment>("Comment",commentSchema)

export default CommentModel