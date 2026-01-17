import { Decimal } from "@prisma/client/runtime/client";
import { prisma } from "./prisma";
import { Request } from "express";

interface ProductData {
    id?: string;
    name: string;
    description: string;
    price: number;
    tags: string;
    inStock: number;
    images: string[];
}
interface UpdatingProductData {
    id: string;
    name: string;
    description: string;
    price: number;
    tags: string;
    inStock: number;
    images: string[];
}

export const createProductRepo = async (data: ProductData) => {
    const product = await prisma.product.create({
        data: data,
    });
    return product;
};

export const updateProductRepo = async (data: UpdatingProductData) => {
    const product = await prisma.product.update({
        where: {
            id: data.id,
        },
        data: data,
    });
    return product;
};

export const deleteProductRepo = async (id: string) => {
    const deletedProductsCount = await prisma.product.delete({
        where: {
            id: id,
        },
    });
    return deletedProductsCount;
};

export const getProductsCount = async () => {
    const count = await prisma.product.count();
    return count;
};

export const getProducts = async (skip: number) => {
    const products = await prisma.product.findMany({
        skip: skip || 0,
        take: 5,
    });
    return products;
};

export const getSingleProduct = async (id: string) => {
    const product = await prisma.product.findFirstOrThrow({
        where: {
            id,
        },
    });
    return product;
};
