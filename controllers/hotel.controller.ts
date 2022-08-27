import {NextFunction, Request, Response} from "express";
import Hotel from "../models/Hotel";

export const createHotel = async (req: Request, res: Response, next: NextFunction) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (err) {
        next(err);
    }
};

export const updateHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true},
        );
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err);
    }
}

export const deleteHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Hotel.findByIdAndDelete(
            req.params.id,
        );
        res.status(200).json('Hotel został usunięty.');
    } catch (err) {
        next(err);
    }
}

export const getOneHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hotel = await Hotel.findById(
            req.params.id,
        );
        res.status(200).json(hotel);
    } catch (err) {
        next(err);
    }
}

export const getAllHotels = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
}