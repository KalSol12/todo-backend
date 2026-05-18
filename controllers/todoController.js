const Todo = require("../models/Todo");

// @desc    Get all todos
// @route   GET /api/todos
// @access  Public
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Create a new todo
// @route   POST /api/todos
// @access  Public
exports.createTodo = async (req, res) => {
  try {
    const { text, startDate, endDate, priority, category } = req.body;
    
    if (!text) {
      return res.status(400).json({ message: "Text field is required" });
    }

    const newTodo = await Todo.create({
      text,
      startDate,
      endDate,
      priority,
      category,
    });

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Update a todo (Text, completion state, categories, etc.)
// @route   PUT /api/todos/:id
// @access  Public
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true } // Returns the modified doc rather than the original
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Delete a single todo
// @route   DELETE /api/todos/:id
// @access  Public
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully", id });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Clear all todos
// @route   DELETE /api/todos
// @access  Public
exports.clearAllTodos = async (req, res) => {
  try {
    await Todo.deleteMany({});
    res.status(200).json({ message: "All todos cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};