// Separation of Concerns: Keeping Mongoose models and Zod schemas separate helps in maintaining a clear separation of concerns. Models are responsible for interacting with the database, while schemas are used for validation logic.


import mongoose,{Schema , Document} from "mongoose"
// import ProfileSchema from "./Profile"
const cloudinaryUrl = 'https://res.cloudinary.com/dpexuin43/image/upload/uualmq690hkn2ch4zkyk.jpg';

// Document for type safety
//Schema is used to define the structure of documents in a collection , and zDocument is an interface representing a Mongoose document for type safety in TypeScript.


export interface Profile extends Document {
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

export interface User extends Document {
    email: string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isAdmin: boolean;
    dateOfBuying: Date;
    dateOfExpiring: Date;
    // profiles: mongoose.Types.DocumentArray<mongoose.Document>; // Use DocumentArray for subdocuments
    profiles: Profile[]
  }


const UserSchema:Schema<User> = new Schema({
    // "Username is required": This is a custom error message that will be returned if the username field is missing when a document is validated

    email: {
        type: String, 
        required: [true,"Email is required"],
        unique:true,
        match:[/.+\@.+\..+/,'please use a valid email address']
    },
    password: {
        type: String, 
        required:[true,"Password is required"]
    },
    verifyCode: {
        type: String, 
        required:[true,"Verify Code is required"]
    },
    verifyCodeExpiry: {
        type: Date, 
        required:[true,"Verify Code Expiry is required"],
    },
    isAdmin: {
        type: Boolean,  // true for admin, false for normal user
        default:false
    },
    dateOfBuying: {
        type: Date, 
        default:null
    },
    dateOfExpiring: {
        type: Date, 
        default:null
    },
    profiles: [ProfileSchema],
    
},{timestamps:true})

/*   // profiles:[
    //     {
    //         name: {
    //             type : String,
    //             required: [true, "Profile name is required"]
    //         },
    //         avatar: {
    //             type : String,
    //             required: [true, "Avatar field is required"],
    //         },
    //         watchHistory : []
    //     }
    // ]*/

//This line is used to either retrieve an existing Mongoose model named User or create a new one if it doesn't already exist. Let's break down each part:

//mongoose.models.User retrieves the existing User model if it exists. If it doesn't exist, it will be undefined.

//mongoose.model<User>("User", UserSchema):
//mongoose.model is a method used to create a new Mongoose model.

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User",UserSchema))


export default UserModel


// next js application is not running all time so database connection is not established always it works on edge framework which means when user request then work

// Database connection establish when request take place

// sometime when database connection is already establish when new request take place so early to previous therefore we have to check whether previous establish