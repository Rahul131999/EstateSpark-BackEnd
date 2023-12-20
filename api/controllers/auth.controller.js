import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {errorHandler} from "../utils/error.js"

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  const hashedPass = bcrypt.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPass });

  try {
    await newUser.save();

    res.status(201).json({
      msg: "User Created Successfully",
    });
  } catch (error) {
    next(error)
  }
};
