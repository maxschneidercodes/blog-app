const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: String,
  desc: String,
  imgPath: String,
});

// schema.methods.save = async function (post) {};

module.exports = mongoose.model("Post", schema);
