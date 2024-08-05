import dbConnect from "@/lib/dbConnect";
import Movies from "@/models/Movies";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest) {
    const prefix = request.nextUrl.searchParams.get("title");
    console.log(prefix);
    if (!prefix) {
      return new Response(
        JSON.stringify({ success: false, message: "Prefix is required" }),
        { status: 400 }
      );
    }
  try {
    await dbConnect();
    const movie = await Movies.findById(prefix);
    if(!movie) {
        return new Response(JSON.stringify({ success: false, message: "No movies found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: true, movie: movie }));
  } catch (error) {
    console.error("Error fetching movie:", error);
    return new Response(JSON.stringify({ success: false, message: "Error fetching movie" }), { status: 500 });
  }
}
