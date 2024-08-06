'use client'
import React, { useEffect, useState } from "react";
import List from "@/components/List";
import Browsing from "@/components/Browsing";
import { Movie } from "@/models/Movies";
import axios from "axios";
const ParentComponent: React.FC<{ movieArray: Movie[], randomMovie:Movie }> = ({ movieArray, randomMovie }) => {
  const [hoveredMovieId, setHoveredMovieId] = useState(false)
  const [isMuted, setIsMuted] = useState(true);
  const [movies, setMovies] = useState([])

  useEffect(() => {
    async function getData2() {
      try {
        const profileLogin = sessionStorage.getItem("name");
        const res = await axios.get("/api/getWatchHistory", {
          params: {
            profileLogin: profileLogin,
          },
        });
        setMovies(res.data.movies)
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    }
    getData2();
  },[])

  return (
    <div className=" overflow-x-hidden">
      <Browsing randomMovie={randomMovie} hoveredMovieId={hoveredMovieId} isMuted={isMuted}
        setIsMuted={setIsMuted} />
      <List
      text={"Your next watch"}
        movieArray={movieArray}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        setHoveredMovieId={setHoveredMovieId}
        hoveredMovieId={hoveredMovieId}
      />
      <List
      text={"Watch History"}
        movieArray={movies}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        setHoveredMovieId={setHoveredMovieId}
        hoveredMovieId={hoveredMovieId}
      />
    </div>
  );
};

export default ParentComponent;
