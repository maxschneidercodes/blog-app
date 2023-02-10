const postModel = require("../models/posts");

exports.getAllPosts = async () => {
  return await postModel.find();
};

exports.createPost = async (blog) => {
  return await postModel.create(blog);
};
exports.getPostById = async (id) => {
  return await postModel.findById(id);
};

exports.updatePost = async (id, blog) => {
  return await postModel.findByIdAndUpdate(id, blog);
};

exports.deletePost = async (id) => {
  return await postModel.findByIdAndDelete(id);
};

exports.pushComment = async (id, objc) => {
  return await postModel.updateOne(
    { _id: id },
    {
      $addToSet: {
        comments: objc,
      },
    }
  );
};
