import { NextFunction, Request, Response } from "express";
import { ProductSchema } from "../schemas/products";
import { createProduct } from "../repositories/productRepo";

export const addProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    ProductSchema.parse(req.body);
    req.body.tags = req.body.tags.join();
    const product = await createProduct(req.body);

    res.json(product);
};
