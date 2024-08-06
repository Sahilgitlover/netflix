import mongoose, { Schema, Document } from "mongoose";

export interface Profile extends Document {
  name: string;
  avatar: string;
  watchHistory: string[];
}

const ProfileSchema: Schema<Profile> = new Schema({
  name: {
    type: String,
    // required: [true, "Profile name is required"],
    // default: "Profile1",
    // unique: true,
  },
  avatar: {
    type: String,
    // required: [true, "Avatar field is required"],
    // default: 'abcd', // Default avatar image URL
  },
  watchHistory: {
    type: [String], // Assuming watch history is an array of strings, adjust as needed
    default: [],
  },
});

export interface User extends Document {
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isAdmin: boolean;
  dateOfBuying: Date;
  dateOfExpiring: Date;
  // profiles: mongoose.Types.DocumentArray<mongoose.Document>; // Use DocumentArray for subdocuments
  profiles: Profile[];
}

const UserSchema: Schema<User> = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+\@.+\..+/, "please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    verifyCode: {
      type: String,
      required: [true, "Verify Code is required"],
    },
    verifyCodeExpiry: {
      type: Date,
      required: [true, "Verify Code Expiry is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    dateOfBuying: {
      type: Date,
      default: null,
    },
    dateOfExpiring: {
      type: Date,
      default: null,
    },
    profiles: [ProfileSchema],
  },
  { timestamps: true }
);

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
