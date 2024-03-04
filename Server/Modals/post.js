import mongoose from "mongoose";

const { Schema } = mongoose;

const post = new Schema(
  {
    userId: {
      type: String,
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
    share: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", post);
