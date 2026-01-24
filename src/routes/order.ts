import express from "express";
import { authMiddleware } from "../middlewares/auth";
import { erroHandler } from "../error-handler";
import {
  cancelOrder,
  changeOrderStatus,
  createOrder,
  getOrderById,
  listAllOrders,
  listOrders,
  listUserOrders,
} from "../controllers/order";
import { adminMiddleware } from "../middlewares/admin";
import { listAddress } from "../controllers/users";
import { error } from "node:console";

const orderRouter = express.Router();

orderRouter.post("/", authMiddleware, erroHandler(createOrder));
orderRouter.get("/", authMiddleware, erroHandler(listOrders));
orderRouter.put("/:id/cancel", authMiddleware, erroHandler(cancelOrder));
orderRouter.get(
  "/index",
  authMiddleware,
  adminMiddleware,
  erroHandler(listAllOrders),
);
orderRouter.get("/:id", authMiddleware, erroHandler(getOrderById));

orderRouter.get(
  "/user/:id",
  authMiddleware,
  adminMiddleware,
  erroHandler(listUserOrders),
);
orderRouter.put(
  "/status/:id",
  authMiddleware,
  adminMiddleware,
  erroHandler(changeOrderStatus),
);
export default orderRouter;
