import {Router} from "express";
import Hotel from "../models/Hotel";

export const hotelsRouter = Router();

hotelsRouter
    .post('/', async (req, res) => {
        const newHotel = new Hotel(req.body);
        try {
            const savedHotel = await newHotel.save();
            res.status(200).json(savedHotel);
        } catch (err) {
            res.status(500).json(err);
        }
    })
    .put('/:id', async (req, res) => {
        try {
            const updatedHotel = await Hotel.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new: true},
            );
            res.status(200).json(updatedHotel);
        } catch (err) {
            res.status(500).json(err);
        }
    })
    .delete('/:id', async (req, res) => {
        try {
            await Hotel.findByIdAndDelete(
                req.params.id,
            );
            res.status(200).json('Hotel został usunięty.');
        } catch (err) {
            res.status(500).json(err);
        }
    })
    .get('/:id', async (req, res) => {
        try {
            const hotel = await Hotel.findById(
                req.params.id,
            );
            res.status(200).json(hotel);
        } catch (err) {
            res.status(500).json(err);
        }
    })
    .get('/', async (req, res, next) => {
        try {
            const hotels = await Hotel.find();
            res.status(200).json(hotels);
        } catch (err) {
            next(err);
        }
    });