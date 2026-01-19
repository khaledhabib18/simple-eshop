import express from "express";
import { authMiddleware } from "../middlewares/auth";
import { erroHandler } from "../error-handler";
import {
  addAddress,
  ChangeUserRole,
  deleteAddress,
  getUserById,
  listAddress,
  listUsers,
  updateUser,
} from "../controllers/users";
import { adminMiddleware } from "../middlewares/admin";

const usersRouter = express.Router();

usersRouter.post("/address", authMiddleware, erroHandler(addAddress));
usersRouter.get("/address", authMiddleware, erroHandler(listAddress));
usersRouter.delete("/address/:id", authMiddleware, erroHandler(deleteAddress));
usersRouter.put("/", authMiddleware, erroHandler(updateUser));

usersRouter.put(
  "/role/:id",
  authMiddleware,
  adminMiddleware,
  erroHandler(ChangeUserRole),
);
usersRouter.get("/", authMiddleware, adminMiddleware, erroHandler(listUsers));
usersRouter.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  erroHandler(getUserById),
);
export default usersRouter;
