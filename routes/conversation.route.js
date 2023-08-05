import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {getConversations,createConversation,getSingleConversation,updateConversation} from "../controllers/conversation.controller.js";


// Create an Express router to handle conversation-related routes
const router = express.Router();
// Route to get all conversations for a specific user
router.get("/",verifyToken, getConversations);
// Route to create a new conversation
router.post("/", verifyToken,createConversation);
// Route to get a single conversation by its id
router.get("/single/:id", verifyToken,getSingleConversation);

// Route to update a conversation's read status
router.put("/:id",verifyToken, updateConversation);

export default router;

