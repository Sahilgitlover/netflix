import { Movie } from "@/models/Movies";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { IoVolumeHighOutline } from "react-icons/io5";
import { LuVolumeX } from "react-icons/lu";
import VideoDuration from "./VideoDuration";

interface ContainerProps {
  info: boolean;
  setInfo: React.Dispatch<React.SetStateAction<boolean>>;
  response: Movie;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
}

const InfoSection: React.FC<ContainerProps> = ({
  info,
  setInfo,
  response,
  isMuted,
  setIsMuted,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlay, setIsVideoPlay] = useState(true);
  const router = useRouter();

  const playHandler = () => {
    setIsVideoPlay(false);
  };

  const [durations, setDurations] = useState<number[]>([]);

  const handleDurationLoaded = (index: number) => (duration: number) => {
    setDurations((prevDurations) => {
      const newDurations = [...prevDurations];
      newDurations[index] = duration;
      return newDurations;
    });
  };

  const handlePlayPause = () => {
    const firstVideo = response.videos[1];
    if (firstVideo) {
      const video = firstVideo.split("upload/")[1];
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

  const createdAt = (response as any).createdAt;
  const createdAtDate = new Date(createdAt);

  const infoHandler = () => {
    setInfo(!info);
  };


  const playSeriesHandler = (index:number) => {
    const video = response.videos[index+1].split("upload/")[1];
    router.push(`/watch?trackId=${video}`);
  }

  return (
    <div className="w-screen flex justify-center items-center">
      <div className="absolute bg-[#141414] top-4 rounded-sm w-[850px]   h-fit flex flex-col justify-center items-center z-50">
        <button
          onClick={infoHandler}
          className="border-1 py-2 px-4 bg-slate-700 w-fit rounded-full absolute top-2 right-2 cursor-pointer z-20"
        >
          X
        </button>
        <div className="relative h-[470px] object-cover ">
          {isVideoPlay ? (
            <video
              ref={videoRef}
              src={response.trailer}
              onEnded={playHandler}
              autoPlay
              muted={isMuted}
              className="h-full object-cover"
            ></video>
          ) : (
            <img src={response.img} className="h-full w-full object-cover" />
          )}

          <div className="absolute bottom-16 left-14 w-11/12 z-20">
            <img src={response.imgTitle} className="h-24" alt="Title" />
            <div className="flex justify-between">
              <div className="flex">
                <button onClick={handlePlayPause} className="text-white mr-4">
                  <div className="text-xl bg-white hover:opacity-80 w-32 items-center justify-center text-black rounded-sm h-12 flex">
                    <FaPlay className="mr-3" />
                    <div>Play</div>
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

          <div className="absolute inset-0 bg-custom-gradient2"></div>
        </div>

        <div className="w-full  p-6  ">
          <div className="flex justify-between w-full">
            <div className=" flex ">
              <div className=" mr-2 ">{createdAtDate.getFullYear()}</div>
              {!response.isSeries ? (
                <div>
                  {response.videos.slice(1).map((videoUrl, index) => (
                    <VideoDuration
                      key={index}
                      videoUrl={videoUrl}
                      onDurationLoaded={handleDurationLoaded(index)}
                    />
                  ))}{" "}
                </div>
              ) : (
                <div>{response.videos.length - 1} videos</div>
              )}
            </div>

            <div>Genre : {response.genre}</div>
          </div>
          <div className=" border w-fit p-1 mb-5">U/A {response.limit}+</div>

          <div className=" mb-3 ">Title : {response.title}</div>
          <div>Desription : {response.desc}</div>
        </div>

        {response.isSeries && (
          <div className=" w-full p-6">
            <h1 className=" text-2xl mb-4">Episodes</h1>
            {response.videos.slice(1).map((videoUrl, index) => (
              <button onClick={() => playSeriesHandler(index)} className=" block w-full cursor-pointer">
                <div className=" flex justify-between items-center">
                  <div className=" flex items-center">
                    <div className=" items-center">{index + 1}</div>

                    <img src={response.img} className=" mx-7 w-44" alt="" />

                    <div> Episode {index + 1}</div>
                  </div>

                  <VideoDuration
                    key={index}
                    videoUrl={videoUrl}
                    onDurationLoaded={handleDurationLoaded(index)}
                  />
                </div>
                <div className=" my-6 w-full border opacity-45"></div>
              </button>
            ))}{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoSection;