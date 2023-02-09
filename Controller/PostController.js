const postService = require("../Services/PostsServices");

function isObjc(objc) {
  if (objc !== {} || objc !== undefined) {
    return true;
  }
  return false;
}

exports.getAllPosts = async (req, res) => {
  try {
    return await postService.getAllPosts();
  } catch (err) {
    res.render("500", { error: err.message });
  }
};

exports.createPost = async (req, res, objc) => {
  try {
    if (isObjc(objc)) {
      return await postService.createPost(objc);
    }
    return await postService.createPost(req.body);
  } catch (err) {
    res.render("500", { error: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    return await postService.getPostById(req.params.id);
  } catch (err) {
    res.render("500", { error: err.message });
  }
};

exports.updatePost = async (req, res, objc) => {
  try {
    if (isObjc(objc)) {
      return await postService.updatePost(req.params.id, objc);
    }
    return await postService.updatePost(req.params.id, req.body);
  } catch (err) {
    res.render("500", { error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    return await postService.deletePost(req.params.id);
  } catch (err) {
    res.render("500", { error: err.message });
  }
};
