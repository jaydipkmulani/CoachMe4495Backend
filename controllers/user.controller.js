import User from "../models/user.model.js"
import createError from "../utils/createError.js";
// Controller function to delete a user account
export const deleteUser = async (req, res, next) => {

    const user = await User.findById(req.params.id)
// Check if the authenticated user is authorized to delete their account
    if (req.userId !== user._id.toString()) {
        return next(createError(403, "you can only delete your account"));
    }
    await User.findByIdAndDelete(req.params.id);
    res
        .status(200)
        .send("user deleted");

};
// Controller function to get a user's details by their id
export const getUser = async (req, res, next) => {

    const user = await User.findById(req.params.id)

    res
        .status(200)
        .send(user);

};

