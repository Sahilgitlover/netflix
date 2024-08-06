"use client";
import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import "../app/browse/browsing.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useDebouncedCallback } from "use-debounce";
import { Movie } from "@/models/Movies";
import List from "./List";

const MainNavbar: FC<{
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}> = ({ inputValue, setInputValue }) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMovement, setIsMovement] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [hoveredMovieId, setHoveredMovieId] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const searchParams = useSearchParams();

  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY !== 0);
    };

    const avt = sessionStorage.getItem("avatar");
    if (avt) setAvatar(avt);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Helper function to determine if a link is active
  const isActiveLink = (path: string) => pathname === path;

  async function logoutHandler() {
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("avatar");

    try {
      const res = await axios.delete("/api/deleteCookies");
      if (res.data.success) {
        console.log("Cookies deleted successfully");
        router.push("/sign-in");
      } else {
        console.error("Error deleting cookies:", res.data.message);
      }
    } catch (error) {
      console.error("Error deleting cookies:", error);
    }
    router.push("/sign-in");
  }

  const [results, setResults] = useState<Movie[]>([]);

  // Use debounced callback
  const handleSearch = useDebouncedCallback(async (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    router.replace(`${pathname}?${params.toString()}`);

    if (!value) {
      setResults([]);
      return;
    }
    try {
      const res = await axios.get(`/api/search?title=${value}`);
      setResults(res.data.movies);

      console.log(results);
    } catch (error: any) {
      console.log("Error", error.message);
      setResults([]);
    }
  }, 400);

  useEffect(() => {
    handleSearch(inputValue);
  }, [inputValue]);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <div
        id={isScrolled ? "scrolled" : ""}
        className="z-50 font-[14px] w-full text-white top-0 fixed bg-custom-gradient"
      >
        <div className="pl-[50px] pr-[50px] flex items-center justify-between h-[70px]">
          <div className="flex items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt="Netflix Logo"
              width="100px"
              height="25px"
              className="mr-[20px]"
            />

            <Link
              href="/browse"
              className={`link ${
                isActiveLink("/browse") ? " text-white" : " opacity-50"
              }`}
            >
              <span className="mr-[20px] cursor-pointer">Home</span>
            </Link>
            <Link
              href="/browse/series"
              className={`link ${
                isActiveLink("/browse/series") ? " text-white" : " opacity-50"
              }`}
            >
              <span className="mr-[20px] cursor-pointer">TV Shows</span>
            </Link>

            <Link
              href="/browse/movies"
              className={`link ${
                isActiveLink("/browse/movies") ? " text-white" : " opacity-50"
              }`}
            >
              <span className="mr-[20px] cursor-pointer">Movies</span>
            </Link>

            <Link
              href="/browse/new"
              className={`link ${
                isActiveLink("/browse/new") ? " text-white" : " opacity-50"
              }`}
            >
              <span className="mr-[20px] cursor-pointer">New and Popular</span>
            </Link>
          </div>

          <div className="relative flex items-center">
            <input
              type="text"
              className=" h-10 w-64 bg-transparent border-2 outline-0 px-8 font-semibold"
              placeholder="title..."
              onChange={searchHandler}
              value={inputValue}
            />
            <FaSearch
              size={20}
              className="my-0 mx-[15px] cursor-pointer absolute -left-2"
            />

            <IoIosNotificationsOutline
              size={28}
              className="my-0 mx-[15px] cursor-pointer"
            />
            <div
              onMouseEnter={() => setIsMovement(true)}
              onMouseLeave={() => setIsMovement(false)}
            >
              <button
                className="flex justify-center items-center"
                aria-expanded={isMovement}
              >
                <Image
                  src={avatar}
                  alt="Profile"
                  className="rounded-md object-cover  cursor-pointer"
                  width={30}
                  height={30}
                />
                {isMovement ? (
                  <IoMdArrowDropup className="my-0 mx-[5px] cursor-pointer" />
                ) : (
                  <IoMdArrowDropdown className="my-0 mx-[5px] cursor-pointer" />
                )}
              </button>
              {isMovement && (
                <div className="relative">
                  <IoMdArrowDropup className="absolute top-10 left-[165px] my-0 mx-[15px] cursor-pointer" />
                  <div className="absolute right-0 w-56 bg-black bg-opacity-60">
                    <div className="flex flex-col items-start" id="options">
                      <Link href="/" className="my-2 mx-2 text-white">
                        Settings
                      </Link>
                      <button
                        onClick={logoutHandler}
                        className="my-2 mx-2 text-white"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {inputValue !== "" &&
        (results.length > 0 ? (
          <div className=" mt-40 overflow-hidden">
            <List
              text={"Search Results"}
              movieArray={results}
              isMuted={isMuted}
              setIsMuted={setIsMuted}
              setHoveredMovieId={setHoveredMovieId}
              hoveredMovieId={hoveredMovieId}
            />
          </div>
        ) : (
          <div className=" mt-40 overflow-hidden flex w-screen justify-center items-center">
            <h1 className=" ml-11 text-4xl"> Not found movies with this name ...</h1>
          </div>
        ))}
    </div>
  );
};

export default MainNavbar;
