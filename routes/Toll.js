const express = require("express");
const router = express.Router();
const { TollDetails } = require("../models");


router.get("/", (req, res)=> {
    res.json("these are the tolls");
});

router.post("/", async (req,res) => {
    const toll = req.body;  //receive data
    await TollDetails.create(toll); //insert into the database
   res.json(toll);  //return the same data to be sure

});

module.exports = router;

