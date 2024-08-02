import React, { cache } from "react";
import List from "@/components/List";
import dbConnect from "@/lib/dbConnect";
import Movies, { Movie } from "@/models/Movies";

async function getData() {
  try {
    await dbConnect();
    const res = await fetch("http://localhost:3000/api/getRandom12Movies");
    const data = await res.json();
    return data.movie;
  } catch (error) {
    console.error("Error fetching movie:", error);
    process.exit(1);
  }
}

const Lists = async () => {
  const data:Movie[] = await getData();

  return (
    <div>
      <h1>
        {Array.from(data, (x) => {
          return (
            <div>
              <h1 className=" block">{x.title}</h1>
              <h2 className=" block">{x.desc}</h2>
              <video width={500} autoPlay muted src={x.trailer} />
            </div>
          );
        })}
      </h1>
    </div>
  );
};

export default Lists;
