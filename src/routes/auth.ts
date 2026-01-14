import express, { Router } from "express";
import { signup, login } from "../controllers/auth";
import { erroHandler } from "../error-handler";

const authRouter: Router = express.Router();

authRouter.post("/signup", erroHandler(signup));
authRouter.post("/login", erroHandler(login));
export default authRouter;
