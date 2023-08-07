import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
//
export const register = async (req, res, next) => {
    try {
        //by using bcrypt we are encrypting password for safety purpose
        const encryptPass = bcrypt.hashSync(req.body.password, 5)

        const newUser = new User({
            ...req.body,
            password: encryptPass
        })
        await newUser.save();
        res.status(201).send("User has been crated")

    } catch (err) {
        next(err)
    }
}
//
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return next(createError(404, "User not found!"));

        const isCorrect = bcrypt.compareSync(req.body.password, user.password)
        if (!isCorrect) return next(createError(400, "incorrect password or username"));


        const token = jwt.sign({
            id: user._id,
            isTutor: user.isTutor
        }, process.env.JWT_KEY)

        const { password, ...info } = user._doc
res.cookie("accessToken", token, {
  httpOnly: true,
  secure: true, // Set this for secure connections (HTTPS)
  sameSite: "none", // Set this for cross-site cookies
});
    } catch (err) {
        next(err);
    }
}
export const logout = async (req, res) => {
    res.clearCookie("accessToken", {

        sameSite: "none",
        secure: true,
    }).status(200).send("user has been logged out.")
}; 