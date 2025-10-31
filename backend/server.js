import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";


connectDB();
const app = express();

app.use(cors());
app.use(express.json()); 

app.get("/", (req, res) => {
    res.send("BuyHub API running");
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ Message: err.Message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>  console.log('Server running from ${PORT}'));
