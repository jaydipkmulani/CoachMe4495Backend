import createError from "../utils/createError.js"
import Message from "../models/message.model.js"
import Conversation from "../models/conversation.model.js"

// Controller function to create a new message
export const createMessages = async (req, res, next) => {
    const newMessage = new Message({
        conversationId: req.body.conversationId,
        userId: req.userId,
        message: req.body.desc,
    })
    try {
         // Save the new message to the database
        const savedMessage = await newMessage.save();
         // Update the conversation's read status and lastMessage based on the sender type (tutor or student)
        await Conversation.findOneAndUpdate({ id: req.body.conversationId }, {
            $set: {
                readByTutor: req.isTutor,
                readByStudent: !req.isTutor,
                lastMessage: req.body.desc,
            }
        }, { new: true });
        res.status(201).send(savedMessage);
    } catch (err) {
        next(err)
    }
}
// Controller function to get all messages for a specific conversation
export const getMessages = async (req, res, next) => {
    // Fetch all messages for the specified conversation id
    const message = await Message.find({ conversationId: req.params.id });
    res.status(200).send(message);
    try {

    } catch (err) {
        next(err)
    }
}