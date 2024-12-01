const express = require("express");
const router = express.Router();
const { checkRole } = require("../middleware/auth"); // Adjust path as necessary

router.get("/admin-dashboard", checkRole("admin"), (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard!" });
});

// Add other admin-specific routes
module.exports = router;
