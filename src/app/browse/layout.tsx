"use client";
import MainNavbar from "@/components/MainNavbar";
import React, { FC, useState } from "react";

type childType = {
  children: React.ReactNode;
};

const Layout: FC<childType> = ({ children }) => {
  const [inputValue, setInputValue] = useState<string>("")
  return (
    <div>
      <MainNavbar inputValue={inputValue} setInputValue={setInputValue} />
      {inputValue === "" ? children : ""}
    </div>
  );
};

export default Layout;
