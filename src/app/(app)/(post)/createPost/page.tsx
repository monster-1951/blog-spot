"use client";
import Header from "@/components/custom/Header";
import { usePostContext } from "@/context/postProvider";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const WritePost = () => {
  const posst = usePostContext();
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");

  return (
   <>
   <Header CreatePostHeader/>
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
   </>
  );
};

export default WritePost;
