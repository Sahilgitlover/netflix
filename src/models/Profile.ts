import mongoose, { Schema, Document } from 'mongoose';
import Image from 'next/image';
const cloudinaryUrl = 'https://res.cloudinary.com/dpexuin43/image/upload/uualmq690hkn2ch4zkyk.jpg';


interface Profile extends Document {
  name: string;
  avatar: string;
  watchHistory: string[]; // Adjust the type as needed
}

const ProfileSchema: Schema<Profile> = new Schema({
  name: {
    type: String,
    required: [true, "Profile name is required"],
    default: "Profile1",
  },
  avatar: {
    type: String,
    required: [true, "Avatar field is required"], 
    default: cloudinaryUrl,  // Default avatar image URL
  },
  watchHistory: {
    type: [String], // Assuming watch history is an array of strings, adjust as needed
    default: []
  }
});

export default mongoose.models.Profile || mongoose.model<Profile>('Profile', ProfileSchema);
