import { Request, Response } from "express";
import { hashSync } from "bcrypt";
import { findUserByEmail, createUser } from "../models/userModel";

export const signup = async (req: Request, res: Response) => {
    let { email, password, name } = req.body;
    let user = await findUserByEmail(email);
    if (user) {
        res.status(409).send({
            error: "Conflict",
            message: "A user with this email already exists.",
        });
        throw Error("User already exists");
    } else {
        password = hashSync(password, 10);
        user = await createUser({
            name,
            password,
            email,
        });
        res.status(200).send(user);
    }
};
