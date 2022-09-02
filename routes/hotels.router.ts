import {Router} from "express";
import {
    countByCity,
    countByType,
    createHotel,
    deleteHotel,
    getAllHotels, getHotelRooms,
    getOneHotel,
    updateHotel
} from "../controllers/hotel.controller";
import {verifyAdmin} from "../utils/verifyToken";

export const hotelsRouter = Router();

hotelsRouter
    .post('/', verifyAdmin, createHotel)
    .put('/:id', verifyAdmin, updateHotel)
    .delete('/:id', verifyAdmin, deleteHotel)
    .get('/countByCity', countByCity)
    .get('/countByType', countByType)
    .get('/:id', getOneHotel)
    .get('/', getAllHotels)
    .get('/room/:id', getHotelRooms);