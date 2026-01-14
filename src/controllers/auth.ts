import { Request, Response } from "express";
import { hashSync, compareSync } from "bcrypt";
import { findUserByEmail, createUser } from "../repositories/userRepo";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestsExeption } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";
import { SignupSchema } from "../schemas/users";

export const signup = async (req: Request, res: Response) => {
    try {
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
    } catch (err: any) {
        throw new UnprocessableEntity(
            err?.issues,
            "Unprocessable Entity",
            ErrorCode.UNPROCESSABLE_ENTITY
        );
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    let user = await findUserByEmail(email);
    if (!user) {
        throw new BadRequestsExeption(
            "User does not exits",
            ErrorCode.USER_NOT_FOUND
        );
    } else {
        if (!compareSync(password, user.password)) {
            throw new BadRequestsExeption(
                "Password is not correct",
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
