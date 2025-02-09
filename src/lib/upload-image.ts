import cloudinary from "./cloudinary";
import { Readable } from 'stream';

export const uploadImage = async (file: File, folder: string) => {
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({
            resource_type: "image",
            folder: folder
        }, (err, result) => {
            if (err) {
                return reject(err.message);
            } else {
                return resolve(result);
            }
        }).end(bytes)
    });
}

export const uploadVideo = async (file: File, folder: string) => {
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer).toString()
    // console.log(bytes);
    
    return new Promise((resolve, reject) => {
        const publicId = Date.now().toString(); // Unique identifier to remove the original name

        // Call upload_large with appropriate options
        cloudinary.uploader.upload_large(
            bytes, // Use the bytes directly
            {
                resource_type: "video",
                folder: folder,
                public_id: publicId,
                chunk_size: 6000000 // Set the chunk size for large files
            },
            (err, result) => {
                if (err) {
                    return reject(err.message);
                } else {
                    return resolve(result);
                }
            }
        );
    });
}

export const deleteImage = async (public_id: string) => {

    return new Promise(async(resolve, reject) => {
        try {
            const result = await cloudinary.uploader.destroy(
                public_id,
            )
            return resolve(result);
        } catch (error:any) {
            reject(new Error(error.message));
        }
    })
}