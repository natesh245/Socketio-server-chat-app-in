const mongoose = require("mongoose");
const { Schema } = mongoose;

const memberSChema = new Schema(
  {
    user_id: String,
    user_name: String,
  },
  {
    _id: false,
  }
);

const conversationSchema = new Schema(
  {
    members: [{ type: memberSChema }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Conversation", conversationSchema);
