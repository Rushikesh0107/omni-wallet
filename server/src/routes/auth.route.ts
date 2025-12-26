import express from "express";
import { login, register } from "../controller/auth.controller";
import { verifyToken } from "../middleware/verify";
import { APIResponse } from "../interface/api.interface";
import { Request, Response } from "express";

const router = express.Router();

router.post("/login", login);

router.post("/register", register)

router.get("/me", verifyToken, (req : Request, res : Response) => {
    return res.status(200).json({
        message: "User is authorized",
        data: req.userId,
        success: true,
    } as APIResponse);
})

export default router;