import cloudinary from "@/lib/cloudinary";

const getVideoDuration = async (publicId: string) => {
  try {
    const result = await cloudinary.api.resource(publicId, {
      resource_type: "video",
    });
    const duration = result.duration; // Duration in seconds
    console.log(`Video duration: ${duration} seconds`);
    return duration;
  } catch (error) {
    console.error("Error fetching video details:", error);
    throw error;
  }
};

// Example usage
const videoPublicId = "nextjs-netflix/q1qyljz3q0tginhtcrmg"; // Replace with your actual video public ID
getVideoDuration(videoPublicId)
  .then((duration) => {
    console.log(`The duration of the video is ${duration} seconds.`);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
