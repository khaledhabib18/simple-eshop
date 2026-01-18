import express from "express";
import authRouter from "./auth";
import productRoutes from "./products";
import path from "path";
import usersRouter from "./users";
import cartRouter from "./cart";

const rootRouter = express.Router();

rootRouter.use("/",usersRouter)
rootRouter.use("/auth", authRouter);
rootRouter.use("/products", productRoutes);
rootRouter.use("/cart", cartRouter)
rootRouter.use(
    "/uploads",
    express.static(path.join(process.cwd(), "public", "uploads"))
);
export default rootRouter;
