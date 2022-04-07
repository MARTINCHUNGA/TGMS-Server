
const express = require("express");
const router = express.Router();
const { Vehicles } = require("../models");

//vehicle routes
//getting all vehicles
router.get("/allvehicle", async(req,res) => {
    return Vehicles
           .findAll()
           .then((vehicle) => res.status(200).send(vehicle))
           .catch((error) => res.status(400).send(error))
}) 

//getting a specific vehicle
router.get("/specific/:id", (req, res) =>{
    return Vehicles
      .findByPk(req.params.id)
      .then((vehicle) => {
        if (!vehicle) {
          //send this message if vehicle not found
          return res.status(404).send({
            message: 'Vehicle Not Found',
          });
        }
        //return the vehicle here
        return res.status(200).send(vehicle);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },)

//creating a vehicle
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

//delete specific vehicle by id
router.delete("/delete/:id", async(req,res) => {
    return Vehicles
           .findByPk(req.params.id)
           .then(vehicle =>{
               if(!vehicle){
                 //if vehicle not found send this message
                   return res.status(400).send({
                       message : "Vehicle not found in the database"
                   });
               }
               //vehicle found and perform delete operation
               return vehicle.destroy()
                          .then(() => res.status(204).send())
                          .catch((error) => res.status(400).send(error))
           })
           .catch((error) => res.status(400).send(error))

});

//update vehicle by id
router.put("/update/:id", async(req,res) => {
    return Vehicles
           .findByPk(req.params.id)
           .then(vehicle => {
               if(!vehicle){
                 //if vehicle not found send this message
                   return res.status(404).send({
                       message : "vehicle not found in the database"
                   })
               }
               return vehicle
               //vehicle is found and then perform update operation
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