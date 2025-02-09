"use client";
import React, { Suspense, useEffect, useState } from "react";
import InfoSection from "@/components/InfoSection";
import { useSearchParams } from "next/navigation";
import { Movie } from "@/models/Movies";
import axios from "axios";

// Component that uses useSearchParams and fetches data
const PageContent = () => {
  const searchParams = useSearchParams();
  const movie = searchParams.get("movie");
  const [res, setRes] = useState<Movie | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`/api/getMovieById?title=${movie}`);
        console.log(response.data.movie);
        setRes(response.data.movie);
      } catch (error: any) {
        console.log("Error", error.message);
      }
    }
    if (movie) {
      getData();
    }
  }, [movie]);

  return (
    <div>
      {res ? <InfoSection response={res} /> : <div>Loading...</div>}
    </div>
  );
};

// Wrap the component in a Suspense boundary with a fallback
const Page = () => {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <PageContent />
    </Suspense>
  );
};

export default Page;
