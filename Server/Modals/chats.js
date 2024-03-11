import mongoose from "mongoose";

const { Schema } = mongoose;

const chatModal = new Schema(
  {
    senderId: {
      type: String,
      require: true,
    },
    receiverId: {
      type: String,
      require: true,
    },
    msg: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("chatModal", chatModal);
