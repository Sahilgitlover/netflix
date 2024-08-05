"use client";
import React, { useState, useRef } from "react";
import { Movie } from "@/models/Movies";
import "./listitem.css";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa6";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoVolumeHighOutline } from "react-icons/io5";
import { LuVolumeX } from "react-icons/lu";
import VideoDuration from "./VideoDuration";

const Lists: React.FC<{
  movie: Movie;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  setHoveredMovieId: React.Dispatch<React.SetStateAction<boolean>>;
  hoveredMovieId: boolean;
}> = ({ movie, isMuted, setIsMuted, setHoveredMovieId, hoveredMovieId }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [applyHoverClass, setApplyHoverClass] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const hoverClassTimeout = useRef<NodeJS.Timeout | null>(null);
  const [videoDuration, setVideoDuration] = useState<number | null>(null); // State for video duration

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const handleMouseEnter = () => {
    setHoveredMovieId(true);
    hoverTimeout.current = setTimeout(() => {
      setIsHovered(true);
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 300);
    hoverClassTimeout.current = setTimeout(() => {
      setApplyHoverClass(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    const div = document.createElement("div");

    videoRef.current?.replaceWith(div);
    setHoveredMovieId(false);
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    if (hoverClassTimeout.current) {
      clearTimeout(hoverClassTimeout.current);
    }
    setIsHovered(false);
    setApplyHoverClass(false);
  };

  const handleInfoSection = () => {
    router.push(`/info?movie=${movie._id}`);
  };

  const createdAtDate = new Date((movie as any).createdAt);

  const handlePlayPause = () => {
    if (movie.videos[1]) {
      const video = movie.videos[1].split("upload/")[1];
      router.push(`/watch?trackId=${video}`);
    } else {
      console.error("First video URL is missing.");
    }
  };

  const handleMuteUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };
  return (
    <div className=" relative">
      <div
        ref={parentRef}
        id="parent"
        className={`h-[128px] listItem shadow-lg w-[227px] mx-[3px] flex-shrink-0 ${
          applyHoverClass ? "apply-hover" : ""
        }`}
        key={movie.id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {!isHovered ? (
          <img
            src={movie.imgSm}
            alt={movie.title}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="list-item-hovered">
            <video
              id="video"
              ref={videoRef}
              src={movie.trailer}
              muted={isMuted}
              loop
              autoPlay
              className="video"
            />

            <div className="itemInfo">
              <div className="flex justify-between">
                <div className="flex">
                  <button onClick={handlePlayPause} className="text-white mr-4">
                    <div className="bg-white hover:opacity-80 items-center justify-center text-black rounded-full p-3 flex">
                      <FaPlay />
                    </div>
                  </button>
                  <button onClick={handleInfoSection} className="text-white">
                    <div className=" bg-white hover:opacity-80 items-center justify-center text-black rounded-full p-3 flex">
                      <IoIosInformationCircleOutline className=" text-xl " />
                    </div>
                  </button>
                </div>
                <button
                  onClick={handleMuteUnmute}
                  className="text-white bg-transparent border-2 border-white rounded-full p-3 opacity-85 hover:opacity-100"
                >
                  {isMuted ? (
                    <LuVolumeX className="text-2xl" />
                  ) : (
                    <IoVolumeHighOutline className="text-2xl" />
                  )}
                </button>
              </div>
              <div className="itemInfoTop">
                <span className="limit">{movie.limit}+</span>
                <span>{createdAtDate.getFullYear()}</span> {/* Display year */}
              </div>
              <div className="genre">{movie.genre}</div>
              {/* Video Duration Component */}
              <VideoDuration
                videoUrl={movie.trailer}
                onDurationLoaded={(duration) => setVideoDuration(duration)}
              />
              {videoDuration && (
                <div className="duration">
                  Duration: {Math.floor(videoDuration / 60)}m{" "}
                  {Math.floor(videoDuration % 60)}s
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lists;
