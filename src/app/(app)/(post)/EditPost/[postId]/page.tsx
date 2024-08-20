import React from "react";
import PostEditor from "@/components/custom/PostEditor";
import { FetchPost } from "@/actions/FetchPosts";
import { post } from "@/components/custom/HomeOfPosts";
import Header from "@/components/custom/Header";

const EditPost = async ({ params }: { params: { postId: string } }) => {
  const post: post = (await FetchPost(params.postId)) as post;
  console.log(params.postId);
  return (
    <>
    <Header CreatePostHeader/>
      <PostEditor
        content={post.content}
        title={post.title}
        postId={params.postId}
      />
    </>
  );
};

export default EditPost;
