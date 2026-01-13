import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
    res.status(200).send("login works");
};
