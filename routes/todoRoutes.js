const express = require("express");
const router = express.Router();
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  clearAllTodos,
} = require("../controllers/todoController");

// Handles GET /api/todos and POST /api/todos
router.route("/")
  .get(getTodos)
  .post(createTodo)
  .delete(clearAllTodos); // Added for your front-end "Clear All" button feature

// Handles PUT /api/todos/:id and DELETE /api/todos/:id
router.route("/:id")
  .put(updateTodo)
  .delete(deleteTodo);

module.exports = router;