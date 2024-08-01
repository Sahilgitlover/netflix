import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ success: false, message: "Email and password are required" }),
        { status: 400 }
      );
    }

    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return new Response(
        JSON.stringify({ success: false, message: "User does not exist" }),
        { status: 400 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      return new Response(
        JSON.stringify({ success: false, message: "Incorrect password" }),
        { status: 400 }
      );
    }

    sessionStorage.setItem('user', existingUser._id as string);

    return new Response(
      JSON.stringify(
        {
        success: true,
        message: "Logged in successfully" ,
        id: existingUser._id
        }
      ),
      { status: 200 }
    );

  } catch (error) {
    console.error('Error logging in user:', error);
    return new Response(
      JSON.stringify({ success: false, message: "Error logging in user" }),
      { status: 500 }
    );
  }
}