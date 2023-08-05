import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { confirm,getOrders,intent,update } from "../controllers/order.controller.js";

const router = express.Router();
// Route to create a payment intent for a specific course (order)
router.post("/create-payment-intent/:id",verifyToken, intent);

// Route to confirm an order (set isCompleted flag to true)
router.put("/", verifyToken,confirm);
// Route to get all completed orders for a specific user (either tutor or student)
router.get("/",verifyToken,getOrders);
router.put("/:id",verifyToken,update);



export default router;

