import { Request, Response } from "express";
import {
  AddressSchema,
  ChangeRoleSchema,
  UpdateUserSchema,
} from "../schemas/users";
import {
  createAddress,
  deleteAddressRepo,
  getUserAddresses,
} from "../repositories/addressRepo";
import { Address } from "../generated/prisma/client";
import { prisma } from "../repositories/prisma";
import { NotFoundExeption } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { BadRequestsExeption } from "../exceptions/bad-requests";

export const addAddress = async (req: Request, res: Response) => {
  req.body.userId = req.user.id;
  AddressSchema.parse(req.body);
  const address = await createAddress(req.body);
  res.send(address);
};
export const deleteAddress = async (req: Request, res: Response) => {
  const addressId = req.params.id as string;
  await deleteAddressRepo(addressId);
  res.send(`Deleted`);
};
export const listAddress = async (req: Request, res: Response) => {
  const userAddresses = await getUserAddresses(req.user.id);
  res.send(userAddresses);
};

export const updateUser = async (req: Request, res: Response) => {
  const validatedData = UpdateUserSchema.parse(req.body);
  let shippingAddress: Address;
  let billingAddress: Address;
  if (validatedData.defaultBillingAddressId) {
    try {
      billingAddress = await prisma.address.findFirstOrThrow({
        where: {
          id: validatedData.defaultBillingAddressId,
        },
      });
    } catch (err) {
      throw new NotFoundExeption(
        "Address not found",
        ErrorCode.ADDRESS_NOT_FOUND,
      );
    }
    if (billingAddress.userId != req.user.id) {
      throw new BadRequestsExeption(
        "Adress does not belong to user",
        ErrorCode.ADDRESS_DOES_NOT_BELONG,
      );
    }
  }
  if (validatedData.defaultShippingAddressId) {
    try {
      shippingAddress = await prisma.address.findFirstOrThrow({
        where: {
          id: validatedData.defaultShippingAddressId,
        },
      });
    } catch (err) {
      throw new NotFoundExeption(
        "Address not found",
        ErrorCode.ADDRESS_NOT_FOUND,
      );
    }
    if (shippingAddress.userId != req.user.id) {
      throw new BadRequestsExeption(
        "Adress does not belong to user",
        ErrorCode.ADDRESS_DOES_NOT_BELONG,
      );
    }
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: req.body,
  });

  res.send(updatedUser);
};

export const listUsers = async (req: Request, res: Response) => {
  const count = await prisma.user.count();
  const users = await prisma.user.findMany({
    skip: +req.query.skip! || 0,
    take: 5,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
  res.send({ count, users });
};
export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const user = await prisma.user.findFirstOrThrow({
      where: { id },
      include: {
        addresses: true,
      },
    });
    res.send(user);
  } catch (err) {
    throw new NotFoundExeption("User not found", ErrorCode.USER_NOT_FOUND);
  }
};
export const ChangeUserRole = async (req: Request, res: Response) => {
  ChangeRoleSchema.parse(req.body);
  try {
    const id = req.params.id as string;
    const user = await prisma.user.update({
      where: { id },
      data: {
        role: req.body.role,
      },
    });
    res.send(user);
  } catch (err) {
    throw new NotFoundExeption("User not found", ErrorCode.USER_NOT_FOUND);
  }
};
