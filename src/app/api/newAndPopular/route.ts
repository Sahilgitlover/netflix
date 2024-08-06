import dbConnect from "@/lib/dbConnect";
import Movies, { Movie } from "@/models/Movies";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const movie:Movie[] = await Movies.aggregate([
      { $sort: { createdAt: -1 } }, 
      { $limit: 12 }
    ]);


    if (!movie.length) {
      return new Response(
        JSON.stringify({ success: false, message: "No movies found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ success: true, movie: movie }));
  } catch (error) {
    console.error("Error fetching movie:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching movie" }),
      { status: 500 }
    );
  }
}
