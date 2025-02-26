import mongoose from "mongoose";

export const connectDB = async(req, res)=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB successfully")
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
        process.exit(1);
    }
}