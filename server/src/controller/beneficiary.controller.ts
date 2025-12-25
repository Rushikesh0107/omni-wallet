import { Request, Response } from "express";
import { APIResponse } from "../interface/api.interface";
import { prisma } from "../prisma";

const addBeneficiary = async (req: Request, res: Response) => {
  try {
    const { name, phoneNumber } = req.body;

    if (!name || !phoneNumber) {
      return res.status(400).json({
        message: "All fields are required",
        data: null,
        success: false,
      } as APIResponse);
    }

    const beneficiary = await prisma.beneficiary.create({
      data: {
        name: name,
        phoneNumber: phoneNumber,
        userId: req.userId,
      },
    });

    if (!beneficiary) {
      return res.status(500).json({
        message: "Failed to add beneficiary",
        data: null,
        success: false,
      } as APIResponse);
    }

    return res.status(200).json({
      message: "Beneficiary added successfully",
      data: beneficiary,
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

const getBeneficiaryByUserId = async (req: Request, res: Response) => {
  try {
    const beneficiaries = await prisma.beneficiary.findMany({
      where: {
        userId: req.userId,
      },
    });

    if (!beneficiaries) {
      return res.status(404).json({
        message: "No beneficiaries found",
        data: null,
        success: false,
      } as APIResponse);
    }

    return res.status(200).json({
      message: "Beneficiaries fetched successfully",
      data: beneficiaries,
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

export { addBeneficiary, getBeneficiaryByUserId };
