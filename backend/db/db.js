// import mongoose from "mongoose";

// export const connectDB = async () => {
//     try{
//         const mongoUri = process.env.MONGO_URI;
//         const conn = await mongoose.connect(mongoUri);
//         console.log(`MongoDB connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.log("MongoDB connection error", error.message);
//         console.log("Using in-memory database for development");
//         // Don't exit, continue with mock data
//     }
// };

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to MONGODB", error.message);
    process.exit(1);
  }
};
