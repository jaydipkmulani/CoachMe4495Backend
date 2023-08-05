import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
// Middleware function to verify the JSON Web Token (JWT) and extract user information
export const verifyToken = (req, res, next) => {
     // Get the token from the request cookies
    const token = req.cookies.accessToken;
    if (!token) return next(createError(401, "You are not authenticated!"))

// Verify the token using the JWT secret key
    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
        if (err) return next(createError(403, "Token is not valid!"))
        // Extract the user information (user ID and tutor status) from the token payload
        req.userId = payload.id;
        req.isTutor = payload.isTutor;
        next()
    });
};
