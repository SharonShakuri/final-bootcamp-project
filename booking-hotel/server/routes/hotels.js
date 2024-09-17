const express = require("express");
const hotelRouter = express.Router();
const { hotelController } = require("../controllers/hotels");

hotelRouter.get("/", hotelController.getAllHotels);

hotelRouter.get("/:hotelId", hotelController.getHotelDetails);

module.exports = hotelRouter;
