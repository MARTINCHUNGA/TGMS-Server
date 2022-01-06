const express = require("express");
const router = express.Router();
const { TollBooking } = require("../models");


router.get("/", async(req, res)=> {
    const listOfTollBooking = await TollBooking.findAll();
    res.json(listOfTollBooking);
});

router.post("/", async (req,res) => {
    const tollBooking = req.body;  //receive data
    await TollBooking.create(toll); //insert into the database
    res.json(tollBookin);  //return the same data to be sure

});

module.exports = router;

