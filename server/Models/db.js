const mongoose = require("mongoose");

const mongo_url = "mongodb://localhost:27017/kisaanGyan";

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error: ", err);
  });
