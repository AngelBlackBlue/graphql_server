import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI || process.env.port, {
    tls: true,
    tlsAllowInvalidCertificates: true, 
}).then(() => {
    console.log('connected to MongoDB')
}).catch((error) => {
    console.log('Error connecting to MongoDB', error.message)
})

