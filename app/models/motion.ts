import mongoose from "mongoose";


const motionSchema = new mongoose.Schema({
    content: String,
    userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Motion = mongoose.models.Motion || mongoose.model('Motion', motionSchema);

export default Motion;

