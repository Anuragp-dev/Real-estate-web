import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { addPost, deletePost, getPost, getPosts, updatePost } from "../controllers/postController.js";


const router = express.Router();


router.post("/addPost", verifyToken, addPost)
router.post("/Update_Post/:id", verifyToken, updatePost)
router.post("/Delete_Post/:id", verifyToken, deletePost)
router.get("/getPosts", getPosts)
router.post("/getPost/:id", verifyToken, getPost)



export default router;