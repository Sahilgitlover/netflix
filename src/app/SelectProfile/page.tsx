"use client";
import { Profile } from "@/models/User";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import "../../components/navbar.css"

const imageMap: Record<string, string> = {
  red: "/Red1.png",
  grey: "/grey.png",
  red2: "/red.png",
  yellow: "/yellow.png",
  yellow2: "/Yellow1.png",
  blue: "/blue.png",
  blue2: "/darkBlue.png",
};

type ImageKey =
  | "red"
  | "grey"
  | "red2"
  | "yellow"
  | "yellow2"
  | "blue"
  | "blue2";

const Page = () => {
  const [profile, setProfile] = useState<Profile[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get("/api/getProfiles");
        setProfile(res.data.profiles);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  const handleClickHandler =  (name: string, avatar: string) => {
    // set cookies and redirect to browse and handle the watchHistory route and also manage profiles button
    setLoading(true)
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("avatar", avatar);
    router.replace("/browse");
    setLoading(false)
  };

  const createHandler = () => {
    setLoading(true)
    router.replace("/createProfile");
    setLoading(false)
  };

  return (
    <div className="w-screen h-screen overflow-x-hidden flex flex-col items-center p-8">
      <div className="flex flex-col items-center flex-grow">
       {profile && profile.length > 0 && <h1 className="text-5xl my-12">Who is Watching</h1>}
       {profile && profile.length == 0 && <h1 className="text-5xl my-12">Add Profile to continue</h1>}

        {loading ? (
          <div className="w-full flex justify-center items-center h-80">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-8 w-full max-w-screen-lg">
            {profile &&
              profile.map((p) => (
                <div key={String(p._id)}>
                  <div className="relative w-48 h-48 mb-2">
                    <Image
                      src={imageMap[p.avatar]}
                      alt={p.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg hover:border-4 hover:border-blue-500"
                      onClick={() => handleClickHandler(p.name,imageMap[p.avatar])}
                    />
                  </div>
                  <div className="text-center">{p.name}</div>
                </div>
              ))}
            {profile && profile.length < 5 && (
              <div
                className="relative w-48 h-48 mb-2 flex justify-center items-center hover:bg-slate-500 hover:text-black rounded-lg"
                onClick={createHandler}
              >
                <div className=" rounded-full border-2 p-4">
                  <FaPlus className=" text-5xl" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
