import { Request, Response } from "express";
import { prisma } from "../repositories/prisma";
import { NotFoundExeption } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { generateInvoicePDF } from "../utils/generateInvoice";
import { sendInvoiceMail } from "../utils/sendInvoiceMail";
import { safeDeleteFiles } from "../utils/safeDeleteFiles";

export const createOrder = async (req: Request, res: Response) => {
  // 1. to create a transaction
  // 2. list all the cart items and proceed if cart is not empty
  // 3. calculate the total amount
  // 4. fetch user address
  // 5. define the formatted address
  // 6. create an order object and save it to the database
  // 7. create order products and event of the order
  // 8. empty the user cart
  return await prisma.$transaction(async (tx) => {
    const cartItems = await tx.cartItem.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        product: true,
      },
    });
    if (cartItems.length === 0) {
      res.send({
        message: "Cart is empty",
      });
      return;
    }
    const price = cartItems.reduce((prev, current) => {
      return prev + current.quantity * +current.product.price;
    }, 0);
    const address = await tx.address.findFirst({
      where: {
        id: req.user.defaultShippingAddressId,
      },
    });
    const order = await tx.order.create({
      data: {
        userId: req.user.id,
        netAmount: price,
        address: address!.formattedAddress,
        orderProducts: {
          create: cartItems.map((cart) => {
            return {
              productId: cart.productId,
              quantity: cart.quantity,
            };
          }),
        },
        orderEvents: {
          create: {},
        },
      },
    });
    await tx.cartItem.deleteMany({
      where: {
        userId: req.user.id,
      },
    });
    const invoiceOrder = await tx.order.findFirstOrThrow({
      where: {
        id: order.id,
      },
      include: {
        user: true,
      },
    });
    const invoiceOrderProducts = await tx.orderProduct.findMany({
      where: {
        orderId: order.id,
      },
      include: {
        product: true,
      },
    });
    await generateInvoicePDF(invoiceOrder, invoiceOrderProducts);
    await sendInvoiceMail(invoiceOrder);
    return res.send(order);
  });
};

export const listOrders = async (req: Request, res: Response) => {
  const orders = await prisma.order.findMany({
    where: {
      userId: req.user.id,
    },
  });
  res.send(orders);
};

export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const order = await prisma.order.update({
      where: {
        id,
        userId: req.user.id,
      },
      data: {
        status: "CANCELLED",
        orderEvents: {
          create: {
            status: "CANCELLED",
          },
        },
      },
    });

    res.send(order);
  } catch (err) {
    throw new NotFoundExeption("Order not found", ErrorCode.ORDER_NOT_FOUND);
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const orders = await prisma.order.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        orderProducts: true,
        orderEvents: true,
      },
    });
    res.send(orders);
  } catch (err) {
    throw new NotFoundExeption("Order not found", ErrorCode.ORDER_NOT_FOUND);
  }
};

export const listAllOrders = async (req: Request, res: Response) => {
  let whereClause = {};
  const status = req.query.status;
  if (status) {
    console.log("update");
    whereClause = { status };
  }
  const ordersCount = await prisma.order.count({
    where: whereClause,
  });
  const orders = await prisma.order.findMany({
    where: whereClause,
    skip: +req.query.skip! || 0,
    take: 5,
  });
  res.send({ ordersCount, orders });
};

export const changeOrderStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    return await prisma.$transaction(async (tx) => {
      const order = await tx.order.update({
        where: { id },
        data: {
          status: req.body.status,
        },
      });
      await tx.orderEvent.create({
        data: {
          orderId: order.id,
          status: req.body.status,
        },
      });
      res.send(order);
    });
  } catch (err) {
    throw new NotFoundExeption("Order not found", ErrorCode.ORDER_NOT_FOUND);
  }
};

export const listUserOrders = async (req: Request, res: Response) => {
  console.log(req.params.id);
  let whereClause: any = {
    userId: req.params.id! as string,
  };
  const status = req.query.status;
  if (status) {
    whereClause = {
      ...whereClause,
      status,
    };
  }
  const ordersCount = await prisma.order.count({
    where: whereClause,
  });
  const orders = await prisma.order.findMany({
    where: whereClause,
    skip: +req.query.skip! || 0,
    take: 5,
  });
  res.send({ ordersCount, orders });
};
