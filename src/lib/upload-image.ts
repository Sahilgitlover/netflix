import cloudinary from "./cloudinary";

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
    const bytes = Buffer.from(buffer);

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({
            resource_type: "video",
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