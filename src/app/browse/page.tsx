import React from "react";
import Browsing from "@/components/Browsing";
import Parent from "@/components/Parent";
import dbConnect from "@/lib/dbConnect";
import Movies, { Movie } from "@/models/Movies";

async function getData() {

  try {
    await dbConnect();
    // const res = await fetch("http://localhost:3000/api/getRandom12Movies",{next: {revalidate: 180}});
    const res = await fetch("http://localhost:3000/api/getRandom12Movies");
    const data = await res.json();
    return data.movie;
  } catch (error) {
    console.error("Error fetching movie:", error);
    process.exit(1);
  }
}

const page = async () => {
  const data: Movie[] = await getData();
  const randomValue = Math.floor(Math.random() * 12);

  return (
    <div>
      <Parent movieArray={data} randomMovie={data[randomValue]}></Parent>
    </div>
  );
};

export default page;
