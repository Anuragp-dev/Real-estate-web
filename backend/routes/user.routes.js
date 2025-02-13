
import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { getUser, getUsers } from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";


const router = express.Router();

router.get("/getUsers", getUsers);
router.get("/getUser/:id",verifyToken, getUser);
router.post("/logout", logout);

export default router;