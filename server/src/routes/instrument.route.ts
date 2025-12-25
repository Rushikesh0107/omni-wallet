import express from "express";
import { verifyToken } from "../middleware/verify";
import { addCard, addUPI } from "../controller/instrument.controller";

const router = express.Router();

router.post("/add-card", verifyToken, addCard);

router.post("/add-upi", verifyToken, addUPI);

export default router;
