"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
const page = () => {
  const searchParams = useSearchParams();
  const params = searchParams.get("trackId");
  const newUrl = `https://res.cloudinary.com/dpexuin43/video/upload/${params}`;

  return (
    <div>
      <video
        src={newUrl}
        className=" w-screen h-screen"
        autoPlay
        controls
      ></video>
    </div>
  );
};

export default page;
