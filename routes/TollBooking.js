const express = require("express");
const router = express.Router();
const { TollBookings } = require("../models");


router.get("/", async(req, res)=> {
    const listOfBookings = await TollBookings.findAll();
    res.json(listOfBookings);
});


router.get("/:tollDetailId", async(req, res)=> {
    const tollDetailId = req.params.tollDetailId;
    const bookings = await TollBookings.findAll({where: {TollDetailId: tollDetailId} });
    res.json(bookings);

});

router.post("/", async (req,res) => {
    const tollBooking = req.body;  //receive data
    await TollBookings.create(tollBooking); //insert into the database
    res.json(tollBooking);  //return the same data to be sure

});

module.exports = router;

