import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
    title: { type: String,default : "Untitled" },
    content : { type: String, default: "<p></p>" },
    userId : { type : mongoose.Schema.Types.ObjectId, ref: 'User' , required: true},

},{timestamps : true})

const Page = mongoose.models.Page || mongoose.model('Page', pageSchema);

export default Page;