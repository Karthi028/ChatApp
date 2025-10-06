import mongoose from 'mongoose';
import { MONGODB_URI } from '../config.js';

export const connectDB = async ()=>{
    try {
        const connect = await mongoose.connect(MONGODB_URI);
        console.log("Connected to Database")
    } catch (error) {
        console.log("Error connecting Database",error)
    }
}