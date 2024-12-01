const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");

const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log("Received signup data:", { name, email, role }); // Don't log password

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // Validate role
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role specified",
      });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new UserModel({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role || "user",
    });

    // Validate the user object before saving
    const validationError = user.validateSync();
    if (validationError) {
      console.error("Validation error:", validationError);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: validationError.message,
      });
    }

    await user.save();
    console.log("User saved successfully:", {
      name: user.name,
      email: user.email,
      role: user.role,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "Auth failed email or password is wrong";
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id, role: user.role },
      "secretKey",
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login Success",
      success: true,
      jwtToken,
      email,
      name: user.name,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  signup,
  login,
};
