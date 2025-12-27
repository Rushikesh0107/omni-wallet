import { Request, Response } from "express";
import { APIResponse } from "../interface/api.interface";
import { prisma } from "../prisma";
import QRCode from "qrcode";

const addCard = async (req: Request, res: Response) => {
  try {
    const {
      bankName,
      cardNumber,
      fullName,
      expiryMonth,
      expiryYear,
      cvv,
      cardType,
    } = req.body;

    if (
      !bankName ||
      !cardNumber ||
      !fullName ||
      !expiryMonth ||
      !expiryYear ||
      !cvv ||
      !cardType
    ) {
      return res.status(400).json({
        message: "All fields are required",
        data: null,
        success: false,
      } as APIResponse);
    }

    const cardExists = await prisma.cardInstrument.findFirst({
      where: {
        cardNumber,
        userId: req.userId,
      },
    });

    if (cardExists) {
      return res.status(400).json({
        message: "Card already exists",
        data: null,
        success: false,
      } as APIResponse);
    }

    const card = await prisma.cardInstrument.create({
      data: {
        bankName: bankName,
        cardNumber: cardNumber,
        fullName: fullName,
        expiryMonth: expiryMonth,
        expiryYear: expiryYear,
        cvv: cvv,
        cardType: cardType,
        userId: req.userId,
      },
    });

    if (!card) {
      return res.status(500).json({
        message: "Failed to add instrument",
        data: null,
        success: false,
      } as APIResponse);
    }

    return res.status(200).json({
      message: "Card added successfully",
      data: card,
      success: true,
    } as APIResponse);
  } catch (error) {
    return res.status(500).json({
      message: `Internal server error ${error}`,
      data: null,
      success: false,
    } as APIResponse);
  }
};

const addUPI = async (req: Request, res: Response) => {
  try {
    const { upiId, upiName, upiPhone } = req.body;

    if (!upiId || !upiName || !upiPhone) {
      return res.status(400).json({
        message: "upiId, upiName and upiPhone are required",
        data: null,
        success: false,
      } as APIResponse);
    }

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        data: null,
        success: false,
      } as APIResponse);
    }

    const upiPayload = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      upiName
    )}&cu=INR`;
    const qrCode = await QRCode.toDataURL(upiPayload);

    const upiInstrument = await prisma.upiInstrument.create({
      data: {
        upiId,
        upiName,
        upiPhone,
        qrCode,
        userId: req.userId,
      },
    });

    return res.status(201).json({
      message: "UPI added successfully",
      data: {
        id: upiInstrument.id,
        upiId: upiInstrument.upiId,
        upiName: upiInstrument.upiName,
        qrCode: upiInstrument.qrCode,
      },
      success: true,
    } as APIResponse);

  } catch (error) {
    console.error("ADD_UPI_ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      data: null,
      success: false,
    } as APIResponse);
  }
};

export { addCard, addUPI };
