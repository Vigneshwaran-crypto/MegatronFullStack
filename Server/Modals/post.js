import mongoose from "mongoose";

const { Schema } = mongoose;

const post = new Schema(
  {
    userId: {
      type: String,
    },
    userName: {
      type: String,
      required: true,
    },
    userImage: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      default: "",
    },
    likes: {
      type: String,
      default: "",
    },
    comments: {
      type: String,
      default: "",
    },
    shares: {
      type: String,
      default: "",
    },
    youLiked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", post);
