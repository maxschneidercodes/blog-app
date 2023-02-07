const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: String,
  desc: String,
  date: String,
  type: String,
  imgPath: String,
});

module.exports = mongoose.model("Post", schema);
