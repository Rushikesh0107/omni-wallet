import express from "express"
import { sendMoney, getTransactionsByUserId } from "../controller/transaction.controller"
import { verifyToken } from "../middleware/verify"

const router = express.Router()

router.post("/send-money", verifyToken, sendMoney)

router.get("/get-transaction-by-user-id", verifyToken, getTransactionsByUserId)

export default router