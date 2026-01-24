import { Address} from "../generated/prisma/client";
import { prisma } from "./prisma";

export const createAddress = async(data:Address)=>{
    const address = await prisma.address.create({
        data
    });
    return address;
}

export const deleteAddressRepo = async (id:string) =>{
    await prisma.address.delete({
        where:{
            id
        }
    });
}

export const getUserAddresses = async (userId:string)=>{
    const addresses = prisma.address.findMany({
        where:{
            userId
        }
    })
    return addresses;
}