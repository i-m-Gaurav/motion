import mongoose from "mongoose";


const motionSchema = new mongoose.Schema({
    content: String,
}, { timestamps: true });

const Motion = mongoose.models.Motion || mongoose.model('Motion', motionSchema);

export default Motion;

