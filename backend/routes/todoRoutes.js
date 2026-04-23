const express = require("express");
const router = express.Router();

// 🔐 Middleware
const authMiddleware = require("../middleware/authMiddleware");

// 📦 Controllers
const {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo
} = require("../controllers/todoController");

// 📌 Routes (protected with authMiddleware)

// 👉 Get all todos (user specific)
router.get("/", authMiddleware, getTodos);

// 👉 Add new todo
router.post("/", authMiddleware, addTodo);

// 👉 Delete todo by ID
router.delete("/:id", authMiddleware, deleteTodo);

// 👉 Update todo (mark complete/incomplete)
router.put("/:id", authMiddleware, updateTodo);

module.exports = router;