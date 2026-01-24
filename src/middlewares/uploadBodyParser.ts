import { NextFunction, Request, Response } from "express";

export const uploadBodyParser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const files = req.files as Express.Multer.File[];
    if (files) {
        const filenames: string[] = files.map(
            (file: Express.Multer.File) => file.filename
        );

        req.body.images = filenames as string[];
    } else {
        req.body.images = [];
    }
    req.body.price = parseFloat(req.body.price);
    req.body.inStock = parseInt(req.body.inStock);
    next();
};
