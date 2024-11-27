const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const {isTokenExpired}=require('../utils/checkTokenExp');

const verifyJwt = async (req, res, next) => {
  try {
    const token =
      String(req.headers.cookie).replace("accessToken=", "") ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(400, "Unauthorized access request");
    }

    // if we have a token then we need to verify it
    let decode;
    decode = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // console.log(decode);
    if (isTokenExpired(decode.exp)) {
      throw new Error("Time out:Please login");
    }
    const user = await User.findById(decode._id).select("-password");
    if (!user) {
      throw new ApiError(400, "Invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { verifyJwt };
