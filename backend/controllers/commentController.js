const { z } = require("zod");
const Comment = require("../models/Comment");
const User = require("../models/User");


let newComment = async (req, res, next) => {
  const commentSchema = z.object({
    content: z.string().min(1).max(1000),
  });

  const result = commentSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: result.error.issues,
    });
  }
  const content = result.data.content;
  let postId = req.params.id;
  let userId = req.userId;

  try {
    let newcom = await Comment.create({
      content: content,
      postId: postId,
      postedBy: userId,
    });

    return res.status(201).json({
      message: "comment has been made",
      comment: newcom,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err,
      message: "internal server side error",
    });
  }
};

let editComment = async (req, res, next) => {
  const commentSchema = z.object({
    content: z.string().min(1).max(1000),
  });

  const result = commentSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: result.error.issues,
    });
  }
  const content = result.data.content;

  let commentId = req.params.id;
  let userId = req.userId;

  try {
    let comment = await Comment.findById(commentId);
    let user = await User.findById(userId);
    if (!comment) {
      return res.status(400).json({
        message: "this comment does not exist",
      });
    }
    if (
      comment.postedBy.toString() == userId.toString() ||
      user.role == "admin"
    ) {
      comment.content = content;
      await comment.save();
      return res.status(201).json({
        message: "comment has been made",
        comment: comment,
      });
    } else {
      return res.status(403).json({
        message: "you cant edit this comment",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err,
      message: "internal server side error",
    });
  }
};

let deleteComment = async (req, res, next) => {
  let userId = req.userId;
  let tobedeleteId = req.params.id;
  try {
    let user = await User.findById(userId);
    let tobedelete = await Comment.findById(tobedeleteId);
    if (
      tobedelete.postedBy.toString() == userId.toString() ||
      user.role == "admin"
    ) {
      let deletedComment = await Comment.findByIdAndDelete(tobedeleteId);
      return res.status(200).json({
        message: "comment has been deleted ",
        deletedComment: deletedComment,
      });
    } else {
      return res.status(403).json({
        message: " you have no right to delete this commment ",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server side error",
      error: err,
    });
  }
};

let getAllComment = async (req, res, next) => {
  let postId = req.params.id;
  try {
    let allComment = await Comment.find({ postId: postId }).sort({ createdAt: -1 });  ;
    return res.status(200).json({
      message: " here is you all comment of this post",
      allComment: allComment,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server side problem ha",
      error: err,
    });
  }
};

module.exports = { newComment, editComment, deleteComment, getAllComment };
