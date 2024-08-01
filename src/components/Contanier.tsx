
import React from "react";
import { Movie } from "@/models/Movies";
import ListItem from "./ListItem";
import "./container.css";

interface ContainerProps {
  results: Movie[];
}


const Container: React.FC<ContainerProps> = ({ results }) => {
  let movie: Movie[] = [];
  let series: Movie[] = [];
  for (let i = 0; i < results.length; i++) {
    if (results[i].isSeries) {
      series.push(results[i]);
    } else {
      movie.push(results[i]);
    }
  }

  return (
    <div className="container">
      {movie.length > 0 && <div className="section-title">Movies</div>}
      <div className="movie-grid" >
        {movie.map((m) => (
          <>
          <div >
            <ListItem key={m._id as string} m={m} />
          </div>
          </>
        ))}
      </div>
      {series.length > 0 && <div className="section-title">Series</div>}
      <div className="series-grid">
        {series.map((m) => (
          <ListItem key={m._id as string} m={m} />
        ))}
      </div>
    </div>
  );
};

export default Container;
