"use client";
import React, { FC } from "react";
type childType = {
  children: React.ReactNode;
};

const Layout: FC<childType> = ({ children }) => {
  return <div>{children}</div>;
};

export default Layout;
