
import { NextResponse } from "next/server";
import connect from "@/app/db/db";
import User from "@/app/models/user";
import Page from "@/app/models/page";

export async function POST(req: Request){
    try {

        connect();
        const {email} = await req.json();
        
        console.log("Email query param:", email);
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }
        console.log("Email in GET request:", email);
        
        const userId = await User.findOne({ email }).select("_id");
        if (!userId) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const pages  = await Page.find({userId : userId._id}).sort({createdAt : -1});
        return NextResponse.json(pages, {status : 200});

        
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to retrieve pages" },
            { status: 500 }
        );

    }
}