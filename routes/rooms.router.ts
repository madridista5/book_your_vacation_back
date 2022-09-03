import {Router} from "express";
import {
    createRoom,
    deleteRoom,
    getAllRooms,
    getOneRoom,
    updateRoom,
    updateRoomAvailability
} from "../controllers/room.controller";
import {verifyAdmin} from "../utils/verifyToken";

export const roomsRouter = Router();

roomsRouter
    .post('/:hotelId', verifyAdmin, createRoom)
    .put('/availability/:id', updateRoomAvailability)
    .put('/:id', verifyAdmin, updateRoom)
    .delete('/:id/:hotelId', verifyAdmin, deleteRoom)
    .get('/:id', getOneRoom)
    .get('/', getAllRooms);