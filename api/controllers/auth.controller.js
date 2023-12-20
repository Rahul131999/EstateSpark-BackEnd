import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPass = bcrypt.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPass });

  try {
    await newUser.save();

    res.status(201).json({
      msg: "User Created Successfully",
    });
  } catch (error) {
    res.status(500).json(error.message)
  }
};
