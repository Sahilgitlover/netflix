
import cloudinary from "@/lib/cloudinary";
import dbConnect from "@/lib/dbConnect";
import MovieModel from "@/models/Movies";
import { NextRequest, NextResponse } from "next/server";

// Function to delete video from Cloudinary
function deleteVideo(publicId: string) {

    console.log(publicId);
    
    cloudinary.uploader
        .destroy(publicId, { resource_type: 'video' })
        .then(result => console.log(result));
}

// Function to delete image from Cloudinary
function deleteImage(publicId: string) {
    cloudinary.uploader
        .destroy(publicId, { resource_type: 'image' })
        .then(result => console.log(result));
}

// Function to generate public ID from content
function publicIdProvider(content: string): string {
    const array = content.split("nextjs-netflix");
    const array2 = array[1].split(".")
    return "nextjs-netflix" + array2[0];
}

// Named export for DELETE request
export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || typeof id !== 'string') {
        return NextResponse.json({
            success: false,
            message: "Invalid or missing id"
        }, { status: 400 });
    }

    try {
        await dbConnect();
        const movie = await MovieModel.findById(id);

        if (!movie) {
            return NextResponse.json({
                success: false,
                message: "Movie not found"
            }, { status: 404 });
        }

        // Delete resources from Cloudinary
        deleteVideo(publicIdProvider(movie.trailer));
        deleteImage(publicIdProvider(movie.imgSm));
        deleteImage(publicIdProvider(movie.img));
        deleteImage(publicIdProvider(movie.imgTitle));

        for (let i = 0; i < movie.videos.length; i++) {
            deleteVideo(publicIdProvider(movie.videos[i]));
        }

        // Delete movie document from the database
        await MovieModel.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            message: "Movie deleted successfully"
        }, { status: 200 });

    } catch (error) {
        console.log("Error deleting movie:", error);

        return NextResponse.json({
            success: false,
            message: "Error deleting movie"
        }, { status: 500 });
    }
}

