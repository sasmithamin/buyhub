import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/userModel.js";

dotenv.config();

const userId = process.argv[2];
const newPassword = process.argv[3];

if (!userId ||  !newPassword) {
    console.error("Usage: node resetPassword.js <userId> <newPassword>");
    process.exit(1);
}

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        const salt = await bcrypt.genSalt(10);
        user.newPassword = await bcrypt.hash(newPassword, salt);
        await user.save();

        console.log(`Password updated for  user: ${user.email}`);
        process.exit(0);
    } catch (error) {
        console.error("Error updating password:", error.message);
        process.exit(1);
    }
};

run();