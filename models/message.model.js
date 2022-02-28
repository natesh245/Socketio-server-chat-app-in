const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    senderID: String,
    receiverID: String,
    content: {
      type: String,
    },
    conversationID: { type: mongoose.ObjectId, ref: "Conversation" },
  },
  {
    timestamps: true,
  }
);

exports = mongoose.model("message", messageSchema);
