import express, { Router } from "express";
import { signup, login, me } from "../controllers/auth";
import { erroHandler } from "../error-handler";
import { authMiddleware } from "../middlewares/auth";

const authRouter: Router = express.Router();

authRouter.post("/signup", erroHandler(signup));
authRouter.post("/login", erroHandler(login));
authRouter.get("/me", authMiddleware, erroHandler(me));
export default authRouter;
