import mongoose from "mongoose";

const { Schema } = mongoose;

const likedList = new Schema(
  {
    postId: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
    userName: {
      type: String,
      require: true,
    },
    userImage: {
      type: String,
      require: true,
    },
    reactionType: {
      type: String,
      require: true,
      default: "0",
    },
  },
  { timestamps: true }
);

export default mongoose.model("LikedList", likedList);
