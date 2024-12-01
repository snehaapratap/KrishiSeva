const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/authRoutes");

const app = express();

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/kisaanGyan", {
   
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message,
  });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
