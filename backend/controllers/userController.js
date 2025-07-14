const express = require("express");
const { z } = require("zod");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

let registerUser = async (req, res, next) => {
  console.log("Verifying input detail to register ...");

  const schema = z.object({
    name: z.string().min(3).max(100).trim(),
    email: z.string().email().trim(),
    password: z.string().min(3).max(100),
    bio: z.string(),
  });

  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Bad Request",
      errors: result.error.issues.map((issue) => issue.message),
    });
  } else {
    console.log("input details are valid .. now next step");
    console.log("sending to database ..");

    try {
      const { name, email, password, bio } = result.data;
      let user = await User.findOne({ email: email });

      if (user) {
        return res.status(400).json({
          success: false,
          message: "This email is already registered",
        });
      } else {
        let role = "user";
        if (email == process.env.ADMIN) {
          role = "admin";
        }
        let hashpass = await bcrypt.hash(password, 5);
        const newUser = await User.create({
          name: name,
          email: email,
          password: hashpass,
          bio: bio,
          role: role,
        });
        console.log(" User successfully saved in database");
        return res.status(201).json({
          success: true,
          message: "User created successfully",
          user: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            bio: newUser.bio,
            avatarUrl: newUser.avatarUrl,
          },
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message,
      });
    }
  }
};

let loginUser = async (req, res, next) => {
  console.log("validing detail of input for login");

  let schema = z.object({
    email: z.string().email(),
    password: z.string().min(3).max(100),
  });

  let result = schema.safeParse(req.body);
  console.log("check post for safeparse");
  if (!result.success) {
    return res.status(400).json({
      message: "Bad Request",
      errors: result.error.errors.map((err) => err.message),
    });
  } else {
    try {
      console.log("cheking email in db");
      const { email, password } = result.data;
      let finduser = await User.findOne({ email: email });

      if (!finduser) {
        return res.status(400).json({
          message: "incorrect detail",
          success: false,
        });
      } else {
        console.log("password matching");
        let isMatch = await bcrypt.compare(password, finduser.password);

        if (!isMatch) {
          return res.status(400).json({
            message: "incorrect detail",
            success: false,
          });
        } else {
          console.log("login done");
          let token = jwt.sign({ id: finduser._id }, JWT_SECRET);
          req.token = token;
          return res.status(200).json({
            success: true,
            message: "Login successfull",
            user: {
              name: finduser.name,
              token: token,
            },
          });
        }
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message,
      });
    }
  }
};

let profile = async (req, res, next) => {
console.log("hit the profile")
  let id = req.params.id;

  let finduser = await User.findOne({ _id: id }).select("-password");

  if (!finduser) {
    return res.status(400).json({
      message: "user not found",
    });

  }
   else {
    return res.status(200).json({
      finduser,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  profile,
};
