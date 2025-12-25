import { Request, Response } from "express";
import { APIResponse } from "../interface/api.interface";
import { prisma } from "../prisma";

const getUserById = async (req : Request, res : Response) => {
    try {
        if(!req.userId) {
            return res
            .status(400)
            .json({
                message: "User in not authorized",
                data: null,
                success: false,
            } as APIResponse);
        }  

        const user =  await prisma.user.findUnique({
            where : {
                id : req.userId
            },
            include : {
                cardInstruments : true,
                upiInstruments : true,
            }
        })

        if(!user) {
            return res
            .status(404)
            .json({
                message: "User not found",
                data: null,
                success: false,
            } as APIResponse);
        }

        return res
        .status(200)
        .json({
            message: "User fetched successfully",
            data: user,
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
}

export { getUserById }
