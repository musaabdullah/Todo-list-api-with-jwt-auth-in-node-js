const Todo = require("../model/todo");

const addTodo = async (req, res) => {
  try {
    const { todo, completed, userid } = req.body;
    const todoSaved = await Todo.create({ todo, completed, userid });
    res.json(todoSaved);
  } catch (error) {
    res.json(error);
  }
};

const getTodo = async (req, res) => {
  try {
    const todo = await Todo.find();
    res.json({ todo });
  } catch (error) {
    res.json(error);
  }
};

const getTodoByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.find({ userid: id });
    res.json({ todo });
  } catch (error) {
    res.json(error);
  }
};

const removeTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const removeTodo = await Todo.findByIdAndRemove(id);
    res.json(id);
  } catch (error) {
    res.json(error);
  }
};

// const getUsers = async (req, res) => {
//   try {
//     const Todo = await Todo.find();
//     res.json({ users });
//   } catch (error) {
//     res.json(error);
//   }
// };

module.exports = { addTodo, getTodo, getTodoByUserId, removeTodo };
