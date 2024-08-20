"use client";
import { LikePost, UnLikePost } from "@/actions/LikePost";
import React from "react";

interface LikeTheBlogProps {
  Liked: boolean;
  _id: string;
  postId: string;
}

const LikeTheBlog = ({ Liked, _id, postId }: LikeTheBlogProps) => {
  let Likked = Liked;
  
  const like = async () => {
    await LikePost(postId, _id);
  };

  const unLike = async () => {
    await UnLikePost(postId, _id);
  };


  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={Likked ? 0 : 2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`feather feather-heart ${
          Likked ? "fill-red-600 outline-none" : ""
        }`}
        onClick={() => {
          if (Likked) {
            Likked = false;
            unLike();
          } else if (!Likked) {
            Likked = true;
            like();
          }
        }}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </div>
  );
};

export default LikeTheBlog;
