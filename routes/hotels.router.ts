import {Router} from "express";
import {createHotel, deleteHotel, getAllHotels, getOneHotel, updateHotel} from "../controllers/hotel.controller";

export const hotelsRouter = Router();

hotelsRouter
    .post('/', createHotel)
    .put('/:id', updateHotel)
    .delete('/:id', deleteHotel)
    .get('/:id', getOneHotel)
    .get('/', getAllHotels);