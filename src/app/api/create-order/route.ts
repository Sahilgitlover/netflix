import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { userId } = await request.json(); // Assuming you're sending userId in the request body

    const dateOfBuying = new Date();
    const dateOfExpiring = new Date(dateOfBuying);
    dateOfExpiring.setMonth(dateOfExpiring.getMonth() + 1);

    const user = await UserModel.findById(userId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    user.dateOfBuying = dateOfBuying;
    user.dateOfExpiring = dateOfExpiring;

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "User updated successfully",
        user: {
          dateOfBuying: user.dateOfBuying,
          dateOfExpiring: user.dateOfExpiring,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { success: false, message: "Error updating user" },
      { status: 500 }
    );
  }
}
