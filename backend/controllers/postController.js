const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const { z } = require("zod");

let newPost = async (req, res, next) => {
  let postSchema = z.object({
    title: z.string().min(3).max(100),
    content: z.string().min(10),
  });
  let result = postSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(404).json({
      message: "Invalid post data",
      errors: validation.error.issues,
    });
  } else {
    const { title, content } = result.data;
    console.log(req.userId);
    try {
      let newpost = await Post.create({
        title: title,
        content: content,
        postedBy: req.userId,
      });
      return res.status(201).json({
        message: "post has been made",
        post: newpost,
      });
    } catch (err) {
      return res.status(500).json({
        message: "internal matter ah usko thik kar post nahi bani",
      });
    }
  }
};

let deletePost = async (req, res, next) => {
  let postId = req.params.id;
  let userId = req.userId;
  try {
    let post = await Post.findById(postId);
    let user = await User.findById(userId);
    if (!post) {
      return res.status(400).json({
        message: "Post not Found",
      });
    }
    if (post.postedBy.toString() == userId.toString() || user.role == "admin") {
      let deletedPost = await Post.findByIdAndDelete(postId);
      await Comment.deleteMany({ postId: postId });
      return res.status(200).json({
        message: "post is deleted ",
        deletedPost: deletedPost,
      });
    } else {
      return res.status(403).json({
        mwssage: "you cannot detele this post ",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server side error",
      error: err,
    });
  }
};

let editPost = async (req, res, next) => {
  let schema = z.object({
    title: z.string().min(3).max(100),
    content: z.string().min(3),
  });

  let result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "invalue input",
      errors: result.error.issues,
    });
  } else {
    let { title, content } = result.data;

    let postId = req.params.id;
    let userId = req.userId;

    try {
      let post = await Post.findById(postId);
      let user = await User.findById(userId);

      if (!post) {
        return res.status(404).json({
          message: "post not found",
        });
      } else {
        if (
          post.postedBy.toString() == userId.toString() ||
          user.role == "admin"
        ) {
          post.title = title;
          post.content = content;
          await post.save();
          return res.status(200).json({
            message: "post has been edited",
            editedpost: post,
          });
        } else {
          return res.status(403).json({
            message: "you cant edit this post its is not yours",
          });
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: err,
        message: "internal server side error",
      });
    }
  }
};

let getAllPost = async (req, res, next) => {
  try {
    let allPost = await Post.find();
    res.status(200).json({
      message: "all posts",
      allPost: allPost,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "internal server side error",
      error: err,
    });
  }
};

module.exports = { newPost, deletePost, editPost, getAllPost };
