import { Router } from "express";
import { erroHandler } from "../error-handler";
import {
  addProduct,
  deleteProduct,
  getProductById,
  listProducts,
  searchProdcut,
  updateProduct,
} from "../controllers/products";
import { authMiddleware } from "../middlewares/auth";
import { adminMiddleware } from "../middlewares/admin";
import { error } from "node:console";
import { upload } from "../utils/multer";
import { uploadBodyParser } from "../middlewares/uploadBodyParser";

const productRoutes: Router = Router();

productRoutes.get("/search", authMiddleware, erroHandler(searchProdcut));
productRoutes.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.array("file", 5),
  uploadBodyParser,
  erroHandler(addProduct),
);
productRoutes.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.array("file", 5),
  uploadBodyParser,
  erroHandler(updateProduct),
);
productRoutes.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  erroHandler(deleteProduct),
);
productRoutes.get(
  "/",
  authMiddleware,
  adminMiddleware,
  erroHandler(listProducts),
);
productRoutes.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  erroHandler(getProductById),
);
export default productRoutes;
