const express = require("express");
const router = express.Router();
const Message = require("../Mongo/MessageSchema");

// Create a new message
router.post("/message", async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();

    // Access 'io' from the app
    const io = req.app.get("io");

    // Emit the event
    io.emit("newMessage", newMessage);
    console.log("successfully emitted");

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all messages
router.get("/message", async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete messages
router.delete("/message/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting message with ID:", id);
    await Message.findByIdAndDelete(id);
    res.status(204).end(); // Success
  } catch (error) {
    console.log("Delete request reached backend router");
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
