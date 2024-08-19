import Header from "@/components/custom/Header";
import { PostProvider } from "@/context/postProvider";
import React from "react";
const layout = ({ children }: { children: React.ReactNode }) => {
  return <PostProvider>
  <Header CreatePostHeader/>
  {children}
  </PostProvider>;
};

export default layout;
