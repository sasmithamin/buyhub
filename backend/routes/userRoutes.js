import express from "express";
import User from "../models/userModel.js";

const router =  express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User alrady exists"});
  }
  
  const user =  await User.create({ namee, email, password});

  if(user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400).json({ message: "Invalid user data"});
  }
});

export default router;
