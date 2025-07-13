const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const newPost=require("../controllers/postController");
const {deletePost,editPost}=require("../controllers/postController");
const Router= express.Router();
Router.get("/",(req,res)=>{
    res.send("this is post root");
})


Router.post("/create",isAuthenticated,newPost);
Router.delete("/:id",isAuthenticated,deletePost);
// Router.put("/:id",isAuthenticated,editPost);





module.exports =Router
