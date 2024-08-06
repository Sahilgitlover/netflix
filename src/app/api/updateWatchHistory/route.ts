import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/models/User";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { profileLogin, movieId } = await request.json(); // Get data from request body

    if (!profileLogin || !movieId) {
      return new Response(
        JSON.stringify({ success: false, message: "Profile or movieId not provided" }),
        { status: 400 }
      );
    }

    await dbConnect();
    const cookieStore = cookies();
    const hasCookie = cookieStore.get("id");

    if (!hasCookie?.value) {
      return new Response(
        JSON.stringify({ success: false, message: "No valid cookie found" }),
        { status: 400 }
      );
    }

    // Find the user by ID
    const user: User | null = await UserModel.findById(hasCookie.value).exec();

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }

    // Update the watch history for the specified profile
    const profile = user.profiles.find(profile => profile.name === profileLogin);

    if (!profile) {
      return new Response(
        JSON.stringify({ success: false, message: "Profile not found" }),
        { status: 404 }
      );
    }

    // Add the movieId to the watch history if it doesn't already exist
    if (!profile.watchHistory.includes(movieId)) {
      profile.watchHistory.push(movieId);
    }

    await user.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Watch history updated successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating watch history:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error updating watch history" }),
      { status: 500 }
    );
  }
}
