import { NextFunction, Request, Response } from "express";
import { ErrorCode, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exception";
import { ZodError } from "zod";
import { BadRequestsExeption } from "./exceptions/bad-requests";

// high level function
export const erroHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next);
        } catch (error: any) {
            console.log("🔥 ORIGINAL ERROR:", error); // <--- add this
            let exception: HttpException;
            if (error instanceof HttpException) {
                exception = error;
            } else {
                if (error instanceof ZodError) {
                    exception = new BadRequestsExeption(
                        "Unprocessable entity",
                        ErrorCode.UNPROCESSABLE_ENTITY
                    );
                } else {
                    exception = new InternalException(
                        error.message || "Something went wrong", // <--- show real message
                        error,
                        ErrorCode.INTERNAL_EXCEPTION
                    );
                }
            }
            next(exception);
        }
    };
};
