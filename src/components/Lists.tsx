// "use client";
// import React, { useState, useRef } from "react";
// import { Movie } from "@/models/Movies";
// import "./listitem.css";
// import { useRouter } from "next/navigation";
// import { FaPlay } from "react-icons/fa6";
// import { IoIosInformationCircleOutline } from "react-icons/io";
// import { IoVolumeHighOutline } from "react-icons/io5";
// import { LuVolumeX } from "react-icons/lu";
// import InfoSection from "./InfoSection";

// const Lists: React.FC<{
//   movie: Movie;
//   isMuted: boolean;
//   setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
// }> = ({ movie, isMuted, setIsMuted }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [applyHoverClass, setApplyHoverClass] = useState(false);
//   const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
//   const hoverClassTimeout = useRef<NodeJS.Timeout | null>(null);
//   const [info, setInfo] = useState(false);

//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const router = useRouter();

//   const handleMouseEnter = () => {
//     hoverTimeout.current = setTimeout(() => {
//       setIsHovered(true);
//     }, 300); 
//     hoverClassTimeout.current = setTimeout(() => {
//       setApplyHoverClass(true);
//     }, 300);
//   };

//   const handleMouseLeave = () => {
//     if (hoverTimeout.current) {
//       clearTimeout(hoverTimeout.current);
//     }
//     if (hoverClassTimeout.current) {
//       clearTimeout(hoverClassTimeout.current);
//     }
//     setIsHovered(false);
//     setApplyHoverClass(false);
//   };

//   const handleInfoSection = () => {
//     setInfo(true);
//   };

//   const createdAtDate = new Date((movie as any).createdAt);

//   const handlePlayPause = () => {
//     if (movie.videos[1]) {
//       const video = movie.videos[1].split("upload/")[1];
//       router.push(`/watch?trackId=${video}`);
//     } else {
//       console.error("First video URL is missing.");
//     }
//   };

//   const handleMuteUnmute = () => {
//     if (videoRef.current) {
//       videoRef.current.muted = !videoRef.current.muted;
//       setIsMuted(!isMuted);
//     }
//   };

//   return (
//     <div>
//       <div
//         className={`h-[128px] listItem shadow-lg w-[227px] mx-[3px] flex-shrink-0 ${
//           applyHoverClass ? "apply-hover" : ""
//         }`}
//         key={movie.id}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         {!isHovered ? (
//           <img
//             src={movie.imgSm}
//             alt={movie.title}
//             className="object-cover w-full h-full"
//           />
//         ) : (
//           <div className="list-item-hovered">
//             <video
//               ref={videoRef}
//               src={movie.trailer}
//               autoPlay
//               muted
//               loop
//               className="video"
//             />
//             <div className="itemInfo">
//               <div className="flex justify-between">
//                 <div className="flex">
//                   <button onClick={handlePlayPause} className="text-white mr-4">
//                     <div className="bg-white hover:opacity-80 items-center justify-center text-black rounded-full p-3 flex">
//                       <FaPlay />
//                     </div>
//                   </button>
//                   <button onClick={handleInfoSection} className="text-white">
//                     <div className=" bg-white hover:opacity-80 items-center justify-center text-black rounded-full p-3 flex">
//                       <IoIosInformationCircleOutline className=" text-xl " />
//                     </div>
//                   </button>
//                 </div>
//                 <button
//                   onClick={handleMuteUnmute}
//                   className="text-white bg-transparent border-2 border-white rounded-full p-3 opacity-85 hover:opacity-100"
//                 >
//                   {isMuted ? (
//                     <LuVolumeX className="text-2xl" />
//                   ) : (
//                     <IoVolumeHighOutline className="text-2xl" />
//                   )}
//                 </button>
//               </div>
//               <div className="itemInfoTop">
//                 <span className="limit">{movie.limit}+</span>
//                 <span>{createdAtDate.getFullYear()}</span> {/* Display year */}
//               </div>
//               {/* <div className="desc">{movie.desc}</div> */}
//               <div className="genre">{movie.genre}</div>
//             </div>
//           </div>
//         )}
//       </div>

//       {info  && (
//         <div className="info-overlay">
//           <InfoSection
//             isMuted={isMuted}
//             setIsMuted={setIsMuted}
//             info={info}
//             setInfo={setInfo}
//             response={movie}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Lists;






"use client";
import React, { useState, useRef } from "react";
import { Movie } from "@/models/Movies";
import "./listitem.css";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa6";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoVolumeHighOutline } from "react-icons/io5";
import { LuVolumeX } from "react-icons/lu";
import InfoSection from "./InfoSection";

const Lists: React.FC<{
  movie: Movie;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ movie, isMuted, setIsMuted }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [applyHoverClass, setApplyHoverClass] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const hoverClassTimeout = useRef<NodeJS.Timeout | null>(null);
  const [info, setInfo] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const router = useRouter();

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsHovered(true);
    }, 300);
    hoverClassTimeout.current = setTimeout(() => {
      setApplyHoverClass(true);
    }, 300);
  };

  const handleMouseLeave = () => {
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
    setInfo(true);
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
    <div>
      <div
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
              ref={videoRef}
              src={movie.trailer}
              autoPlay
              muted={isMuted}
              loop
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
              {/* <div className="desc">{movie.desc}</div> */}
              <div className="genre">{movie.genre}</div>
            </div>
          </div>
        )}
      </div>

      <div className={`info-overlay ${info ? "active" : ""}`}>
        <InfoSection
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          info={info}
          setInfo={setInfo}
          response={movie}
        />
      </div>
    </div>
  );
};

export default Lists;
