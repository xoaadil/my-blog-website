const express = require("express");
const Router = express.Router();
const  {registerUse,loginUser,profile} = require("../controllers/userController");

Router.get("/", (req, res) => {
    res.send("this is user root");
})
Router.post("/signup", registerUse);
Router.post("/login", loginUser);
Router.get("/profile/:id", profile);

module.exports = Router
