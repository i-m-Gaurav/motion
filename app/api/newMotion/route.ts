import { NextResponse } from "next/server";
import Motion from "../../models/motion";
import connect from "../../db/db";
import User from "../../models/user";

export async function POST(req: Request) {
  try {
    connect();
   const { motionText, email } = await req.json();
    console.log("Received motion text:", motionText, email);

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Upsert: update if exists, otherwise create
   const updatedMotion = await Motion.findOneAndUpdate(
  { userId: user._id },  // query
  { content: motionText, userId: user._id }, // include userId explicitly
  { upsert: true, new: true }
);

    return NextResponse.json(updatedMotion, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create/update motion" },
      { status: 500 }
    );
  }
}
