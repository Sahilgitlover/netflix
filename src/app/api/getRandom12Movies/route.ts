import dbConnect from "@/lib/dbConnect";
import Movies, { Movie } from "@/models/Movies";

export async function GET  () {
    try {
        await dbConnect();
        const movie = await Movies.aggregate([{ $sample: { size: 12 } }]);
        if(!movie.length) {
            return new Response(JSON.stringify({ success: false, message: "No movies found" }), { status: 404 });
        }
        return new Response(JSON.stringify({ success: true, movie: movie }));
      } catch (error) {
        console.error("Error fetching movie:", error);
        return new Response(JSON.stringify({ success: false, message: "Error fetching movie" }), { status: 500 });
      }
}