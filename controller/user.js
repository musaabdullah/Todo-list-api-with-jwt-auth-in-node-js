const User = require("../model/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SCRET_TOKEN, { expiresIn: maxAge });
};

const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    const err = handleErrors(error);
    res.json({
      success: false,
      err,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isLoggedIn = await User.login(email, password);
    const token = createToken(isLoggedIn._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.json({
      success: true,
      user: isLoggedIn,
      token,
    });
  } catch (error) {
    const err = handleErrors(error);
    res.json({
      success: false,
      err,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    res.json(error);
  }
};

const logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.json("logout");
};

module.exports = { userRegister, userLogin, logout_get, getUsers };
