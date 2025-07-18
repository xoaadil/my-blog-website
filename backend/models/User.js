const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true, 
    },
    role: {
        type: String

    },
    bio: {
        type: String,
        default: "",
    },
      avatarUrl: {
    type: String,
    default: "",            
  },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose.model("User", userSchema);
module.exports = User;

