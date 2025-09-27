import { NextResponse } from "next/server";
import connect from "@/app/db/db";
import User from "@/app/models/user";
import Motion from "@/app/models/motion";

export async function POST(req: Request) {
  try {
    connect();
    const { email } = await req.json();

    console.log("Email query param:", email);
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    console.log("Email in GET request:", email);

    const userId = await User.findOne({ email }).select("_id");
    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const motions = await Motion.find({ userId: userId._id }).select("content");
    console.log("Motion found:", motions);
    if (!motions || motions.length === 0) {
      return NextResponse.json({ error: "Motion not found" }, { status: 404 });
    }

    const contentArray = motions.map((m) => m.content);
    console.log("Content Array:", contentArray);
    return NextResponse.json(contentArray, { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { error: "Failed to retrieve motion" },
      { status: 500 }
    );
  }
}
