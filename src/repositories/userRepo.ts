import { prisma } from "./prisma";

const findUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (user) return user;
        return undefined;
    } catch (err) {
        console.log(err);
    }
};

interface userData {
    name: string;
    email: string;
    password: string;
}
const createUser = async (data: userData) => {
    const user = await prisma.user.create({
        data: data,
    });

    return user;
};

export { findUserByEmail, createUser };
