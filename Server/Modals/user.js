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
      max: 200,
    },
    image: {
      public_id: Schema.Types.ObjectId,
      url: Schema.Types.String,
    },
    resetCode: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
