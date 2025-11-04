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

router.post("/", protect, async (req, res) =>{
  const { name, image, brand, category, description, price, countInStock } = req.body;
  
  try {
    const product = new Product({
      user: req.user._id,
      name,
      image,
      brand,
      category,
      description,
      price,
      countInStock,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);

  } catch (error) {
    console.error(" Adding products error ");
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
