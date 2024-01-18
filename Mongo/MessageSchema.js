const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  newMessage: {
    type: String,
    // required: true,
    default: "0",
  },
});

const Message = mongoose.model("messages", messageSchema);

module.exports = Message;
