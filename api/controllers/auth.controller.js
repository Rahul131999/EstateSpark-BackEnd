import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) return next(errorHandler(404, "User Not Found"));

    const validPass = bcrypt.compareSync(password, validUser.password);

    if (!validPass) return next(errorHandler(401, "Wrong Credentials"));

    const { password: pass, ...safeUser } = validUser._doc;

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(safeUser);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { name, email, photo } = req.body;

  try {
    const validUser = await User.findOne({ email });

    if (validUser) {

      const { password: pass, ...safeUser } = validUser._doc;

      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(safeUser);
    } else {
      const generatePass = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
      const hashedPass = bcrypt.hashSync(generatePass,10)

      const user = new User({
        username: name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4),
        email,
        password:hashedPass,
        avatar:photo,
      })

      await user.save()

      const { password: pass, ...safeUser } = user._doc;

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(safeUser);

    }
  } catch (error) {
    next(error);
  }
};
