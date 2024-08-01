"use client";
import React, { FC, useState } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import "../app/browse/browsing.css";

const MainNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMovement, setIsMovement] = useState(false);

  if (typeof window !== "undefined") {
    window.onscroll = () => {
      setIsScrolled(window.scrollY !== 0);
    };
  }

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
            <span className="mr-[20px] cursor-pointer">Homepage</span>

            <Link href="/series" className="link">
              <span className="mr-[20px] cursor-pointer">Series</span>
            </Link>

            <Link href="/movies" className="link">
              <span className="mr-[20px] cursor-pointer">Movies</span>
            </Link>

            <span className="mr-[20px] cursor-pointer">New and Popular</span>
            <span className="mr-[20px] cursor-pointer">My List</span>
          </div>

          <div className="relative flex items-center">
            <FaSearch size={20} className="my-0 mx-[15px] cursor-pointer" />
            <span>Children</span>
            <IoIosNotificationsOutline
              size={28}
              className="my-0 mx-[15px] cursor-pointer"
            />
            <div
              onMouseEnter={() => setIsMovement(true)}
              onMouseLeave={() => setIsMovement(false)}
            >
              <button className="flex justify-center items-center">
                <img
                  src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt="Profile"
                  className="rounded-md object-cover w-[30px] h-[30px] cursor-pointer"
                />
                {isMovement ? (
                  <IoMdArrowDropup className="my-0 mx-[5px] cursor-pointer" />
                ) : (
                  <IoMdArrowDropdown className="my-0 mx-[5px] cursor-pointer" />
                )}
              </button>
              {isMovement && (
                <div>
                  <div className="absolute top-1 left-[170px] h-12 w-14"></div>
                  <IoMdArrowDropup className="absolute top-10 left-[165px] my-0 mx-[15px] cursor-pointer" />
                  <div className="absolute top-14 right-1 w-56 bg-black bg-opacity-60">
                    <div className="flex flex-col" id="options">
                      <Link href="/" className="my-2 mx-2 text-white">
                        Settings
                      </Link>
                      <Link href="/" className="my-2 mx-2 text-white">
                        Logout
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
