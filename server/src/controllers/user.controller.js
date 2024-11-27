const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const {isTokenExpired}=require('../utils/checkTokenExp');
exports.register = async (req, res, next) => {
  try {
    // if user exists
    const userExist = await User.findOne({ username: req.body.username });
    if (userExist) {
      throw new ApiError(400, "User already exists");
    }
    const user = await User.create(req.body);
    return res
      .status(200)
      .json(new ApiResponse(200, user, "User created successfully"));
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res
      .status(200)
      .json(new ApiResponse(200, users, "Successfully get all users"));
  } catch (error) {
    next(error);
  }
};
exports.login = async (req, res, next) => {
  try {
    // Find user by username
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      throw new ApiError(404, "User does not exist");
    }

    // Check if password is correct
    const passwordCorrect = await user.isPasswordCorrect(req.body.password);
    if (!passwordCorrect) {
      throw new ApiError(401, "Password is incorrect");
    }

    // Generate access token
    const token = user.generateAccessToken();
    if (!token) {
      throw new ApiError(500, "Failed to generate token");
    }

    // Set token as a cookie and respond
    res
      .status(200)
      .cookie("accessToken", token, {
        httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === "production", // Use HTTPS in production
        sameSite: "Strict", // Prevent CSRF
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json(new ApiResponse(200, user, "User logged in successfully"));
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "User Logout successfully"));
  } catch (error) {
    next(error);
  }
};

// get login user
exports.checkAuth = async (req, res, next) => {
  try {
    const user=req.user;
    return res.status(200).json(new ApiResponse(200,user,"Authenticated User"))
  } catch (error) {
    next(error);
  }
};
