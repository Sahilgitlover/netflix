// import dbConnect from "@/lib/dbConnect";
// import UserModel from "@/models/User";
// import { cookies } from "next/headers";

// export async function GET() {
//   try {
//     await dbConnect();
//     const cookieStore = cookies();
//     const hasCookie = cookieStore.get("id");
//     console.log("cookies",hasCookie);

//     if (!hasCookie) {
//       return new Response(
//         JSON.stringify({ success: false, message: "Not found cookie" }),
//         { status: 404 }
//       );
//     }
//     const user = await UserModel.findById(hasCookie?.value).exec();
//     if (!user) {
//       return { success: false, message: "User not found" };
//     }
//     return new Response(
//       JSON.stringify({ success: true, profiles: user.profiles })
//     );
//   } catch (error) {
//     console.error("Error fetching movie:", error);
//     return new Response(JSON.stringify({ success: false, message: "Error fetching movie" }), { status: 500 });
//   }
// }
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const hasCookie = cookieStore.get("id");
  try {
    await dbConnect();

    if (!hasCookie) {
      return new Response(
        JSON.stringify({ success: false, message: "Not found cookie" }),
        { status: 404 }
      );
    }

    const user = await UserModel.findById(hasCookie?.value).exec();
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }
    return new Response(
      JSON.stringify({ success: true, profiles: user.profiles })
    );
  } catch (error) {
    console.error("Error fetching movie:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching movie" }),
      { status: 500 }
    );
  }
}
