const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: String,
  desc: String,
  date: String,
  type: String,
  imgPath: String,
  comments: Array,
});

module.exports = mongoose.model("Post", schema);
