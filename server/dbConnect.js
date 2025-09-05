import mongoose from "mongoose";
async function dbConnect(){
    try {
        await mongoose.connect('mongodb+srv://LMS-MERN:LMS-MERN@cluster0.0qtgtqb.mongodb.net/');
        console.log('Mongo DB connected successfully');
    } catch (error) {
        console.error(error);
        console.error("connection failed");
    }
}
dbConnect();