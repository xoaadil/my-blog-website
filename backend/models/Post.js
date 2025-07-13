const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let PostSchema = new Schema({
  title: String,
  content: String,
  postedBy: {
    type: ObjectId, 
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Post= mongoose.model("Post",PostSchema);
module.exports=Post;
