const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  location: String,
  description: String,
  createdBy: String
});

module.exports = mongoose.model("Log", logSchema);
