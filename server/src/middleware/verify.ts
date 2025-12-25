import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { APIResponse } from "../interface/api.interface";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
        data: null,
        success: false,
      } as APIResponse);
    }
    const data = jwt.verify(token, process.env.JWT_SECRET as Secret) as {
      userId: string;
    };
    req.userId = data.userId;
    next();
  } catch (e) {}
};

export { verifyToken };
