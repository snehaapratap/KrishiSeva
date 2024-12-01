const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    phoneNumber: {
      type: Number,
      minlength: 10,
      maxlength: 15,
      required: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isInfected: {
      type: Boolean,
      default: false,
    },
    city: {
      type: String,
      trim: true,
      required: false,
    },
    state: {
      type: String,
      trim: true,
      required: false,
    },
    soilType: {
      type: String,
      enum: ["clay", "sandy", "loamy", "peaty", "chalky", "silty"],
      required: false,
    },
    crops: {
      type: String,
      trim: true,
      required: false,
    },
    season: {
      type: String,
      enum: ["summer", "winter", "monsoon"],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
