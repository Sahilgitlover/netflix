'use client'
import React, { useState } from "react";
import List from "@/components/List";
import Browsing from "@/components/Browsing";
import { Movie } from "@/models/Movies";
const ParentComponent: React.FC<{ movieArray: Movie[], randomMovie:Movie }> = ({ movieArray, randomMovie }) => {
  const [hoveredMovieId, setHoveredMovieId] = useState(false)
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className=" overflow-x-hidden">
      <Browsing randomMovie={randomMovie} hoveredMovieId={hoveredMovieId} isMuted={isMuted}
        setIsMuted={setIsMuted} />
      <List
        movieArray={movieArray}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        setHoveredMovieId={setHoveredMovieId}
        hoveredMovieId={hoveredMovieId}
      />
      
    </div>
  );
};

export default ParentComponent;
