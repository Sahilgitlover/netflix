"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import { log } from "console";
import { ApiResponse } from "@/types/ApiResponse";
import { useRouter } from "next/navigation";
const imageMap: Record<ImageKey, string> = {
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
  const [name, setName] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<ImageKey | null>(null);

  const router = useRouter();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleImageClick = (imageKey: ImageKey) => {
    setSelectedImage(imageKey);
  };

  const handleSubmit = async () => {
    if (!selectedImage || !name) {
      alert("Please select an image and enter a name");
      return;
    }

    try {
      const res = await axios.post("/api/saveAvatar", {
        name,
        selectedImage,
      });
      console.log(res);

      router.push("/SelectProfile");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage =
        axiosError.response?.data.message || "An error occurred";
      console.error("Error saving profile:", error);
      alert(errorMessage);
    }
  };

  return (
    <div className="w-screen h-screen overflow-x-hidden flex flex-col items-center p-8">
      <div className="flex flex-col items-center flex-grow">
        <h1 className="text-5xl my-12">Create Profile</h1>
        <div className="grid grid-cols-5 justify-center items-center gap-8 mb-8">
          {Object.keys(imageMap).map((key) => (
            <div key={key} onClick={() => handleImageClick(key as ImageKey)}>
              <Image
                src={imageMap[key as ImageKey]}
                width={200}
                height={200}
                className={`relative ${
                  selectedImage === key ? "border-4 border-blue-500" : ""
                }`}
                alt={key}
              />
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label htmlFor="inputField" className="mr-4 text-lg">
            Name
          </label>
          <input
            type="text"
            id="inputField"
            placeholder="Avatar name..."
            className="bg-black text-white px-4 py-2 border rounded-lg"
            value={name}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
      >
        Save Profile
      </button>
    </div>
  );
};

export default Page;
