
const express = require("express");
const router = express.Router();
const { Vehicles } = require("../models");

//vehicle routes

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

router.post("/addVehicle", async(req, res) => {
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

router.put("/", async(req,res) => {
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