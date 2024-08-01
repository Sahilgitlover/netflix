import { sendVerificationEmail } from "@/helpers/sendVerificationEmails";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, password } = await request.json();

    // Input validation
    if (!email || !password) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email and password are required",
        }),
        { status: 400 }
      );
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return new Response(
        JSON.stringify({ success: false, message: "Email already exists" }),
        { status: 400 }
      );
    }

    const verifyCodeOtp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const hashedPassword = await bcrypt.hash(password, 10);
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    const newUser = new UserModel({
      email,
      password: hashedPassword,
      verifyCode: verifyCodeOtp,
      verifyCodeExpiry: expiryDate,
    });

    await newUser.save();

    const emailResponse = await sendVerificationEmail(email, verifyCodeOtp);

    if (!emailResponse.success) {
      return new Response(
        JSON.stringify({ success: false, message: emailResponse.message }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "User registered successfully. Please verify your email",
        id: newUser._id
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error registering user" }),
      { status: 500 }
    );
  }
}