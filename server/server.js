import express from "express"
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";

connectDB()

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));