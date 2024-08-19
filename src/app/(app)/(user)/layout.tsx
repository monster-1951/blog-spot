import Header from "@/components/custom/Header";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header HomeHeader/>
      {children}
    </>
  );
};

export default layout;
