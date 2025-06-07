import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { registerPenginapan } from "../controllers/penginapanController.js";

const penginapanRouter = express.Router();

penginapanRouter.post("/", protect, registerPenginapan);

export default penginapanRouter;