
const express = require("express");
const router = express.Router();
const { Users } = require("../models");




router.get("/", async(req, res)=> {
    const allUsers = await Users.findAll()
    res.json(allUsers)
});

router.post("/adduser", async (req,res) => {
    const user = req.body;  //receive data
    await Users.create(user); //insert into the database
    res.json(user);  //return the same data to be sure

});


module.exports = router;