
import express from "express";
import { deleteUser, getUser, getUsers, savePost, updateUser, ProfilePosts } from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";


const router = express.Router();

router.get("/getUsers", getUsers);
router.get("/getUser/:id",verifyToken, getUser);
router.put("/update_user/:id", verifyToken, updateUser);
router.delete("/delete_user/:id", verifyToken, deleteUser);
router.post("/save-post", verifyToken, savePost);
router.get("/profilePosts", verifyToken, ProfilePosts);
export default router;