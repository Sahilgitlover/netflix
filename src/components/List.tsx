"use client";
import { Movie } from "@/models/Movies";
import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
// interface ListProps {
//   movies: Movie[];
// }
// const List: React.FC<ListProps> = ({ movies }) => {
  const List = () => {

  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [buttonWidth, setButtonWidth] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const logScreenWidth = () => {
      if (buttonRef.current) {
        setButtonWidth(buttonRef.current.getBoundingClientRect().width);
      }
    };
    logScreenWidth();
    window.addEventListener("resize", logScreenWidth);
    return () => {
      window.removeEventListener("resize", logScreenWidth);
    };
  }, []);

  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (listRef.current && buttonWidth !== null) {
      let distance = window.innerWidth - 2 * buttonWidth - 18;

      if (direction === "left" && slideNumber > 0) {
        setSlideNumber(slideNumber - 6);
        listRef.current.style.transform = `translateX(${0}px)`;
      }
      if (direction === "right" && slideNumber < 5) {
        setSlideNumber(slideNumber + 6);
        listRef.current.style.transform = `translateX(${-distance}px)`;
      }
      console.log("Slide Number:", slideNumber);
    }
  };

  return (
    <div className="relative">
      <div className="relative w-screen h-[225px] flex flex-col mb-12">
        <h1 className="text-2xl">Your next watch</h1>
        <div
          ref={listRef}
          className="h-[128px] w-full flex ml-[60px] transition-transform duration-300 ease-in-out"
        >
          {/* {Array.from} */}
          <div className="h-[128px] w-[227px] border mx-[3px] flex-shrink-0"></div>
          <div className="h-[128px] w-[227px] border mx-[3px] flex-shrink-0"></div>
          <div className="h-[128px] w-[227px] border mx-[3px] flex-shrink-0"></div>
          <div className="h-[128px] w-[227px] border mx-[3px] flex-shrink-0"></div>
          <div className="h-[128px] w-[227px] border mx-[3px] flex-shrink-0"></div>
          <div className="h-[128px] w-[227px] border mx-[3px] flex-shrink-0"></div>
          <div className="h-[128px] w-[227px] border mx-[3px] flex-shrink-0"></div>
          <div className="h-[128px] w-[227px] border mx-[3px] flex-shrink-0"></div>
          <div className="h-[128px] w-[227px] border mx-[3px] flex-shrink-0"></div>
          <div className="h-[128px] w-[227px] border mx-[3px] flex-shrink-0"></div>
          <div className="h-[128px] w-[227px] border mx-[3px] flex-shrink-0"></div>
          <div className="h-[128px] w-[227px] border mx-[3px] flex-shrink-0"></div>
        </div>

        <FaChevronLeft
          className="scale-[2] z-30 w-[60px] absolute top-20 cursor-pointer bg-transparent"
          onClick={() => handleClick("left")}
          style={{ display: isMoved ? "block" : "none" }}
        />
        <button ref={buttonRef} className="absolute top-20 right-2">
          <FaChevronRight
            onClick={() => handleClick("right")}
            className="scale-[2] z-30 w-[60px] cursor-pointer bg-transparent"
          />
        </button>
      </div>
    </div>
  );
};

export default List;
// "use client";
// import React, { useRef, useState, useEffect } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

// const List = () => {
//   const [isMoved, setIsMoved] = useState(false);
//   const [slideNumber, setSlideNumber] = useState(0);
//   const listRef = useRef<HTMLDivElement>(null);

//   const totalItems = 12; // Total number of items
//   const itemsPerView = 6; // Number of items visible at once

//   const handleClick = (direction: string) => {
//     setIsMoved(true);

//     if (listRef.current) {
//       const itemWidth = 227; // Width of a single item
//       let newSlideNumber = slideNumber;

//       if (direction === "left" && slideNumber > 0) {
//         newSlideNumber = slideNumber - 1;
//       } else if (direction === "right" && slideNumber < Math.ceil(totalItems / itemsPerView) - 1) {
//         newSlideNumber = slideNumber + 1;
//       } else if (direction === "right" && slideNumber === Math.ceil(totalItems / itemsPerView) - 1) {
//         newSlideNumber = 0; // Reset to the start if at the end
//       }

//       const distance = newSlideNumber * itemWidth * itemsPerView;
//       listRef.current.style.transform = `translateX(-${distance}px)`;
//       setSlideNumber(newSlideNumber);
//     }
//   };

//   return (
//     <div className="relative">
//       <div className="relative w-screen h-[225px] flex flex-col mb-12">
//         <h1 className="text-2xl">Your next watch</h1>

//         <div
//           ref={listRef}
//           className="h-[128px] w-full flex ml-[60px] transition-transform duration-300 ease-in-out"
//         >
//           {[...Array(totalItems)].map((_, index) => (
//             <div
//               key={index}
//               className="h-[128px] w-[227px] border mx-[3px] flex-shrink-0"
//             ></div>
//           ))}
//         </div>

//         <FaChevronLeft
//           className="scale-[2] z-30 w-[60px] absolute top-20 cursor-pointer bg-transparent"
//           onClick={() => handleClick("left")}
//           style={{ display: isMoved ? "block" : "none" }}
//         />
//         <FaChevronRight
//           className="scale-[2] z-30 w-[60px] absolute top-20 right-2 cursor-pointer bg-transparent"
//           onClick={() => handleClick("right")}
//         />
//       </div>
//     </div>
//   );
// };

// export default List;
