import { Router } from "express";
import { erroHandler } from "../error-handler";
import { addProduct } from "../controllers/products";
import { authMiddleware } from "../middlewares/auth";
import { adminMiddleware } from "../middlewares/admin";

const productRoutes: Router = Router();

productRoutes.post(
    "/",
    authMiddleware,
    adminMiddleware,
    erroHandler(addProduct)
);
export default productRoutes;
