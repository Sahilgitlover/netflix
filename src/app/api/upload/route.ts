import dbConnect from "@/lib/dbConnect";
import { uploadImage, uploadVideo } from "@/lib/upload-image";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await dbConnect();
  try {
    const formData = await req.formData();
    const type = req.nextUrl.searchParams.get("type");

    if (!type) {
      return NextResponse.json(
        { success: false, message: "Missing type parameter" },
        { status: 400 }
      );
    }

    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 }
      );
    }

    let uploadResult:any;
    if (type === "trailer" || type === "videos") {
      uploadResult = await uploadVideo(file, "nextjs-netflix");
    } else {
      uploadResult = await uploadImage(file, "nextjs-netflix");
    }

    console.log( uploadResult);
    

    return NextResponse.json(
      { success: true, url: uploadResult?.secure_url },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error uploading file:", error.message);
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
};
