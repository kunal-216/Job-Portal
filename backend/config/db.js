import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGO_URL, {
            connectTimeoutMS: 20000,
        })
        if (response) {
            console.log("MongoDb Connected");
        }
    } catch (error) {
        console.error(error);
    }
}

export default connectDB;