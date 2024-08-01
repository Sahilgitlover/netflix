import mongoose, { Schema, Document } from "mongoose";

export interface Movie extends Document {
  trailer: string;
  videos: string[];
  isSeries: boolean;
  desc: string;
  title: string;
  limit: number;
  genre: GenreValues;
  imgTitle: string;
  imgSm: string;
  img: string;
}

enum GenreValues {
  ACTION = "action",
  ROMANCE = "romance",
  DRAMA = "drama",
  COMEDY = "comedy",
  THRILLER = "thriller",
  HORROR = "horror",
  SCIFI = "sci-fi",
  CRIME = "crime",
  BOLLYWOOD = "bollywood",
  HOLLYWOOD = "hollywood"
}

const MovieSchema: Schema<Movie> = new Schema(
  {
    trailer: { type: String, required: true },
    videos: [{ type: String,required: true }],
    isSeries: { type: Boolean, default: false },
    desc: { type: String, required: true },
    title: { type: String, required: true},
    limit: { type: Number, default: 16 },

    //Object.values(GenreValues) will return:
    //["action", "romance", "drama", "comedy", "thriller", "horror", "sci-fi", "crime", "bollywood", "hollywood"]

    genre: {
      type: String,
      enum: Object.values(GenreValues),
      required: true,
      default: GenreValues.BOLLYWOOD
    },
    imgTitle: { type: String },
    imgSm: { type: String, required: true },
    img: { type: String }
  },
  { timestamps: true }
);
export default mongoose.models.Movie || mongoose.model<Movie>("Movie", MovieSchema);