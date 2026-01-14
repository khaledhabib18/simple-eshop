import { Request, Response } from "express";
import { hashSync, compareSync } from "bcrypt";
import { findUserByEmail, createUser } from "../models/userModel";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";

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

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    let user = await findUserByEmail(email);
    if (!user) {
        res.status(401).send({
            error: "unauthorized",
            message: "Invalid email or password",
        });
        throw Error("Invalid email or password");
    } else {
        if (!compareSync(password, user.password)) {
            res.status(401).send({
                error: "unauthorized",
                message: "Invalid email or password",
            });
            throw Error("Invalid email or password");
        } else {
            const token = jwt.sign(
                {
                    userId: user.id,
                },
                JWT_SECRET
            );
            res.status(200).send({ user, token });
        }
    }
};
