import {Router} from "express";
import {deleteUser, getAllUsers, getOneUser, updateUser} from "../controllers/user.controller";
import {verifyAdmin, verifyUser} from "../utils/verifyToken";

export const usersRouter = Router();

usersRouter
    .put('/:id', verifyUser, updateUser)
    .delete('/:id', verifyUser, deleteUser)
    .get('/:id', verifyUser, getOneUser)
    .get('/', verifyAdmin, getAllUsers);