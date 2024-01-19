const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    // required: true,
    default: "failed to parse/no message",
  },
  name: {
    type: String,
    // required: true,
    default: "0",
  },
  email: {
    type: String,
    // required: true,
    default: "0",
  },
  phone: {
    type: String,
    // required: true,
    default: "0",
  },
});

const Message = mongoose.model("messages", messageSchema);

module.exports = Message;
