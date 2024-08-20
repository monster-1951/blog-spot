"use client";
import { usePostContext } from "@/context/postProvider";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface PostEditorProps {
  title: string;
  content: string;
  postId:string
}

const PostEditor = ({ title, content ,postId}: PostEditorProps) => {
  const posst = usePostContext();
  const [Title, setTitle] = useState(title || "");
  const [Content, setContent] = useState(content || "");
  useEffect(() => {
    posst.setPost({title:title,content:content,id:postId})
    console.log(posst)
  }, []);
  console.log(posst)
  return (
    <div className="flex flex-col space-y-10 md:w-[50%] mx-auto">
      <ReactQuill
        value={Title}
        onChange={(e) => {
          setTitle(e);
          posst.setPost({ title: e, content: Content });
          console.log(posst.post);
        }}
        theme="bubble"
        placeholder="Title"
      />
      <ReactQuill
        value={Content}
        onChange={(e) => {
          setContent(e);
          posst.setPost({ title: Title, content: e });
          console.log(posst.post);
        }}
        theme="bubble"
        placeholder="Tell your story"
      />
    </div>
  );
};

export default PostEditor;
