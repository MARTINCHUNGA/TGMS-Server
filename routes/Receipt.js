

const express = require("express");
const router = express.Router();
const { Receipt } = require("../models");


router.get("/", async(req, res)=> {
    const allReceipts = await Receipt.findAll();
    res.json(allReceipts);
});

router.post("/", async(req,res) => {
    const receipt = req.body;  //receive data
    await Receipt.create(receipt); //insert into the database
    res.json(receipt);  //return the same data to be sure
});

module.exports = router