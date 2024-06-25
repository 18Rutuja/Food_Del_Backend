import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://greatstack:9209304687@cluster0.vrdd2t3.mongodb.net/food-del').then(() => console.log("DB Connected"));
}