import express from "express";
import authRouter from "./auth";
import productRoutes from "./products";
import path from "path";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/products", productRoutes);
rootRouter.use(
    "/uploads",
    express.static(path.join(process.cwd(), "public", "uploads"))
);
export default rootRouter;
