import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9_]+$/,
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
  refreshToken: {
    type: String,
  },
  otp: {
    type: String,
    max: 6,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
});

export const User = mongoose.model("User", userSchema);
