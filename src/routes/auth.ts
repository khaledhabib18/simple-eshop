import express, { Router } from "express";
import { signup } from "../controllers/auth";

const authRouter: Router = express.Router();

authRouter.post("/signup", signup);
export default authRouter;
