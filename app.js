const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const userRouter = require("./router/user");
const todoRouter = require("./router/todo");

const app = express();

app.use(morgan());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 4000;

/// connecton with mongoose
mongoose
  .connect(process.env.CONNECT_URL, {
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((res) => console.log("connected"))
  .catch((error) => console.log(error.message));

app.use(userRouter);
app.use(todoRouter);
app.get("*", (req, res) => {
  res.json("404 Error is page is not Found");
});

app.get(["/", "/Home"], (req, res) => {
  res.json("Home");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
