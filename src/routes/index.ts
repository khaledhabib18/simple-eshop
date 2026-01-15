import { Router } from "express";
import authRouter from "./auth";
import productRoutes from "./products";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/products", productRoutes);

export default rootRouter;
