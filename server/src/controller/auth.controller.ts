import { Request, Response } from "express";
import { APIResponse } from "../interface/api.interface";
import { prisma } from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        data: null,
        success: false,
      } as APIResponse);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
        data: null,
        success: false,
      } as APIResponse);
    }

    const token = jwt.sign({userId : user.id}, process.env.JWT_SECRET || "secret", {expiresIn : "1hr"})

    return res
    .status(200)
    .cookie("token", token, {httpOnly : true})
    .json({
      message: "User logged in successfully",
      data: user,
      success: true,
    } as APIResponse);

  } catch (error) {
    return res.status(500).json({ message: `Internal server error ${error}` });
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return res.status(400).json({
        message: "User already exists",
        data: user,
        success: false,
      } as APIResponse);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({userId : newUser.id}, process.env.JWT_SECRET || "secret", {expiresIn : "1hr"})

    return res
    .status(200)
    .cookie( "token" ,token, {httpOnly : true})
    .json({
      message: "User created successfully",
      data: newUser,
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

export { login, register };
