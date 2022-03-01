const mongoose = require("mongoose");
const messageModel = require("./message.model");
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

//delete all messages linked to a conversation in case deleted
conversationSchema.post("findOneAndDelete", async (doc) => {
  await messageModel.deleteMany({ conversationID: doc._id });
});

module.exports = mongoose.model("Conversation", conversationSchema);
