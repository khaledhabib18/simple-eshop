import express from 'express'
import { authMiddleware } from '../middlewares/auth';
import { erroHandler } from '../error-handler';
import { addAddress, deleteAddress, listAddress } from '../controllers/users';

const usersRouter = express.Router();

usersRouter.post('/address', authMiddleware,erroHandler(addAddress))
usersRouter.get('/address',authMiddleware,erroHandler(listAddress))
usersRouter.delete('/address/:id',authMiddleware,erroHandler(deleteAddress));

export default usersRouter;