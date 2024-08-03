"use client";
import Movies, { Movie } from "@/models/Movies";
import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Lists from "@/components/Lists";

const List: React.FC<{
  movieArray: Movie[];
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ movieArray, isMuted, setIsMuted }) => {

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
          {Array.from(movieArray, (movie) => (
            <Lists movie={movie} isMuted={isMuted} setIsMuted={setIsMuted} key={movie.id} />
          ))}
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
