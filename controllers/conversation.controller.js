// import createError from "../utils/createError.js";
import Conversation from "../models/conversation.model.js"
// Controller function to create a new conversation
export const createConversation = async (req, res, next) => {
    const newConversation = new Conversation({
        id: req.isTutor ? req.userId + req.body.to : req.body.to + req.userId,
        tutorId: req.isTutor ? req.userId : req.body.to, studentId: req.isTutor ? req.body.to : req.userId,
        readByTutor: req.isTutor, readByStudent: !req.isTutor
    });

    try {
        // Save the new conversation to the database
        const savedConversation = await newConversation.save();
        res
            .status(201)
            .send(savedConversation);
    } catch (err) {
        next(err)
    }
};

// Controller function to get all conversations for a specific user
export const getConversations = async (req, res, next) => {
    try {
        const conversations = await Conversation.find(
            req.isTutor ? { tutorId: req.userId } : { studentId: req.userId });
        res.status(200).send(conversations);
    } catch (err) {
        next(err)
    }
}

// Controller function to get a single conversation by its id
export const getSingleConversation = async (req, res, next) => {
    try {
        const conversation = await Conversation.findOne(
            { id: req.params.id });
            if (!conversation){
                 return res.status(404).send("not Found");
            }
        res.status(200).send(conversation);
    } catch (err) {
        next(err)
    }
}
// Controller function to update a conversation's read status
export const updateConversation = async (req, res, next) => {
    try {
        const updateConversation = await Conversation.findOneAndUpdate(
            { id: req.params.id },
            {
                $set: {
                    ...(req.isTutor ? { readByTutor: true } : { readByStudent: true }),
                },
            },
            { new: true }
        );
        res.status(200).send(updateConversation);
    } catch (err) {
        next(err)
    }
}