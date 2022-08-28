import {NextFunction, Request, Response} from "express";
import Room from "../models/Room";
import Hotel from "../models/Hotel";

export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: {rooms: savedRoom._id},
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedRoom);
    } catch (err) {
        next(err);
    }
}

export const updateRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true},
        );
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
    }
}

export const deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
    const hotelId = req.params.hotelId;
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: {rooms: req.params.id},
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json('Pokój został usunięty.');
    } catch (err) {
        next(err);
    }
}

export const getOneRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const room = await Room.findById(
            req.params.id,
        );
        res.status(200).json(room);
    } catch (err) {
        next(err);
    }
}

export const getAllRooms = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
}