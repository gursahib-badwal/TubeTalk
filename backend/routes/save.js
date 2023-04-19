var express = require("express");
var router = express.Router();
const Content = require("../models/save.model");
const ObjectId = require('mongoose').Types.ObjectId;

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const content = await Content.find({
      userId: userId,
    });
    res.status(200).json({
      message: "Content retrieved successfully",
      content: content,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:contentId", async (req, res) => {
  try {
    const contentId = new ObjectId(req.params.contentId);
    const content = await Content.findByIdAndUpdate(contentId, req.body);
    res.status(200).json({
      message: "Content updated successfully",
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  const body = req.body;
  const content = new Content(body);
  try {
    const newContent = await content.save();
    res.status(201).json({
      message: "Added to List",
      content: newContent,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:contentId", async (req, res) => {
  try {
    const contentId = new ObjectId(req.params.contentId);
    console.log('contentId: ', contentId);
    const content = await Content.findByIdAndDelete(contentId);
    res.status(200).json({
      message: "Content removed successfully",
      content: content,
    });
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json(error);
  }
});

module.exports = router;
