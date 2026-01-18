import express from 'express'
import { addItemToCart, changeQuantity, deleteItemFromCart, getCart } from '../controllers/cart';
import { authMiddleware } from '../middlewares/auth';
import { erroHandler } from '../error-handler';

const cartRouter = express.Router();

cartRouter.post("/", authMiddleware, erroHandler(addItemToCart))
cartRouter.delete("/:id", authMiddleware, erroHandler(deleteItemFromCart))
cartRouter.get("/", authMiddleware, erroHandler(getCart))
cartRouter.put("/:id", authMiddleware, erroHandler(changeQuantity))
export default cartRouter;