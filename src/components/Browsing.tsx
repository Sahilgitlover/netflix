"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaPlay } from "react-icons/fa6";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoVolumeHighOutline } from "react-icons/io5";
import { LuVolumeX } from "react-icons/lu";
import "../app/browse/browsing.css";
import { useRouter } from "next/navigation";
import MainNavbar from "@/components/MainNavbar";
import { Movie } from "@/models/Movies";

interface Props {
  hoveredMovieId: boolean;
  randomMovie: Movie;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
}

const Page: React.FC<Props> = ({
  hoveredMovieId,
  randomMovie,
  isMuted,
  setIsMuted,
}) => {
  const [isReadyToPlay, setIsReadyToPlay] = useState(false);
  const [trailerToShow, setTrailerToShow] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const [isScaled, setIsScaled] = useState(false);
  const [firstVideo, setFirstVideo] = useState("");
  const [movieImage, setMovieImage] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const router = useRouter();

  function handleInfoSection() {
    router.push(`/info?movie=${randomMovie._id}`);
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.play().catch((error) => {
        console.error("Error attempting to play video:", error);
      });
    }
  }, [isMuted, isReadyToPlay]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScaled(true);
      setIsReadyToPlay(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setMovieImage(randomMovie.imgSm);
    setTrailerToShow(randomMovie.trailer);
    setMovieTitle(randomMovie.imgTitle);
    setFirstVideo(randomMovie.videos[1]);
  }, [randomMovie]);

  function startTimer() {
    setIsReadyToPlay(false);
  }

  const handlePlayPause = () => {
    if (firstVideo) {
      const video = firstVideo.split("upload/")[1];
      router.push(`/watch?trackId=${video}`);
    } else {
      console.error("First video URL is missing.");
    }
  };

  const handleMuteUnmute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative w-screen h-screen m-0 p-0 will-change-scroll overflow-x-hidden">
      <div>
        
        <div className="relative w-screen h-screen">
          {!isReadyToPlay || hoveredMovieId ? (
            <img src={movieImage} className="w-screen h-screen object-cover" />
          ) : (
            <video
              src={trailerToShow}
              ref={videoRef}
              muted={isMuted}
              onEnded={startTimer}
              className="w-screen h-screen object-cover"
              autoPlay
              playsInline
            />
          )}
          <div className="absolute inset-0 bg-custom-gradient2"></div>

          <div className="absolute bottom-44 left-20 w-11/12">
            <img
              src={movieTitle}
              className={`${isScaled ? "scaling" : ""}`}
              alt="Title"
            />
            <div className="flex justify-between">
              <div className="flex">
                <button onClick={handlePlayPause} className="text-white mr-4">
                  <div className="text-xl bg-white hover:opacity-80 w-32 items-center justify-center text-black rounded-sm h-12 flex">
                    <FaPlay className="mr-3" />
                    <div>Play</div>
                  </div>
                </button>
                <button onClick={handleInfoSection} className="text-white">
                  <div className="text-xl bg-gray-400 hover:opacity-80 w-44 items-center justify-center text-black rounded-sm h-12 flex">
                    <IoIosInformationCircleOutline className="text-2xl mr-3" />
                    <div>More Info</div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
