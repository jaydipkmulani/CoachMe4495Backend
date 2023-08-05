import express from "express";

import { verifyToken } from "../middleware/jwt.js";
import { createMessages,getMessages } from "../controllers/message.controller.js";

const router = express.Router();

// Route to create a new message in a conversation
router.post("/",verifyToken,createMessages);
// Route to get all messages for a specific conversation
router.get("/:id",verifyToken,getMessages);

export default router;

