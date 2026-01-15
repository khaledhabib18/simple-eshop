import { NextFunction, Request, Response } from "express";
import { hashSync, compareSync } from "bcrypt";
import { findUserByEmail, createUser } from "../repositories/userRepo";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestsExeption } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";
import { LoginSchema, SignupSchema } from "../schemas/users";
import { NotFoundExeption } from "../exceptions/not-found";

export const signup = async (req: Request, res: Response) => {
    SignupSchema.parse(req.body);
    let { email, password, name } = req.body;
    let user = await findUserByEmail(email);
    if (user) {
        throw new BadRequestsExeption(
            "user already exists",
            ErrorCode.USER_ALREADY_EXISTS
        );
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
    LoginSchema.parse(req.body);
    const { email, password } = req.body;
    let user = await findUserByEmail(email);
    if (!user) {
        throw new NotFoundExeption(
            "User does not exits",
            ErrorCode.USER_NOT_FOUND
        );
    } else {
        if (!compareSync(password, user.password)) {
            throw new BadRequestsExeption(
                "Incorrect password",
                ErrorCode.INCORRECT_PASSWORD
            );
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

export const me = async (req: Request, res: Response, next: NextFunction) => {
    res.json(req.user);
};
