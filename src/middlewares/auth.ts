import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prisma } from "../repositories/prisma";

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1]!; // bearer token
    if (!token) {
        next(
            new UnauthorizedException("Token not found", ErrorCode.UNAUTHORIZED)
        );
    }
    try {
        const payload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
        const user = await prisma.user.findFirst({
            where: { id: payload.userId },
        });
        if (!user) {
            next(
                new UnauthorizedException(
                    "Unauthorized",
                    ErrorCode.UNAUTHORIZED
                )
            );
        } else {
            req.user = user;
            next();
        }
    } catch (err) {
        next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
    }
};
