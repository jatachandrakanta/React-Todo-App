const Todo = require("../models/Todo");

// ✅ Get Todos (only logged-in user)
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Add Todo (user-specific)
const addTodo = async (req, res) => {
  try {
    const newTodo = new Todo({
      title: req.body.title,
      userId: req.user.id,
      dueDate: req.body.dueDate   // ✅ NEW

    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete Todo (only if belongs to user)
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update Todo (only if belongs to user)
const updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id
      },
      { completed: req.body.completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo
};