import mongoose from 'mongoose';

const connect = () => {
    mongoose.connect(process.env.MONGO_URI || "" );
    console.log("Connected to MongoDB");
}

export default connect;