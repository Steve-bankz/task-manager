const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`❌ MongoDB connection error: ${error.message}`);
      process.exit(1); // Exit process with failure
    }
  };
  
  module.exports = connectDB;