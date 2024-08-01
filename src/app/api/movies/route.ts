import dbConnect from "@/lib/dbConnect";
import { uploadImage, uploadVideo } from "@/lib/upload-image";
import MovieModel, { Movie } from "@/models/Movies";
import { NextRequest, NextResponse } from "next/server";

// export const POST = async(req:NextRequest) => {
//   await dbConnect();
//   try {
//       const formData = await req.formData();
//       const { title, desc, limit, isSeries, genre } = Object.fromEntries(formData.entries());

//       if(!title || !desc ) {
//           return new Response(
//               JSON.stringify({ success: false, message: "Missing field" }),
//               { status: 400 }
//           );
//       }

//       console.log("Before Uploading anything...");

//       const trailer = formData.get("trailer") as File;
//       const videos = formData.get("videos") as File;
//       const imgSm = formData.get("imgSm") as File;
//       const img = formData.get("img") as File;
//       const imgTitle = formData.get("imgTitle") as File;

//       console.log("After getting data...");

//       const imgSmData:any = await uploadImage(imgSm, "nextjs-netflix");

//       console.log("After uploading imgSmData...");
//       const imgTitleData:any = await uploadImage(imgTitle, "nextjs-netflix");

//       console.log("After uploading imgTitleData...");
//       const imgData:any = await uploadImage(img, "nextjs-netflix");

//       console.log("After uploading imgData...");

//       const trailerData:any = await uploadVideo(trailer, "nextjs-netflix");
//       console.log("After uploading trailerData...");

//       const videosData:any = await uploadVideo(videos, "nextjs-netflix");
//             console.log("After uploading videosData...");

//       const movie = new MovieModel({
//           title,
//           desc,
//           limit,
//           isSeries,
//           genre,
//           imgSm: imgSmData?.secure_url,
//           trailer: trailerData?.secure_url,
//           img: imgData?.secure_url,
//           imgTitle: imgTitleData?.secure_url,
//           videos: [videosData?.secure_url]
//       });

//       await movie.save();

//       return NextResponse.json(
//           { msg: 'Upload successful' },
//           { status: 200 }
//       );

//   } catch (error: any) {
//       console.error("Error uploading image:", error.message);
//       return NextResponse.json({ msg: error.message }, { status: 500 });
//   }
// };

export const POST = async (req: NextRequest) => {
    await dbConnect();
  try {
  const data:any = await req.json();
  const {
    title,
    desc,
    limit,
    isSeries,
    genre,
    trailer,
    videos,
    imgSm,
    img,
    imgTitle,
  } = data;

  if (
    !title ||
    !desc ||
    !limit ||
    !genre ||
    !trailer ||
    !videos ||
    !imgSm ||
    !img ||
    !imgTitle
  ) {
    return new Response(
      JSON.stringify({ success: false, message: "Missing field" }),
      { status: 400 }
    );
  }

  const newMovie = new MovieModel({
    title,
    desc,
    limit,
    isSeries,
    genre,
    imgSm,
    trailer,
    img,
    imgTitle,
    videos: [trailer, ...videos],
  });
  await newMovie.save();
  if(!newMovie) {
    return new Response(JSON.stringify({ success: false, message: "Movie not created" }), { status: 500 });
  }
  MovieModel.find({ title: { $eq: title } });
 return new Response(
      JSON.stringify({
        success: true,
        message: "Movie created successfully",
        newMovie: newMovie,
      }),
      { status: 200 }
    );
}
catch(error:any){
    console.error("Error creating movie:", error.message);
    return new Response(JSON.stringify({ success: false, message: "Error creating movie" }), { status: 500 });
}
};
