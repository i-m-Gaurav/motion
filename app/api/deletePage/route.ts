import { NextResponse } from "next/server";
import Page from "@/app/models/page";

import connect from "@/app/db/db";
export async function POST(req: Request){

    try {

        connect();

        const {searchParams} = new URL(req.url);
        console.log("This is the search params ", searchParams);
        const pageId = searchParams.get("pageId");
        console.log("This is the pageId ", pageId);

        const deletedPage = await Page.findByIdAndDelete(pageId);
        console.log("This is the deleted page ", deletedPage);
        if(!deletedPage){
            return NextResponse.json({error : "Page not found"}, {status : 404});
        }
        // Perform deletion logic here using the pageId
        // For example, you might interact with your database to delete the page

        return NextResponse.json({message : "Delete API hit successfully"}, {status : 200});
        
    } catch (error) {
        console.error(error);
        
    }

}