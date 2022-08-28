import {Router} from "express";
import {createRoom, deleteRoom, getAllRooms, getOneRoom, updateRoom} from "../controllers/room.controller";
import {verifyAdmin} from "../utils/verifyToken";

export const roomsRouter = Router();

roomsRouter
    .post('/:hotelId', verifyAdmin, createRoom)
    .put('/:id', verifyAdmin, updateRoom)
    .delete('/:id/:hotelId', verifyAdmin, deleteRoom)
    .get('/:id', getOneRoom)
    .get('/', getAllRooms);