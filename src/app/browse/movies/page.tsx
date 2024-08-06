"use client";
import List from "@/components/List";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [hoveredMovieId, setHoveredMovieId] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getMovies() {
      try {
        const res = await axios.get("/api/getMoviesForMovieRoute?Series=false");
        
        setMovies(res.data.movie);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    getMovies();
  }, []);

  return (
    <div className=" w-screen h-screen mt-24">
      <List
        text={"Movies"}
        movieArray={movies}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        setHoveredMovieId={setHoveredMovieId}
        hoveredMovieId={hoveredMovieId}
      />
    </div>
  );
};

export default page;
