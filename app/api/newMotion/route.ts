import { NextResponse } from "next/server";
import Motion from "../../models/motion"
import connect from "../../db/db"


export async function POST(req: Request,res: NextResponse) {
    try {
        connect();
        const {motionText} = await req.json();

        console.log("Received motion text:", motionText);

        const newMotion = new Motion({content: motionText});
        await newMotion.save();

        return NextResponse.json(newMotion, {status: 201});
    } catch (error) {
        return NextResponse.json({error: "Failed to create motion"}, {status: 500});
    }
}

