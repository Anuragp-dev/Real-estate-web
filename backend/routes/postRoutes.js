import express from "express";
import { shouldBeLoggedIn } from "../controllers/testController.js";
import { verifyToken } from "../middleware/verifyToken.js";


const router = express.Router();


router.post("/verifyLogin",shouldBeLoggedIn)



export default router;