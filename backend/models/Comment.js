const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
let CommentModel = new Schema({
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1000,
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: ObjectId,
    ref: "Post",
    required: true,
  },
  
}, { timestamps: true });
let Comment = mongoose.model("Comment",CommentModel);
module.exports = Comment;
