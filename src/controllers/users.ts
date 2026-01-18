import { Request, Response } from "express";
import { AddressSchema } from "../schemas/users";
import { createAddress, deleteAddressRepo, getUserAddresses } from "../repositories/addressRepo";

export const addAddress = async (req: Request,res:Response) => {
    req.body.userId = req.user.id;
    AddressSchema.parse(req.body);
    const address = await createAddress(req.body);
    res.send(address);
}
export const deleteAddress = async (req: Request,res:Response) => {
    const addressId = req.params.id as string;
    await deleteAddressRepo(addressId); 
    res.send(`Deleted`);
}
export const listAddress = async (req: Request,res:Response) => {
    const userAddresses = await getUserAddresses(req.user.id);
    res.send(userAddresses);
}