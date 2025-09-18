import mongoose from 'mongoose';

const connect = () => {
    mongoose.connect("mongodb://localhost:27017/motionDB");
    console.log("Connected to MongoDB");
}

export default connect;