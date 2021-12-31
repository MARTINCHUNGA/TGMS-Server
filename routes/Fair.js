

const express = require("express");
const router = express.Router();
const { Fairs } = require("../models");




router.get("/", async(req, res)=> {
    const allFairs = await Fairs.findAll()
    res.json(allFairs)
});

router.post("/", async (req,res) => {
    const fair = req.body;  //receive data
    await Fairs.create(fair); //insert into the database
    res.json(fair);  //return the same data to be sure

});


module.exports = router;