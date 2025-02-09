"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Component that uses useSearchParams
const VideosPageContent = () => {
  const searchParams = useSearchParams();
  const params = searchParams.get("trackId");
  const newUrl = `https://res.cloudinary.com/dpexuin43/video/upload/${params}`;

  return (
    <div>
      <video
        src={newUrl}
        className="w-screen h-screen"
        autoPlay
        controls
      ></video>
    </div>
  );
};

// Wrap the content in a Suspense boundary
const VideosPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VideosPageContent />
    </Suspense>
  );
};

export default VideosPage;
