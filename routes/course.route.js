import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { createCourse, deleteCourse, getCourse, getCourses } from "../controllers/course.controller.js";


const router = express.Router();
// Route to create a new course
router.post("/", verifyToken,createCourse);
// Route to delete a course by its ID
router.delete("/:id", verifyToken, deleteCourse);
// Route to get a single course by its ID
router.get("/single/:id", verifyToken, getCourse);
// Route to get a list of courses
router.get("/",  getCourses);


export default router;

