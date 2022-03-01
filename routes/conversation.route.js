const express = require("express");
const router = express.Router();
const conversationModel = require("../models/conversation.model.js");

//get all conversation
router.get("/", async (req, res) => {
  try {
    const conversations = await conversationModel.find({});
    res.status(200).json({
      data: conversations,
      status: 200,
      message: "Conversations fetchedsuccessfully",
    });
  } catch (err) {
    res.status(500).json({ status: 500, data: null, message: err });
  }
});

//get conversation by id

router.get("/:conversationId", async (req, res) => {
  try {
    const conversation = await conversationModel.find({
      _id: req.params.conversationId,
    });
    res.status(200).json({
      data: conversation,
      status: 200,
      message: "Conversation fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ status: 500, data: null, message: err });
  }
});

//get conversation by user id

router.get("/user/:userId", async (req, res) => {
  try {
    const conversation = await conversationModel.find({
      "members.user_id": req.params.userId,
    });
    res.status(200).json({
      data: conversation,
      status: 200,
      message: "Conversation fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ status: 500, data: null, message: err });
  }
});

//post conversation
router.post("/", async (req, res) => {
  try {
    const newConversation = new conversationModel(req.body);
    const savedConversation = await newConversation.save();
    res.status(201).json({
      data: savedConversation,
      status: 201,
      message: "Conversation saved successfully",
    });
  } catch (err) {
    res.status(500).json({ status: 500, data: null, message: err });
  }
});

//update conversation
router.put("/:conversationId", async (req, res) => {
  try {
    const conversationId = req.params.conversationId;

    const updatedConversation = await conversationModel.findByIdAndUpdate(
      conversationId,
      {
        ...req.body,
      }
    );

    res.status(200).json({
      data: updatedConversation,
      status: 200,
      message: "conversation updated successfully",
    });
  } catch (err) {
    res.status(500).json({ status: 500, data: null, message: err });
  }
});

router.delete("/:conversationId", async (req, res) => {
  try {
    const conversationId = req.params.conversationId;

    await conversationModel.findOneAndDelete({ _id: conversationId });
    res.status(200).json({
      message: "conversation deleted succesfully",
      status: 200,
      data: null,
    });
  } catch (err) {
    res.status(500).json({ status: 500, data: null, message: err });
  }
});

module.exports = router;
