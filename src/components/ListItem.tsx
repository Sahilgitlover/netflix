import React, { useState } from "react";
import { Movie } from "@/models/Movies";
import "./listitem.css";
import axios from "axios";

interface ContainerProps {
  m: Movie;
}
const deleteHandler = async(m:Movie) => {
    if(!m) return;

    try {
        const movieId = String(m._id); 

        const query = new URLSearchParams({
            id: movieId,
        }).toString();

        console.log(query);

        await axios.delete(`/api/movies/deleteMovies?${query}`);
        console.log("Movie deleted successfully");
    } catch (error:any) {
        console.log("Error", error.message);
    }
};

const ListItem: React.FC<ContainerProps> = ({ m }) => {
  const [isHovered, setIsHovered] = useState(false);

  const hovered = () => {
    setIsHovered(true);
  };
  const notHovered = () => {
    setIsHovered(false);
  };

  // Parse createdAt to a Date object
  const createdAt = (m as any).createdAt;
  const createdAtDate = new Date(createdAt);

  return (
    <div>
      <div
        key={m._id as string}
        className="list-item"
        onMouseEnter={hovered}
        onMouseLeave={notHovered}
      >
        {!isHovered && (
          <>
            <img src={m.imgSm} alt={m.title} className="list-item-img" />
          </>
        )}
        {isHovered && (
          <div className="list-item-hovered">
            <video
              src={m.trailer}
              autoPlay={true}
              muted
              loop
              className="video"
            />
            <div className="itemInfo">
              <div className="itemInfoTop">
                <span>{m.title}</span>
                <span className="limit">+{m.limit}</span>
                <span>{createdAtDate.getFullYear()}</span> {/* Display year */}
              </div>
              <div className="desc">{m.desc}</div>
              <div className="genre">{m.genre}</div>
            </div>
          </div>
        )}
      </div>
      {!isHovered && (
        <button
          onClick={() => deleteHandler(m)}
          className=" m-[10px]  bg-red-700 w-fit  p-2 rounded-sm mt-3"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default ListItem;
