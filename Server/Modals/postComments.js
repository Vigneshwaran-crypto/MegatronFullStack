import mongoose from "mongoose";

const { Schema } = mongoose;

const postsComments = new Schema(
  {
    postId: {
      type: String,
      require: true,
    },
    comment: {
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
  },
  { timestamps: true }
);

export default mongoose.model("PostsComments", postsComments);
