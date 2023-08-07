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
import { fileURLToPath } from "url"; // Import the 'fileURLToPath' function
import path from "path";

const __filename = fileURLToPath(import.meta.url); // Get the filename
const __dirname = path.dirname(__filename); // Get the directory name

const app = express();

app.use(cors({ origin: "https://coachme.onrender.com", credentials: true }));

app.use(express.json());
app.use(cookieParser());

dotenv.config();

mongoose.set('strictQuery', true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to dataBase");
  } catch (error) {
    console.log(error);
  }
}

app.use('/api/auth', authRoute)
app.use("/api/users", userRoute);
app.use("/api/courses", courseRoute);
app.use("/api/orders", orderRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/messages", messageRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/appointments", appointmentRoute);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set the static folder
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // Catch-all route for client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  connect();
});
