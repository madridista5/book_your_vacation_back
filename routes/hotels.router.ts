import {Router} from "express";
import {
    countByCity,
    createHotel,
    deleteHotel,
    getAllHotels,
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
    .get('/:id', getOneHotel)
    .get('/', getAllHotels)
    // .get('/countByType',);