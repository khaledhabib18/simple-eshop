import { NextFunction, Request, Response, Express } from "express";
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
import { safeDeleteFiles } from "../utils/safeDeleteFiles";

export const addProduct = async (req: Request, res: Response) => {
    ProductSchema.parse(req.body);
    if (req.body.tags) {
        req.body.tags = req.body.tags.join(",");
    }
    const product = await createProductRepo(req.body);

    res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        ProductSchema.parse(req.body);
        const id = req.params.id as string;
        const product = await getSingleProduct(id);
        const filenames = product.images;
        safeDeleteFiles(filenames);
        const newProductData = req.body;
        if (newProductData.tags) {
            newProductData.tags = newProductData.tags.join(",");
        }
        newProductData.id = id;
        const updatedProduct = await updateProductRepo(newProductData);
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
        const id = req.params.id as string;
        const product = await getSingleProduct(id);
        const filenames = product.images;
        safeDeleteFiles(filenames);
        const deletedProductsCount = await deleteProductRepo(id);
        res.json(`Deleted ${deletedProductsCount} product(s)`);
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
