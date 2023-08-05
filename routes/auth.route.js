import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js"


// Create an Express router to handle authentication-related routes
const router = express.Router();
// Route for user registration
router.post("/register", register);

// Route for user login
router.post("/login", login);
// Route for user logout
router.post("/logout", logout);
export default router;
