import express from "express";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import { protect} from "../middleware/authMiddleware.js";

const router =  express.Router();

//register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User alrady exists"});
  }
  
  const user =  await User.create({ name, email, password});

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

//logins
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user =  await User.findOne({ email });

  if (user && (await  bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({  message: "Invalid  email or  password" });
  }
});

//profile
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (user) {
      req.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin:  user.isAdmin,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }

  } catch (error) {
    console.error("Profile route error:", error.message);
    res.status(500).json({ message: "  Server error"});
  }
  
});

export default router;
