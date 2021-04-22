const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("todo", todoSchema);
