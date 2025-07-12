const express = require("express");
const Router= express.Router();
Router.get("/",(req,res)=>{
    res.send("this is post root");
})
module.exports =Router
