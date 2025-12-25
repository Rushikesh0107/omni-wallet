import { Request, Response } from "express";
import { prisma } from "../prisma";
import { APIResponse } from "../interface/api.interface";

const sendMoney = async (req: Request, res: Response) => {
  try {
    const { amount, beneficiaryId, cardDetails, upiDetails } = req.body;

    if (!amount || !beneficiaryId || (!cardDetails && !upiDetails)) {
      return res
        .status(400)
        .json({
          message: "Amount, beneficiaryId, cardDetails or upiDetails are required",
          data: null,
          success: false,
        } as APIResponse);
    }

    const beneficiary = await prisma.beneficiary.findUnique({
      where: {
        id: beneficiaryId,
      },
    });

    if (!beneficiary) {
      return res
        .status(404)
        .json({
          message: "Beneficiary not found",
          data: null,
          success: false,
        } as APIResponse);
    }

    const sender = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
    });

    if (!sender) {
      return res
        .status(404)
        .json({
          message: "Sender not found",
          data: null,
          success: false,
        } as APIResponse);
    }

    const transaction = await prisma.transaction.create({
      data: {
        amount: amount,
        userId: req.userId,
        beneficiaryId: beneficiaryId,
        status: "SUCCESS",
        cardInstrumentId : cardDetails,
        upiInstrumentId : upiDetails
      },
    });

    if(!transaction) {
        return res
        .status(500)
        .json({
            message: "Transaction failed",
            data: null,
            success: false,
        } as APIResponse);
    }

    return res
      .status(200)
      .json({
        message: "Transaction successful",
        data: transaction,
        success: true,
      } as APIResponse);

  } catch (error) {
    return res
      .status(500)
      .json({
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
            include : {
                cardInstrument : true,
                upiInstrument : true,
                beneficiary : true
            }
        });
        return res
            .status(200)
            .json({
                message: "Transactions fetched successfully",
                data: transactions,
                success: true,
            } as APIResponse);
    } catch (error) {
        return res
            .status(500)
            .json({
                message: `Internal Server Error: ${error}`,
                data: null,
                success: false,
            } as APIResponse);
    }
};

export {sendMoney, getTransactionsByUserId}
