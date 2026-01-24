import { Request, Response } from "express";
import { ChangeQuantitySchema, CreateCartSchema } from "../schemas/cart";
import { CartItem, Product } from "../generated/prisma/client";
import { getSingleProduct } from "../repositories/productRepo";
import { NotFoundExeption } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { prisma } from "../repositories/prisma";
import { BadRequestsExeption } from "../exceptions/bad-requests";

export const addItemToCart = async (req: Request, res: Response) => {
    const validatedData = CreateCartSchema.parse(req.body);
    let product: Product;
    try {
        product = await getSingleProduct(validatedData.productId);
    } catch (err) {
        throw new NotFoundExeption("Product not found", ErrorCode.PRODUCT_NOT_FOUND)
    }
    const itemInCart = await prisma.cartItem.findFirst({
        where: {
            userId: req.user.id,
            productId: validatedData.productId
        }
    })
    if (itemInCart) {
        const newQuantity = itemInCart.quantity + validatedData.quantity;
        const updatedCartItem = await prisma.cartItem.update({
            where: {
                id: itemInCart.id
            },
            data: {
                quantity: newQuantity
            }
        })
        res.send(updatedCartItem);
    } else {
        const cartItem = await prisma.cartItem.create({
            data: {
                userId: req.user.id,
                ...validatedData
            }
        })
        res.send(cartItem);
    }

}
export const deleteItemFromCart = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    await prisma.cartItem.delete({
        where: {
            id,
            userId: req.user.id
        }
    })
    res.send({ success: true })
}
export const changeQuantity = async (req: Request, res: Response) => {
    const validatedData = ChangeQuantitySchema.parse(req.body);
    const id = req.params.id as string;
    const updatedItem = await prisma.cartItem.update({
        where: {
            id,
            userId: req.user.id
        },
        data: {
            quantity: validatedData.quantity
        }
    })
    res.send(updatedItem);
}

export const getCart = async (req: Request, res: Response) => {
    const cart = await prisma.cartItem.findMany({
        where: {
            userId: req.user.id
        },
        include: {
            product: true
        }
    })
    res.send(cart);
}