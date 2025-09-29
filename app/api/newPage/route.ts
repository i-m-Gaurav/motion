import connect from "../../db/db";
import { NextResponse } from "next/server";
import User from "../../models/user";
import Page from "../../models/page";
export async function POST(req: Request) {

    try {

         connect();
         const { title, content, email, pageId } = await req.json();

         const user = await User.findOne({email});
         if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
         }
        
         let page;
          if(pageId){
            page = await Page.findOneAndUpdate({
                _id : pageId, userId : user._id
            },{title, content}, {new : true});
        }else {
            page = new Page({ title, content, userId: user._id });
            await page.save();
        }

        return NextResponse.json({ page }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to create/update page" },
            { status: 500 }
        );
        
    }

}