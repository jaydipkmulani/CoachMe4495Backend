import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { createReview, getReviews, deleteReviews } from "../controllers/review.controller.js";

const router = express.Router();

// Route to create a new review for a course, protected by the `verifyToken` middleware to ensure authentication
router.post("/", verifyToken, createReview);
// Route to get all reviews for a specific course by its ID, also protected by the `verifyToken` middleware
router.get("/:courseId", verifyToken, getReviews)
// Route to delete a review by its ID, protected by the `verifyToken` middleware
router.delete("/:id", verifyToken, deleteReviews)

export default router;

