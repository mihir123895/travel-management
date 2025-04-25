// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    photo: {
      type: String,
    },

    role: {
      type: String,
      default: "user",
    },

    // 👇 OTP for password reset
    resetOtp: {
      type: String,
    },

    // 👇 Expiration time for OTP (5–10 minutes usually)
    resetOtpExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.user || mongoose.model("User", userSchema);

export default User;
