const express = require("express");
const postModel = require("../models/posts");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", function (req, res) {
  postModel.find({}, (err, posts) => {
    if (err) {
      res.status(500).send("An error occurred", err);
    } else {
      const featurePost = posts[0];
      const allPosts = posts.slice(1);
      res.render("posts-list", { posts: allPosts, featurePost: featurePost });
    }
  });
});

router.get("/new-post", async function (req, res) {
  res.render("create-post");
});

router.post("/new-post", upload.single("image"), function (req, res) {
  var postObject = {
    title: req.body.title,
    type: req.body.type,
    date: req.body.date,
    desc: req.body.desc,
    imgPath: req.file.filename,
  };

  const post = new postModel(postObject);
  try {
    post.save();
    res.render("success");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
