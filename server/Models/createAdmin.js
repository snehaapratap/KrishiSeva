const mongoose = require("mongoose");
const User = require("./User.js");
const bcrypt = require("bcrypt");

const seedAdmin = async () => {
  await mongoose.connect("mongodb://localhost:27017/kisaanGyan"); // Replace with your DB URI
  const hashedPassword = await bcrypt.hash("admin123", 10); // Securely hash the password

  const admin = new User({
    name: "Admin User",
    email: "admin@example.com",
    password: hashedPassword,
    role: "admin",
  });

  try {
    await admin.save();
    console.log("Admin account created successfully!");
  } catch (err) {
    console.error("Error seeding admin:", err.message);
  } finally {
    mongoose.connection.close();
  }
};

seedAdmin();
