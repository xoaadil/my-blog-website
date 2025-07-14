const express = require("express");
const Router= express.Router();
const {newComment,editComment,deleteComment,getAllComment}=require("../controllers/commentController")
const isAuthenticated=require("../middleware/isAuthenticated")


Router.get("/",(req,res)=>{
    res.send("this is comment root");
})

Router.post("/create/:id",isAuthenticated,newComment);
Router.put("/edit/:id",isAuthenticated,editComment);
Router.delete("/delete/:id",isAuthenticated,deleteComment);
Router.get("/post/:id",getAllComment)

module.exports =Router
