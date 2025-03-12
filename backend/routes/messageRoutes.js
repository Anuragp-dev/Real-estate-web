import express from "express";
import {
  addMessage
} from "../controllers/messageController.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();


router.post("/add-message/:chatId", verifyToken, addMessage);

export default router;