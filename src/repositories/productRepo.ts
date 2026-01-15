import { Decimal } from "@prisma/client/runtime/client";
import { prisma } from "./prisma";

interface productData {
    name: string;
    description: string;
    price: Decimal;
    tags: string;
}

export const createProduct = async (data: productData) => {
    const product = await prisma.product.create({
        data: data,
    });
    return product;
};
