"use client";
import React, { useEffect, useState } from "react";
import InfoSection from "@/components/InfoSection";
import { useSearchParams } from "next/navigation";
import Movies, { Movie } from "@/models/Movies";
import axios from "axios";

const Page = () => {
  const params = useSearchParams();
  const movie = params.get("movie");
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

export default Page;
