const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
app.use(express.json());
require("./config/db")
const commentRoutes  = require("./routes/commentRoutes")
const postRoutes  = require("./routes/postRoutes")
const userRoutes  = require("./routes/userRoutes")

const PORT = process.env.PORT || 6000;



app.get("/", (req, res) => {
    res.send("ye ha root ")
})
app.use(cors());
app.use("/user", userRoutes)
app.use("/comment", commentRoutes)
app.use("/post", postRoutes)



app.listen(PORT, () => {
    console.log(`app is working on ${PORT}`);
})