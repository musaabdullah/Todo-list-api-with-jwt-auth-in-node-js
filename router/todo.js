const { Router } = require("express");

const router = Router();
const {
  addTodo,
  getTodo,
  getTodoByUserId,
  removeTodo,
} = require("../controller/todo");
const { requireAuth, checkUser } = require("../Middleware/requireAuth");

router.post("/addTodo", requireAuth, addTodo);
router.get("/todo", requireAuth, getTodo);
router.get("/todo/:id", requireAuth, getTodoByUserId);
router.delete("/todo/:id", removeTodo);
module.exports = router;
