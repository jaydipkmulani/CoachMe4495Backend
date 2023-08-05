import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import orderRoute from "./routes/order.route.js";
import reviewRoute from "./routes/review.route.js";
import messageRoute from "./routes/message.route.js";
import conversationRoute from "./routes/conversation.route.js";
import authRoute from "./routes/auth.route.js";
import appointmentRoute from "./routes/appointment.route.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors({ origin: "https://coachmefrontend.onrender.com", credentials: true }));


app.use(express.json());
app.use(cookieParser());


dotenv.config();

mongoose.set('strictQuery', true)


// Function to connect to the MongoDB database
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to dataBase");
  } catch (error) {
    console.log(error)

  }
}

// Function to connect to the MongoDB database
app.use('/api/auth', authRoute)
// Endpoints for various routes
app.use("/api/users", userRoute);
app.use("/api/courses", courseRoute);
app.use("/api/orders", orderRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/messages", messageRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/appointments", appointmentRoute);


// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});
const PORT = process.env.PORT || 8800;
// Start the server and connect to the database
app.listen(PORT, () => {
  connect()

}); 