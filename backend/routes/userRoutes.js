const express = require("express");
const Router = express.Router();
const { isAuthenticated } = require("../middleware/authMiddleware");
const { registerUse, loginUser ,profile} = require("../controllers/userController");

Router.get("/", (req, res) => {
    res.send("this is user root");
})
Router.post("/signup", registerUse);
Router.post("/login", loginUser);
Router.get("/profile/:id", isAuthenticated, profile);

module.exports = Router
