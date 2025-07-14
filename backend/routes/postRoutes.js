const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const {deletePost,newPost,editPost,getAllPost}=require("../controllers/postController");
const Router= express.Router();
Router.get("/",(req,res)=>{
    res.send("this is post root");
})


Router.post("/create",isAuthenticated,newPost);
Router.delete("/:id",isAuthenticated,deletePost);
Router.put("/:id",isAuthenticated,editPost);
Router.get("/all",getAllPost);

module.exports =Router
