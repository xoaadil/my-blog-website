const express = require("express");
const Router= express.Router();
Router.get("/",(req,res)=>{
    res.send("this is comment root");
})
module.exports =Router
