import { Request, Response } from "express";
import { prisma } from "../prisma";
import { APIResponse } from "../interface/api.interface";

const sendMoney = async (req: Request, res: Response) => {
  try {
    const { amount, beneficiaryId, cardDetails, upiDetails } = req.body;

    console.log(amount, beneficiaryId, cardDetails);

    if (!amount || !beneficiaryId) {
      return res.status(400).json({
        message: "Amount and beneficiaryId are required",
        data: null,
        success: false,
      } as APIResponse);
    }

    if ((cardDetails && upiDetails) || (!cardDetails && !upiDetails)) {
      return res.status(400).json({
        message: "Provide exactly one payment method (card or UPI)",
        data: null,
        success: false,
      } as APIResponse);
    }

    const beneficiary = await prisma.beneficiary.findUnique({
      where: { id: beneficiaryId },
    });

    if (!beneficiary) {
      return res.status(404).json({
        message: "Beneficiary not found",
        data: null,
        success: false,
      } as APIResponse);
    }

    const sender = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!sender) {
      return res.status(404).json({
        message: "Sender not found",
        data: null,
        success: false,
      } as APIResponse);
    }

    let cardInstrumentId: string | null = null;
    let upiInstrumentId: string | null = null;

    if (cardDetails) {
      console.log("REQ userId:", req.userId, cardDetails);

      const card = await prisma.cardInstrument.findUnique({
        where: { id: cardDetails },
      });

      console.log("CARD userId:", card?.userId);

      if (!card) {
        return res.status(404).json({
          message: "Card instrument not found or unauthorized",
          data: null,
          success: false,
        } as APIResponse);
      }

      cardInstrumentId = card.id;
    }

    if (upiDetails) {
      const upi = await prisma.upiInstrument.findFirst({
        where: {
          id: upiDetails,
          userId: req.userId,
        },
      });

      if (!upi) {
        return res.status(404).json({
          message: "UPI instrument not found or unauthorized",
          data: null,
          success: false,
        } as APIResponse);
      }

      upiInstrumentId = upi.id;
    }

    const transaction = await prisma.transaction.create({
      data: {
        amount,
        userId: req.userId,
        beneficiaryId,
        status: "SUCCESS",
        cardInstrumentId,
        upiInstrumentId,
      },
    });

    return res.status(200).json({
      message: "Transaction successful",
      data: transaction,
      success: true,
    } as APIResponse);
  } catch (error) {
    console.error("SendMoney Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      data: null,
      success: false,
    } as APIResponse);
  }
};

const getTransactionsByUserId = async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: req.userId,
      },
      include: {
        cardInstrument: true,
        upiInstrument: true,
        beneficiary: true,
      },
    });
    return res.status(200).json({
      message: "Transactions fetched successfully",
      data: transactions,
      success: true,
    } as APIResponse);
  } catch (error) {
    return res.status(500).json({
      message: `Internal Server Error: ${error}`,
      data: null,
      success: false,
    } as APIResponse);
  }
};

export { sendMoney, getTransactionsByUserId };
