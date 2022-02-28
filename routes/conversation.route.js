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
    res.status(500).json({ status: 500, data: null, message: error });
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
    res.status(500).json({ status: 500, data: null, message: error });
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
    res.status(500).json({ status: 500, data: null, message: error });
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
  } catch (error) {
    res.status(500).json({ status: 500, data: null, message: error });
  }
});

router.delete("/:conversationId", async (req, res) => {
  try {
    const conversationId = req.params.conversationId;

    await conversationModel.deleteOne({ _id: conversationId });
    res.status(200).json({
      message: "conversation deleted succesfully",
      status: 200,
      data: null,
    });
  } catch (error) {
    res.status(500).json({ status: 500, data: null, message: error });
  }
});

module.exports = router;
