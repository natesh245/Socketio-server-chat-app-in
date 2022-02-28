const express = require("express");
const router = express.Router();
const messageModel = require("../models/message.model.js");

//get all messages
router.get("/", async (req, res) => {
  try {
    const messages = await messageModel.find({});
    res.status(200).json({
      data: messages,
      status: 200,
      message: "messages fetchedsuccessfully",
    });
  } catch (err) {
    res.status(500).json({ status: 500, data: null, message: error });
  }
});

//get message by id

router.get("/:messageId", async (req, res) => {
  try {
    const message = await messageModel.find({
      _id: req.params.messageId,
    });
    res.status(200).json({
      data: message,
      status: 200,
      message: "message fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ status: 500, data: null, message: error });
  }
});

//post message
router.post("/", async (req, res) => {
  try {
    const newmessage = new messageModel(req.body);
    const savedmessage = await newmessage.save();
    res.status(201).json({
      data: savedmessage,
      status: 201,
      message: "message saved successfully",
    });
  } catch (err) {
    res.status(500).json({ status: 500, data: null, message: error });
  }
});

//update message
router.put("/:messageId", async (req, res) => {
  try {
    const messageId = req.params.messageId;

    const updatedmessage = await messageModel.findByIdAndUpdate(messageId, {
      ...req.body,
    });

    res.status(200).json({
      data: updatedmessage,
      status: 200,
      message: "message updated successfully",
    });
  } catch (error) {
    res.status(500).json({ status: 500, data: null, message: error });
  }
});

router.delete("/:messageId", async (req, res) => {
  try {
    const messageId = req.params.messageId;

    await messageModel.deleteOne({ _id: messageId });
    res.status(200).json({
      message: "message deleted succesfully",
      status: 200,
      data: null,
    });
  } catch (error) {
    res.status(500).json({ status: 500, data: null, message: error });
  }
});

module.exports = router;
