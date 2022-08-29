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

export const countByCity = async (req: Request, res: Response, next: NextFunction) => {
    let cities = req.query.cities;
    if (typeof cities === 'string') {
        cities = cities.split(',');
    }
    try {
        let list;
        if (Array.isArray(cities)) {
            list = await Promise.all(cities.map(city => {
                return Hotel.countDocuments({city: city});
            }));
        }
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
}

export const countByType = async (req: Request, res: Response, next: NextFunction) => {
    const hotelCount = await Hotel.countDocuments({type: 'hotel'});
    const apartmentCount = await Hotel.countDocuments({type: 'apartament'});
    const resortCount = await Hotel.countDocuments({type: 'resort'});
    const villaCount = await Hotel.countDocuments({type: 'rezydencja'});
    const cabinCount = await Hotel.countDocuments({type: 'domek górski'});

    res.status(200).json([
        {type: 'hotel', count: hotelCount},
        {type: 'apartment', count: apartmentCount},
        {type: 'resort', count: resortCount},
        {type: 'villa', count: villaCount},
        {type: 'cabin', count: cabinCount},
    ]);
}