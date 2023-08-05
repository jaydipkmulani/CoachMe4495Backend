import express from "express";
import { deleteUser, getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();
// Route to delete a user account by their ID
router.delete("/:id", verifyToken, verifyToken, deleteUser);
// Route to get a user's details by their ID
router.get("/:id", verifyToken, getUser);


export default router;

