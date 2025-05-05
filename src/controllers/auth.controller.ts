import { Request, Response } from "express";
import User from "../models/user.model.js";

export const signUp = async (req: Request, res: Response): Promise<any> => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    if (!username || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "All fields are required to continue" });
    }
    // validate if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // check if user already exists in db

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // create new user

    const newUser = await User.create({ username, email, password });

    if (newUser) {
      return res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      });
    }
  } catch (error: any) {
    console.log("Error in signUp controller", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required to continue" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Crendentials" });
    }

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      message: "Login successful",
    });
  } catch (error: any) {
    console.log("Error in login controller", error.message);
    return res.status(500).json({ error: error.message });
  }
};
