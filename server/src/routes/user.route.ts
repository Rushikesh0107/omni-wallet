import express from "express"
import { verifyToken } from "../middleware/verify";
import { getUserById } from "../controller/user.controller";

const router = express.Router();

router.get("/get-user-by-id", verifyToken, getUserById)

export default router
