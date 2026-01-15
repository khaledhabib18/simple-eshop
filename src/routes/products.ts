import { Router } from "express";
import { erroHandler } from "../error-handler";
import {
    addProduct,
    deleteProduct,
    getProductById,
    listProducts,
    updateProduct,
} from "../controllers/products";
import { authMiddleware } from "../middlewares/auth";
import { adminMiddleware } from "../middlewares/admin";
import { error } from "node:console";

const productRoutes: Router = Router();

productRoutes.post(
    "/",
    authMiddleware,
    adminMiddleware,
    erroHandler(addProduct)
);
productRoutes.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    erroHandler(updateProduct)
);
productRoutes.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    erroHandler(deleteProduct)
);
productRoutes.get(
    "/",
    authMiddleware,
    adminMiddleware,
    erroHandler(listProducts)
);
productRoutes.get(
    "/:id",
    authMiddleware,
    adminMiddleware,
    erroHandler(getProductById)
);
export default productRoutes;
