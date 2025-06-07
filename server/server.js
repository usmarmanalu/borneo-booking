import express from "express"
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoutes.js";
import penginapanRouter from "./routes/penginapanRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

connectDB();
connectCloudinary();

const app = express();

// Enable Cross-Origin Resource Sharing
app.use(cors());

// API to listen to cleerk webhook
// app.use("/api/clerk", clerkWebhooks);
app.use("/api/clerk", bodyParser.raw({ type: "*/*" }), clerkWebhooks);

// Middleware
app.use(express.json())
app.use(clerkMiddleware())

app.get("/", (req, res) => res.send("API is working"))
app.use('/api/user', userRouter)
app.use('/api/penginapan', penginapanRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/bookings', bookingRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));