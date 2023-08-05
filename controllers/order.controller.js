// import createError from "../utils/createError.js"
import Course from "../models/course.model.js"
import Order from "../models/order.model.js"
import  { Stripe } from "stripe";

// Controller function to get all completed orders for a specific user (either tutor or student)
export const getOrders = async (req, res, next) => {
    try {
         // Fetch completed orders based on whether the user is a tutor or a student
        const orders = await Order.find({
            ...(req.isTutor ? { tutorId: req.userId } : { studentId: req.userId }),
            isCompleted: true,
        });
        res.status(200).send(orders);
    } catch (err) {
        next(err)
    }
}
// Controller function to confirm an order by updating its completion status
export const confirm = async (req, res, next) => {
    try {
        // Find the order with the specified payment_intent and update its completion status
        const orders = await Order.findOneAndUpdate({
            payment_intent: req.body.payment_intent,
        },
            {
                $set: {
                    isCompleted: true,
                },
            }
        );
        res.status(200).send("order has been confirmed");
    } catch (err) {
        next(err)
    }
}
// Controller function to create a new payment intent and order for a course
export const intent = async (req, res, next) => {
    const stripe = new Stripe(process.env.STRIPE);
    
    try {
        // Fetch the course details based on the specified course id
        const course = await Course.findById(req.params.id);

        // Create a new payment intent with the course price
        const paymentIntent = await stripe.paymentIntents.create({
            amount: course.price * 100,
            currency: 'cad',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        // Create a new order based on the course and payment intent details
        const newOrder = new Order({
            courseId: course._id,
            img: course.coverImage,
            title: course.title,
            studentId: req.userId,
            isCompleted: false,
            tutorId: course.userId,
            price: course.price,
            payment_intent: paymentIntent.id,
        });

        // Save the new order to the database
        await newOrder.save();

        // Increment the course sales by 1
        course.sales += 1;
        await course.save(); // Save the updated course sales count

        res.status(200).send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        next(error);
    }
};
export const update = async (req, res, next) => {
    try {
        
        const orders = await Order.findOneAndUpdate(
            { _id: req.params.id },
        
            {
                $set: {
                    isFinished: true,
                    
                },
            }
        );
        res.status(200).send("course has been finished ");
    } catch (err) {
        next(err)
    }
}