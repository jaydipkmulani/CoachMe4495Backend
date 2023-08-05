import courseModel from "../models/course.model.js";
import Course from "../models/course.model.js";
import createError from "../utils/createError.js";
// Controller function to create a new course
//create course function will first check that its tutor who or not and then it will allow user to create course 
export const createCourse = async (req, res, next) => {
    if (!req.isTutor) return next(createError(403, "Only tutor can create course "));

    const newCourse = new Course({
        userId: req.userId,
        ...req.body,
    });

    try {
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (err) {
        next(err);
    };

};
// Controller function to delete a course
export const deleteCourse = async (req, res, next) => {

    try {
        const course = await Course.findById(req.params.id);

        if (course.userId !== req.userId) {
            return next(createError(403, "you can delete only your course "));
        }
        await Course.findByIdAndDelete(req.params.id);
        res.status(200).send("Course has been deleted");
    } catch (err) {
        next(err);
    }
};

// Controller function to find a single course by its id 
export const getCourse = async (req, res, next) => {

    try {
        const course = await Course.findById(req.params.id);
        if (!course){
             return next(createError(404, "course not found"));}
        res.status(200).send(course);
    } catch (err) {
        next(err);
    }
};
// Controller function to get a list of courses based on various filters
export const getCourses = async (req, res, next) => {
    const q = req.query;

    const filters = {
        ...(q.courseCategory && { courseCategory: q.courseCategory }),
        ...(q.userId && { userId: q.userId }),
        ...((q.min || q.max) && { price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) } }),
        ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    };
    try {
        const course = await Course.find(filters).sort({[q.sort]:-1});
        if (!course) return next(createError(404, "course not found"));
        res.status(200).send(course);
    } catch (err) {
        next(err);
    };
};