import { NextFunction, Request, Response } from "express";
import { Role } from "../generated/prisma/enums";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";

export const adminMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = req.user;
    if (user.role === Role.ADMIN) {
        next();
    } else {
        next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
    }
};
