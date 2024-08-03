
// 'use client'
// import React, { useRef, useState, useEffect } from "react";
// import { FaPlay } from "react-icons/fa6";
// import { IoIosInformationCircleOutline } from "react-icons/io";
// import { IoVolumeHighOutline } from "react-icons/io5";
// import { LuVolumeX } from "react-icons/lu";
// import axios from "axios";
// import "./browsing.css";
// import { useRouter } from "next/navigation";
// import InfoSection from "@/components/InfoSection";
// import MainNavbar from "@/components/MainNavbar";
// import { Movie } from "@/models/Movies";
// import Lists from "@/components/Lists"

// const Page: React.FC = () => {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const [isMuted, setIsMuted] = useState(true);
//   const [isReadyToPlay, setIsReadyToPlay] = useState(false);
//   const [trailerToShow, setTrailerToShow] = useState("");
//   const [movieTitle, setMovieTitle] = useState("");
//   const [isScaled, setIsScaled] = useState(false);
//   const [firstVideo, setFirstVideo] = useState("");
//   const [movieImage, setMovieImage] = useState("");
//   const router = useRouter();

//   const [info, setInfo] = useState(false);
//   const [res, setRes] = useState<Movie | null>(null); // Initialize res with null

//   function handleInfoSection() {
//     setInfo(true);
//   }

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsReadyToPlay(true);
//       if (videoRef.current) {
//         videoRef.current.play().catch((error) => {
//           console.error("Error attempting to play the video:", error);
//         });
//       }
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   const fetchRandomMovie = async () => {
//     try {
//       const response = await axios.get("api/getRandomMovie");
//       console.log(response.data.movie);
//       setMovieImage(response.data.movie.imgSm);
//       setTrailerToShow(response.data.movie.trailer);
//       setMovieTitle(response.data.movie.imgTitle);
//       setFirstVideo(response.data.movie.videos[1]);
//       setRes(response.data.movie); // Set the state variable with the fetched data
//     } catch (error) {
//       console.error("Error fetching random movie:", error);
//     }
//   };

//   useEffect(() => {
//     fetchRandomMovie();
//   }, []);

//   function startTimer() {
//     setTimeout(() => {
//       setIsScaled(true);
//     }, 3000);
//   }

//   const handlePlayPause = () => {
//     if (firstVideo) {
//       const video = firstVideo.split("upload/")[1];
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
//     <div className="relative w-screen h-screen m-0 p-0">
//       <div className={info ? "info" : ""}>
//         <MainNavbar />
//         <div className="relative w-screen h-screen">
//           {!isReadyToPlay || info ? (
//             <img src={movieImage} className="w-screen h-screen object-cover" />
//           ) : (
//             <video
//               ref={videoRef}
//               className="w-screen h-screen object-cover"
//               controls={false}
//               autoPlay
//               muted
//               preload="none"
//               onCanPlay={startTimer}
//             >

//               <source src={trailerToShow} type="video/mp4" />
//             </video>
            
//           )}
//           <div className="absolute inset-0 bg-custom-gradient2"></div>

//           <div className="absolute bottom-44 left-20 w-11/12">
//             <img
//               src={movieTitle}
//               className={`${isScaled ? "scaling" : ""}`}
//               alt="Title"
//             />
//             <div className="flex justify-between">
//               <div className="flex">
//                 <button onClick={handlePlayPause} className="text-white mr-4">
//                   <div className="text-xl bg-white hover:opacity-80 w-32 items-center justify-center text-black rounded-sm h-12 flex">
//                     <FaPlay className="mr-3" />
//                     <div>Play</div>
//                   </div>
//                 </button>
//                 <button onClick={handleInfoSection} className="text-white">
//                   <div className="text-xl bg-gray-400 hover:opacity-80 w-44 items-center justify-center text-black rounded-sm h-12 flex">
//                     <IoIosInformationCircleOutline className="text-2xl mr-3" />
//                     <div>More Info</div>
//                   </div>
//                 </button>
//               </div>
//               <button
//                 onClick={handleMuteUnmute}
//                 className="text-white bg-transparent border-2 border-white rounded-full p-3 opacity-85 hover:opacity-100"
//               >
//                 {isMuted ? (
//                   <LuVolumeX className="text-2xl" />
//                 ) : (
//                   <IoVolumeHighOutline className="text-2xl" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
        
//       </div>
//       {info && res && <InfoSection isMuted={isMuted} setIsMuted={setIsMuted} info={info} setInfo={setInfo} response={res} />}

//       <div className={info ? "info " : "mt-10 overflow-x-hidden"}>
//         <Lists />
//       </div>
//     </div>
//   );
// };

// export default Page;



import React from 'react'
import Browsing from "@/components/Browsing"
import dbConnect from "@/lib/dbConnect";
import Movies, { Movie } from "@/models/Movies";

async function getData() {
  try {
    await dbConnect();
    // const res = await fetch("http://localhost:3000/api/getRandom12Movies",{next: {revalidate: 180}});
    const res = await fetch("http://localhost:3000/api/getRandom12Movies");
    const data = await res.json();
    return data.movie;
  } catch (error) {
    console.error("Error fetching movie:", error);
    process.exit(1);
  }
}

const page = async() => {
  const data:Movie[] = await getData();
  const randomValue = Math.floor(Math.random() * 12);  

  return (
    <div>
      <Browsing movieArray={data} randomMovie={data[randomValue]}></Browsing>
    </div>
  )
}

export default page