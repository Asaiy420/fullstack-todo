import express from "express";
import {
  getTodos,
  addTodo,
  editTodo,
  deleteTodo,
} from "../controllers/todos.controller.js";

const router = express.Router();

router.get("/todos", getTodos);
router.post("/add-todo/:userId", addTodo);
router.put("/edit-todo/:todoId", editTodo);
router.delete("/delete-todo/:todoId", deleteTodo);

export default router;
