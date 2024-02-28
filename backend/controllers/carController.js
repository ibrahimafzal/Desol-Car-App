const Car = require('../model/Car');
const expressAsyncHandler = require('express-async-handler');

// CREATE CAR
const createCar = expressAsyncHandler(async (req, res) => {
    try {
        const {
            carModel,
            price,
            phoneNumber,
            city,
            maxPictures,
            images,
        } = req.body;

        console.log("images: " , images)

        const newCar = await Car.create({
            carModel,
            price,
            phoneNumber,
            city,
            maxPictures,
            images,
        });
        res.status(201).json({ message: 'Car created successfully!', newCar });

    } catch (error) {
        console.error('Error creating car:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//  GET ALL CARS
const getCars = async (req, res) => {
    try {
        const getCars = await Car.find()
        res.status(201).json({ message: 'Cars fetched successfully!', getCars })
    } catch (error) {
        console.error('Error getting list of cars:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    createCar,
    getCars,
};
