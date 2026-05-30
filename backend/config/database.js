import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connection = async () => {
    try {
        const database = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected successfully: ${database.connection.host}`);
    } 
    
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);    
    }
}

mongoose.connection.on('error', error => {
    console.error(`Runtime database error: ${error}`);
})

export default connection;