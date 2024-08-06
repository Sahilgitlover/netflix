// import dbConnect from "@/lib/dbConnect";
// import UserModel from "@/models/User";
// import { cookies } from "next/headers";

// export async function POST(request: Request) {
//   await dbConnect();
//   try {
//     const { name, selectedImage } = await request.json();
//     const cookieStore = cookies();
//     const hasCookie = cookieStore.get("id");

//     if (!name || !selectedImage || !hasCookie) {
//       return new Response(
//         JSON.stringify({ success: false, message: "Field missing" }),
//         { status: 400 }
//       );
//     }

//     console.log(name,selectedImage,hasCookie);

//     const user = await UserModel.findById(hasCookie?.value);
//     if (!user) {
//       return new Response(
//         JSON.stringify({ success: false, message: "User not found" }),
//         { status: 404 }
//       );
//     }

//     // Check if the user already has a profile with the same name
//     const existingProfile = user.profiles.find(
//       (profile) => profile.name === name
//     );
//     if (existingProfile) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           message: "Profile with the same name already exists",
//         }),
//         { status: 400 }
//       );
//     }

//     const newProfile = new (UserModel as any).prototype.constructor({
//       name,
//       avatar: selectedImage,
//       watchHistory: [], // Include default value for watchHistory
//     });

//     user.profiles.push(newProfile);

//     await user.save(); // Save changes to the user document

//     return new Response(
//       JSON.stringify({
//         success: true,
//         message: "Profile saved successfully",
//         user: user.profiles,
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error saving profile:", error);
//     return new Response(
//       JSON.stringify({ success: false, message: "Error saving profile" }),
//       { status: 500 }
//     );
//   }
// }
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { cookies } from "next/headers";
import { string } from "zod";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { name, selectedImage }: { name: string; selectedImage: string } =
      await request.json();
    const cookieStore = cookies();
    const hasCookie = cookieStore.get("id");

    if (!name || !selectedImage || !hasCookie) {
      return new Response(
        JSON.stringify({ success: false, message: "Field missing" }),
        { status: 400 }
      );
    }

    const user = await UserModel.findById(hasCookie?.value);
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }

    const existingProfile = user.profiles.find(
      (profile) => profile.name === name
    );
    if (existingProfile) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Profile with the same name already exists",
        }),
        { status: 400 }
      );
    }
    const newProfile = {
      name,
      avatar: selectedImage,
      watchHistory: [],
    };

    user.profiles.push(newProfile);

    await user.save();

    return new Response(
      JSON.stringify({ success: true, message: "Profile saved successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving profile:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error saving profile" }),
      { status: 500 }
    );
  }
}
