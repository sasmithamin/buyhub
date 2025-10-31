import express from "express";
const router = express.Router();

// Simple test route
router.get("/test", (req, res) => {
  res.json({ message: "Product route is working!" });
});

export default router;
