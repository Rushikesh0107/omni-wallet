import express from "express";
import { verifyToken } from "../middleware/verify";
import { addBeneficiary, getBeneficiaryByUserId } from "../controller/beneficiary.controller";

const router = express.Router();

router.post("/add-beneficiary", verifyToken, addBeneficiary);

router.get("/get-beneficiary-by-user-id", verifyToken, getBeneficiaryByUserId);

export default router;