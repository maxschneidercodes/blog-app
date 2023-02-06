const express = require("express");
const postModel = require("../models/posts");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });
const fs = require("fs");
const path = require("path");

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", function (req, res) {
  res.render("posts-list");
});

router.get("/new-post", async function (req, res) {
  res.render("create-post");
});

router.post("/new-post", upload.single("image"), function (req, res) {
  var obj = {
    name: req.body.name,
    desc: req.body.desc,
    imgPath: req.file.filename,
  };
  postModel.create(obj, (err, item) => {
    if (err) {
      res.status(500).send(err);
    } else {
      try {
        post.save();
        res.render("success");
      } catch (error) {
        res.status(500).send(error);
      }
    }
  });
});

module.exports = router;
