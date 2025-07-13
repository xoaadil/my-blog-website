const User = require("../models/User");
const Post = require("../models/Post");
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
let id=req.params.id;


 };



module.exports = {newPost,deletePost};


// let editPost = async (req, res, next) => {};
