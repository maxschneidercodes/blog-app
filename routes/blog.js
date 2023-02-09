const fs = require("fs");
const path = require("path");

const postController = require("../controller/PostController");
const uploadServices = require("../services/MulterServices");

const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const posts = await postController.getAllPosts(req, res);
  const featurePost = posts[0];
  const allPosts = posts.slice(1);
  res
    .status(200)
    .render("posts-list", { posts: allPosts, featurePost: featurePost });
});

router.get("/new-post", async function (req, res) {
  res.render("create-post");
});

router.get("/posts/:id", async function (req, res) {
  const post = await postController.getPostById(req, res);
  res.status(200).render("post-detail", { post: post });
});

router.post(
  "/new-post",
  uploadServices.single("image"),
  async function (req, res) {
    const postObject = {
      title: req.body.title,
      type: req.body.type,
      date: req.body.date,
      desc: req.body.desc,
      imgPath: req.file.filename,
    };

    await postController.createPost(req, res, postObject);
    res.render("success");
  }
);

router.get("/update-post/:id", async function (req, res) {
  const post = await postController.updatePost(req, res);
  res.render("post-update", { post: post });
});

router.post(
  "/update-post/:id",
  uploadServices.single("image"),
  async function (req, res) {
    const post = await postController.getPostById(req, res);

    const postObject = {
      title: req.body.title,
      type: req.body.type,
      date: req.body.date,
      desc: req.body.desc,
      imgPath: req.file.filename,
    };

    fs.unlink(path.join("public/uploads/" + post.imgPath), (err) => {});

    await postController.updatePost(req, res, postObject);

    res.redirect("/");
  }
);

router.get("/delete-post/:id", async function (req, res) {
  const post = await postController.getPostById(req, res);

  fs.unlink(path.join("public/uploads/" + post.imgPath), (err) => {});

  postController.deletePost(req, res);

  res.redirect("/");
});

module.exports = router;
