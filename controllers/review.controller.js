import createError from "../utils/createError.js";
import Review from "../models/review.model.js";
import Course from "../models/course.model.js";
// Controller function to create a new review
export const createReview = async(req, res,next) => {
   
    if(req.isTutor){
        return next(createError(403, "tutor can not create Review!"));
    }
    // Check if the user is a tutor and prevent them from creating a review
    const newReview = new Review({
        userId: req.userId,
        courseId: req.body.courseId,
        desc: req.body.desc,
        star: req.body.star,
    })
    try{
        // Check if the user has already created a review for this course
       const review = await Review.findOne({
        courseId:req.body.courseId,
        userId: req.userId,
       });

       if(review){
        return next(createError(403, "you have already created review for this course"))
       }

       const savedReview = await newReview.save();
       // Increment the totalStars and starNumber fields of the associated course
       await Course.findByIdAndUpdate(req.body.courseId,{
        $inc:{totalStars: req.body.star, starNumber:1},
       }) 
       res.status(201).send(savedReview);
    }
    catch(err){
        next(err);
    }
}
// Controller function to get all reviews for a specific course
export const getReviews = async(req, res,next) => {
    try{
        const reviews = await Review.find({courseId:req.params.courseId})
        res.status(200).send(reviews);
    }
    catch(err){
        next(err);
    }
}
// Controller function to delete a review (not implemented yet)
export const deleteReviews = async(req, res,next) => {
    try{}
    catch(err){
        next(err);
    }
}