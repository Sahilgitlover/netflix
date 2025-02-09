"use client";
import React, { Suspense } from "react";
import MoviesPageContent from "./MoviesPageContent"; // Your MoviesPage logic split out

const MoviesPage = () => {
  return (
    <Suspense fallback={<div>Loading movies...</div>}>
      <MoviesPageContent />
    </Suspense>
  );
};

export default MoviesPage;
