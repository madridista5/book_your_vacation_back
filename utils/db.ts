import mongoose from "mongoose";

export const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to mongoDB');
    } catch (err) {
        throw err;
    }
}