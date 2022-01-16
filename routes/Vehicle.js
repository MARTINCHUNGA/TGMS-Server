
const express = require("express");
const router = express.Router();
const { Vehicles } = require("../models");


// router.get("/", async(req, res)=> {
//     const allVehicles = await Vehicles.findAll();
//     res.json(allVehicles);
// });

// router.post("/", async(req,res) => {
//     const vehicle = req.body;  //receive data
//     await Vehicles.create(vehicle); //insert into the database
//     res.json(vehicle);  //return the same data to be sure
// });

router.get("/", async(req,res) => {
    return Vehicles
           .findAll()
           .then((vehicle) => res.status(200).send(vehicle))
           .catch((error) => res.status(400).send(error))
}) 


router.get("/specific/:id", (req, res) =>{
    return Vehicles
      .findByPk(req.params.id)
      .then((vehicle) => {
        if (!vehicle) {
          return res.status(404).send({
            message: 'Vehicle Not Found',
          });
        }
        return res.status(200).send(vehicle);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },)

router.post("/addUser", async(req, res) => {
    return Vehicles
      .create({ 
        vehicleType : req.body.vehicleType,
        price : req.body.price,
      })
      .then((vehicle) => res.status(201).send(vehicle))
      .catch((error) => res.status(400).send(error));
  },
) 


router.delete("/delete/:id", async(req,res) => {
    return Vehicles
           .findByPk(req.params.id)
           .then(vehicle =>{
               if(!vehicle){
                   return res.status(400).send({
                       message : "Vehicle not found in the database"
                   });
               }
               return vehicle.destroy()
                          .then(() => res.status(204).send())
                          .catch((error) => res.status(400).send(error))
           })
           .catch((error) => res.status(400).send(error))

});

router.put("/update/:id", async(req,res) => {
    return Vehicles
           .findByPk(req.params.id)
           .then(vehicle => {
               if(!vehicle){
                   return res.status(404).send({
                       message : "vehicle not found in the database"
                   })
               }
               return vehicle
                      .update({
                        vehicleType : req.body.vehicleType,
                        price : req.body.price
                      })
                      .then(() => res.status(200).send(vehicle))
                      .catch((error) => res.status(400).send(error))
           })
           .catch((error) => res.status(400).send(error))
})


module.exports = router