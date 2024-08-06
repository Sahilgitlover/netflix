import dbConnect from "@/lib/dbConnect";
import Movies, { Movie } from "@/models/Movies";
import UserModel, { User } from "@/models/User";
import { cookies } from "next/headers";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const profileLogin = url.searchParams.get("profileLogin");
  
    if (!profileLogin) {
      return new Response(
        JSON.stringify({ success: false, message: "Profile not provided" }),
        { status: 400 }
      );
    }
  try {
    await dbConnect();
    const cookieStore = cookies();
    const hasCookie = cookieStore.get("id");

    if (!hasCookie?.value) {
      return new Response(
        JSON.stringify({ success: false, message: "No valid cookie found" }),
        { status: 400 }
      );
    }

    // Await the query to get the actual User document
    const user: User | null = await UserModel.findById(String(hasCookie.value)).exec();

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }
    let watchHistory: string[] = [];
    for (let i = 0; i < user.profiles.length; i++) {
      if (user.profiles[i].name === profileLogin) {
        watchHistory = user.profiles[i].watchHistory;
        break;
      }
    }

    let movies:Movie[] = []
    for(let idx = 0; idx < watchHistory.length; idx++){
        const movie = await Movies.findById(watchHistory[idx]);
        movies.push(movie);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Watch History fetched successfully",
        movies: movies,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching watch history:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching watch history" }),
      { status: 500 }
    );
  }
}
