"use client";

import axios from "axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import React, { ChangeEvent, useState } from "react";
import "./movies.css";

const UploadPage: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [limit, setLimit] = useState<number>(16);
  const [isSeries, setIsSeries] = useState<boolean>(false);
  const [genre, setGenre] = useState<string>("action");
  const [image, setImage] = useState<File | null>(null);
  const [imgSm, setImgSm] = useState<File | null>(null);
  const [imgTitle, setImgTitle] = useState<File | null>(null);
  const [trailer, setTrailer] = useState<File | null>(null);
  const [videos, setVideos] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [imgData, setImageData] = useState<string>("");
  const [imgSmData, setImageSmData] = useState<string>("");
  const [imgTitleData, setImageTitleData] = useState<string>("");
  const [trailerData, setTrailerData] = useState<string>("");
  const [videosData, setVideosData] = useState<string[]>([]);

  const [totalVideos, setTotalVideos] = useState<number>(1);

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files) {
      setter(e.target.files[0]);
    }
  };

  const uploadFile = async (file: File | null, type: string) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsLoading(true);
      const res = await axios.post(`/api/upload?type=${type}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data.url);
      if (type === "image") {
        setImageData(res.data.url);
      } else if (type === "imgSm") {
        setImageSmData(res.data.url);
      } else if (type === "imgTitle") {
        setImageTitleData(res.data.url);
      } else if (type === "videos") {
        setVideosData((prev) => [...prev, res.data.url]);
      } else {
        setTrailerData(res.data.url);
      }
    } catch (error: any) {
      console.log("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoChange = (index: number, file: File | null) => {
    const newVideos = [...videos];
    if (file) {
      newVideos[index] = file;
    } else {
      newVideos.splice(index, 1);
    }
    setVideos(newVideos);
  };

  const submitHandler = async (e: React.FormEvent) => {
    console.log(trailerData);

    e.preventDefault();
    if (
      !title ||
      !desc ||
      !imgData ||
      !imgSmData ||
      !imgTitleData ||
      !trailerData ||
      !videosData.length ||
      !limit ||
      !genre
    ) {
      alert("All fields are required");
      return;
    }
    setIsLoading(true);
    try {
      const data = {
        title,
        desc,
        limit,
        isSeries,
        genre,
        imgSm: imgSmData,
        trailer: trailerData,
        img: imgData,
        imgTitle: imgTitleData,
        videos: videosData,
      };
      const res = await axios.post("/api/movies", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const videosNumberHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setTotalVideos(value);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-teal-600 text-black h-fit p-8 rounded-md">
        <h1 className="text-3xl font-bold text-center">Create Movie</h1>
        <div className="border-y mb-4"></div>
        <form onSubmit={submitHandler}>
          <div className="flex w-full mb-4">
            <label htmlFor="title" className="w-40 text-xl mt-2">
              Title
            </label>
            <input
              className="w-full p-2 rounded-sm bg-gray-700 text-white"
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex w-full mb-4">
            <label htmlFor="desc" className="w-40 text-xl mt-2">
              Description
            </label>
            <input
              className="w-full p-2 rounded-sm bg-gray-700 text-white"
              type="text"
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
          </div>
          <div className="flex w-full mb-4">
            <label htmlFor="limit" className="w-40 text-xl mt-2">
              Limit
            </label>
            <input
              className="w-full p-2 rounded-sm bg-gray-700 text-white"
              type="number"
              id="limit"
              value={limit}
              onChange={(e) => setLimit(parseInt(e.target.value))}
              required
            />
          </div>
          <div className="flex w-full mb-4">
            <label htmlFor="isSeries" className="w-28 text-xl mt-2">
              Is Series
            </label>
            <input
              type="checkbox"
              id="isSeries"
              checked={isSeries}
              onChange={(e) => {
                setVideos([]);
                setVideosData([]);
                setIsSeries(e.target.checked);
              }}
            />
          </div>
          {isSeries && (
            <div className="flex w-full mb-4">
              <label htmlFor="videos" className="w-40 text-xl mt-2">
                Videos no.
              </label>
              <input
                className="w-full p-2 rounded-sm bg-gray-700 text-white"
                type="number"
                id="videos"
                value={totalVideos}
                onChange={videosNumberHandler}
              />
            </div>
          )}
          <div className="flex w-full mb-4">
            <label htmlFor="genre" className="w-40 text-xl mt-2">
              Genre
            </label>
            <select
              className="w-full p-2 rounded-sm bg-gray-700 text-white"
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="action">Action</option>
              <option value="romance">Romance</option>
              <option value="drama">Drama</option>
              <option value="comedy">Comedy</option>
              <option value="thriller">Thriller</option>
              <option value="horror">Horror</option>
              <option value="sci-fi">Sci-Fi</option>
              <option value="crime">Crime</option>
              <option value="bollywood">Bollywood</option>
              <option value="hollywood">Hollywood</option>
            </select>
          </div>
          <div className="relative flex w-full mb-4">
            <label htmlFor="img" className="w-40 text-xl mt-2">
              Image
            </label>
            <input
              className="w-full p-2 rounded-sm bg-gray-700 text-white"
              onChange={(e) => onChangeHandler(e, setImage)}
              type="file"
              id="img"
              required
            />
            <button
              className="absolute right-0"
              type="button"
              onClick={() => uploadFile(image, "image")}
            >
              <IoCloudUploadSharp className="w-12 h-[45px] rounded-md" />
            </button>
          </div>

          <div className="relative flex w-full mb-4">
            <label htmlFor="imgSm" className="w-40 text-xl mt-2">
              Image Sm
            </label>
            <input
              className="w-full p-2 rounded-sm bg-gray-700 text-white"
              onChange={(e) => onChangeHandler(e, setImgSm)}
              type="file"
              id="imgSm"
              required
            />
            <button
              className="absolute right-0"
              type="button"
              onClick={() => uploadFile(imgSm, "imgSm")}
            >
              <IoCloudUploadSharp className="w-12 h-[45px] rounded-md" />
            </button>
          </div>
          <div className="relative flex w-full mb-4">
            <label htmlFor="imgTitle" className="w-40 text-xl mt-2">
              Image Title
            </label>
            <input
              className="w-full p-2 rounded-sm bg-gray-700 text-white"
              onChange={(e) => onChangeHandler(e, setImgTitle)}
              type="file"
              id="imgTitle"
              required
            />
            <button
              className="absolute right-0"
              type="button"
              onClick={() => uploadFile(imgTitle, "imgTitle")}
            >
              <IoCloudUploadSharp className="w-12 h-[45px] rounded-md" />
            </button>
          </div>
          <div className="relative flex w-full mb-4">
            <label htmlFor="trailer" className="w-40 text-xl mt-2">
              Trailer
            </label>
            <input
              className="w-full p-2 rounded-sm bg-gray-700 text-white"
              onChange={(e) => onChangeHandler(e, setTrailer)}
              type="file"
              id="trailer"
              required
            />
            <button
              className="absolute right-0"
              type="button"
              onClick={() => uploadFile(trailer, "trailer")}
            >
              <IoCloudUploadSharp className="w-12 h-[45px] rounded-md" />
            </button>
          </div>
          {!isSeries ? (
            <div className="relative flex w-full mb-4">
              <label htmlFor="videos" className="w-40 text-xl mt-2">
                Video
              </label>
              <input
                className="w-full p-2 rounded-sm bg-gray-700 text-white"
                onChange={(e) =>
                  handleVideoChange(
                    0,
                    e.target.files ? e.target.files[0] : null
                  )
                }
                type="file"
                id="videos"
                required
              />
              <button
                className="absolute right-0"
                type="button"
                onClick={() => uploadFile(videos[0], "videos")}
              >
                <IoCloudUploadSharp className="w-12 h-[45px] rounded-md" />
              </button>
            </div>
          ) : (
            <div>
              {Array.from({ length: totalVideos }, (_, i) => (
                <div key={i} className="relative flex w-full mb-4">
                  <label htmlFor={`video-${i}`} className="w-40 text-xl mt-2">
                    Episode {i + 1}
                  </label>
                  <input
                    className="w-full p-2 rounded-sm bg-gray-700 text-white"
                    onChange={(e) =>
                      handleVideoChange(
                        i,
                        e.target.files ? e.target.files[0] : null
                      )
                    }
                    type="file"
                    id={`video-${i}`}
                    required
                  />
                  <button
                    className="absolute right-0"
                    type="button"
                    onClick={() => uploadFile(videos[i], "videos")}
                  >
                    <IoCloudUploadSharp className="w-12 h-[45px] rounded-md" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-center items-center mt-4">
            {isLoading ? (
              <div className="loader"></div>
            ) : (
              <button
                className="bg-black text-white px-4 py-2 rounded-sm"
                type="submit"
              >
                Upload
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;


