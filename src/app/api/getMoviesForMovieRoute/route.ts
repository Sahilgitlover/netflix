import dbConnect from "@/lib/dbConnect";
import Movies, { Movie } from "@/models/Movies";

export async function GET(request: Request) {
  try {
    await dbConnect();

    // Extract the Series query parameter
    const url = new URL(request.url);
    const isSeries = url.searchParams.get("Series") === "true";

    // Construct the aggregation pipeline based on the Series parameter
    const pipeline = [
      { $match: { isSeries: isSeries } }, // Filter based on the Series parameter
      { $sample: { size: 12 } } // Randomly select 12 documents
    ];

    const movie = await Movies.aggregate(pipeline);

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
