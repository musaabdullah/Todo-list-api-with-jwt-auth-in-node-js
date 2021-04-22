const jwt = require("jsonwebtoken");
const User = require("../model/user");
require("dotenv").config();

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.SCRET_TOKEN, async (error, decodedToken) => {
      if (error) return res.json(error.message);
      next();
    });
  } else {
    res.json("Their is no token");
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.SCRET_TOKEN, async (error, decodedToken) => {
      if (error) {
        return res.json(error.message);
      } else {
        let user = await User.findById(decodedToken.id);
        res.json({ user });
        next();
      }
    });
  } else {
    res.json("Their is no token");
  }
};

module.exports = { requireAuth, checkUser };
