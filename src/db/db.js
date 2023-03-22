import mongoose from 'mongoose'
import dotenv from 'dotenv';

export const initDB = () => {
    
    return mongoose.connect(process.env.MONGO_URL)
}