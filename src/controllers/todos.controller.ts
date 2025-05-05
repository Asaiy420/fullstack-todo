import { Request, Response } from "express";
import Todo from "../models/todo.model.js";

export const getTodos = async (req: Request, res: Response): Promise<any> => {
  // get all the todos that are present in the database

  try {
    const todos = await Todo.find({});
    res.status(200).json({ todos });
  } catch (error: any) {
    console.log("Error when getting all the todos", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addTodo = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.params;
  const { title, description, completed } = req.body;

  try {
    const newTodo = await Todo.create({
      title,
      description,
      completed,
      userId,
    });
    res.status(201).json({
      _id: newTodo._id, // _id is userId but mongoDB automatically generates it as _id
      title: newTodo.title,
      description: newTodo.description,
      completed: newTodo.completed,
      userId: newTodo.userId,
      message: "Todo created successfully",
    });
  } catch (error: any) {
    console.log("Error when adding a new todo", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const editTodo = async (req: Request, res: Response): Promise<any> => {
  const { todoId } = req.params;
  const { title, description, completed } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { title, description, completed },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json({
      _id: updatedTodo._id,
      title: updatedTodo.title,
      description: updatedTodo.description,
      completed: updatedTodo.completed,
      userId: updatedTodo.userId,
      message: "Todo updated successfully",
    });
  } catch (error: any) {
    console.log("Error when editing a todo", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<any> => {
    const {todoId} = req.params;

    try{
        const deletedTodo = await Todo.findByIdAndDelete(todoId);
        if (!deletedTodo){
            return res.status(404).json({error: "Todo not found"})
        }
        res.status(200).json({
            _id: deletedTodo._id,
            title: deletedTodo.title,
            description: deletedTodo.description,
            completed: deletedTodo.completed,
            userId: deletedTodo.userId,
        })

    }catch(error:any){
        console.log("Error when deleting a todo", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
};
