import dbConnect from "@/lib/dbConnect";
import Movies from "@/models/Movies";

export async function GET() {
  try {
    dbConnect();
    const movie = await Movies.aggregate([{ $sample: { size: 1 } }]);
    if(!movie.length) {
        return new Response(JSON.stringify({ success: false, message: "No movies found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: true, movie: movie[0] }));
  } catch (error) {
    console.error("Error fetching movie:", error);
    return new Response(JSON.stringify({ success: false, message: "Error fetching movie" }), { status: 500 });
  }
}
