import React from "react";
import PostEditor from "@/components/custom/PostEditor";
import { FetchPost } from "@/actions/FetchPosts";
import { post } from "@/components/custom/HomeOfPosts";

const EditPost = async ({ params }: { params: { postId: string } }) => {
  const post: post = (await FetchPost(params.postId)) as post;
  console.log(params.postId)
  return (
    <>
      <PostEditor content={post.content} title={post.title} postId={params.postId} />
    </>
  );
};

export default EditPost;
