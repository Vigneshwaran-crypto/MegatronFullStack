import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
      max: 30,
    },
    role: {
      type: String,
      default: "Subscriber",
    },
    bio: {
      type: String,
      max: 100,
      default: "Write bio",
    },
    profileImage: {
      type: String,
      default: "sampleProfile.jpg",
    },
    coverImage: {
      type: String,
      default: "sampleCover.jpg",
    },
    resetCode: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
