const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Added options for modern production network handling
    await mongoose.connect(process.env.MONGO_URI, {
     
    });
    console.log("Cloud MongoDB Connected securely 🚀");
  } catch (error) {
    console.error("Database connection failed ❌:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;