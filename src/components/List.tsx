"use client";
import { Movie } from "@/models/Movies";
import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Lists from "@/components/Lists";

const List: React.FC<{
  movieArray: Movie[];
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  setHoveredMovieId: React.Dispatch<React.SetStateAction<boolean>>;
  hoveredMovieId: boolean;
}> = ({
  movieArray,
  isMuted,
  setIsMuted,
  setHoveredMovieId,
  hoveredMovieId,
}) => {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [buttonWidth, setButtonWidth] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRefRight = useRef<HTMLButtonElement>(null);
  const buttonRefLeft = useRef<HTMLButtonElement>(null);
  const divRefRight = useRef<HTMLDivElement>(null);
  const divRefLeft = useRef<HTMLDivElement>(null);
  const size = movieArray.length;

  useEffect(() => {
    const logScreenWidth = () => {
      if (buttonRefRight.current) {
        setButtonWidth(buttonRefRight.current.getBoundingClientRect().width);
      }
      if (divRefLeft.current) {
        divRefLeft.current.style.display = "none";
      }
      if (divRefRight.current && size < 6) {
        divRefRight.current.style.display = "none";
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
        if (divRefLeft.current && slideNumber <= 6)
          divRefLeft.current.style.display = "none";
        if (divRefRight.current && size - slideNumber <= 12)
          divRefRight.current.style.display = "block";
        setSlideNumber(slideNumber - 6);
        listRef.current.style.transform = `translateX(${0}px)`;
      }
      if (direction === "right" && slideNumber < 5) {
        if (divRefLeft.current) divRefLeft.current.style.display = "block";
        if (divRefRight.current && size - slideNumber <= 12)
          divRefRight.current.style.display = "none";

        setSlideNumber(slideNumber + 6);
        listRef.current.style.transform = `translateX(${-distance}px)`;
      }
    }
  };

  return (
    <div className="relative">
      <div className="relative w-screen h-[225px] flex flex-col mb-12">
        <h1 className="text-2xl">Your next watch</h1>
        <div
          ref={listRef}
          className="h-[128px] w-full flex ml-[60px] transition-transform duration-300 ease-in-out "
        >
          {Array.from(movieArray, (movie) => (
            <Lists
              movie={movie}
              isMuted={isMuted}
              setIsMuted={setIsMuted}
              key={String(movie._id)}
              setHoveredMovieId={setHoveredMovieId}
              hoveredMovieId={hoveredMovieId}
            />
          ))}
        </div>
        <div
          ref={divRefLeft}
          style={{ background: "hsla(0, 0%, 8%, .5)" }}
          onClick={() => handleClick("left")}
          className=" w-[63px] absolute top-[31px] "
        >
          <button ref={buttonRefLeft} className="w-[60px] h-[129px]">
            <FaChevronLeft className="scale-[2] z-30 w-[60px] cursor-pointer bg-transparent" />
          </button>
        </div>
        <div
          ref={divRefRight}
          style={{ background: "hsla(0, 0%, 8%, .5)" }}
          onClick={() => handleClick("right")}
          className="absolute top-[31px] right-2  w-[70px]"
        >
          <button ref={buttonRefRight} className=" w-[60px] h-[129px]">
            <FaChevronRight className="scale-[2] z-30 w-[60px] cursor-pointer bg-transparent" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default List;
