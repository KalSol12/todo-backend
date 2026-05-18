const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");

dotenv.config();

// Connect to Cloud Atlas
connectDB();

const app = express();

// Adjust CORS to allow requests from your future deployed frontend website
app.use(
  cors({
    origin:
      "https://todo-app-react-3.onrender.com",

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE"
    ],

    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Todo Cloud API Running smoothly 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});