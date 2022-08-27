import {Router} from "express";
import {deleteUser, getAllUsers, getOneUser, updateUser} from "../controllers/user.controller";

export const usersRouter = Router();

usersRouter
    .put('/:id', updateUser)
    .delete('/:id', deleteUser)
    .get('/:id', getOneUser)
    .get('/', getAllUsers);