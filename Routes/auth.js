const express = require("express");
const bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const userModel = require("../models/userModel");
const router = express.Router();
dotenv.config();
//Signup Request--> sending user data to database
router.post("/signUp", async (req, res) => {
  const { name, email, mobile, password } = req.body;
  const isUSerExist = await userModel.findOne({ email });
  if (isUSerExist) {
    return res.status(400).json({ message: "User already exist" });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await userModel.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });
    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(404).json("Something went wrong while creating user");
  }
});
// Post request for login
router.post("/logIn", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Incorrect Email or password" });
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return res.status(400).json({ message: "Incorrect Email or password" });
  }

  const payload = {
    id: user._id
  };
  const token = Jwt.sign(payload, process.env.JWT_SECRET);
  res.status(200).json({ token });
});

module.exports = router;
