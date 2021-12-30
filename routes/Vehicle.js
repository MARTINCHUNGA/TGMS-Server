
const express = require("express");
const router = express.Router();
const { Vehicles } = require("../models");


router.get("/", async(req, res)=> {
    const allVehicles = await Vehicles.findAll();
    res.json(allVehicles);
});

router.post("/", async(req,res) => {
    const vehicle = req.body;  //receive data
    await Vehicles.create(vehicle); //insert into the database
    res.json(vehicle);  //return the same data to be sure
});

module.exports = router