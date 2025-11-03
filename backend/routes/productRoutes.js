import express from "express";
import Product from "../models/productModel.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/",  async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Server  error", error: error.message });
  }
});

export default router;
