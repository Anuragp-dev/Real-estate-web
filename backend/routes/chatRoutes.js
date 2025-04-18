import express from "express";
import {
    getChats,
    getChat,
    addChat,
    readChat,
} from "../controllers/chatController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// full chats
router.get("/", verifyToken, getChats);
router.get("/:id", verifyToken, getChat);
router.post("/add-chat", verifyToken, addChat);
router.put("/read/:id", verifyToken, readChat);

export default router;