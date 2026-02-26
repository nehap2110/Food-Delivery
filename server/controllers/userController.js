import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  try {
    return jwt.sign({ id }, process.env.JWT_SECRET);
  } catch (error) {
    console.log("error in create token (userconroller) ", error.message);
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User don't exist" });
    }
    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token, message: "Logged In", user: user.name });
  } catch (error) {
    console.log("error in login (user controller) ", error.message);
    return res.json({ success: false, message: "Error " });
  }
};

export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "Email already exist" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Password too short" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({ success: true, token, message: "Signed In", user: user.name });
  } catch (error) {
    console.log("error in register (user controller) ", error.message);
    return res.json({ success: false, message: "Internal server error" });
  }
};


