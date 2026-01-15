import { NextFunction, Request, Response } from "express";
import { ProductSchema } from "../schemas/products";
import {
    createProductRepo,
    deleteProductRepo,
    getProducts,
    getProductsCount,
    getSingleProduct,
    updateProductRepo,
} from "../repositories/productRepo";
import { NotFoundExeption } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const addProduct = async (req: Request, res: Response) => {
    ProductSchema.parse(req.body);
    req.body.tags = req.body.tags.join(",");
    const product = await createProductRepo(req.body);

    res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = req.body;
        if (product.tags) {
            product.tags = product.tags.join(",");
        }
        product.id = req.params.id;
        const updatedProduct = await updateProductRepo(product);
        res.json(updatedProduct);
    } catch (err) {
        throw new NotFoundExeption(
            "Product Not Found",
            ErrorCode.PRODUCT_NOT_FOUND
        );
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id as string;
        const deletedProductsCount = await deleteProductRepo(id);
        res.json(`Deleted`);
    } catch (err) {
        throw new NotFoundExeption(
            "Product Not Found",
            ErrorCode.PRODUCT_NOT_FOUND
        );
    }
};

export const listProducts = async (req: Request, res: Response) => {
    // pagination
    const skip: number = +req.query.skip!;
    console.log(skip);
    const count = await getProductsCount();
    const products = await getProducts(skip);
    res.json({ count, data: products });
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id as string;
        const product = await getSingleProduct(id);
        res.json(product);
    } catch (err) {
        throw new NotFoundExeption(
            "Product Not Found",
            ErrorCode.PRODUCT_NOT_FOUND
        );
    }
};
