const express = require("express");
const { authPage } = require("../middleware/middleware");
const router = express.Router();
const { TollBookings } = require("../models");


//getting all toll bookings
router.get("/", async(req,res) => {
    return TollBookings
           .findAll()
           .then((bookings) => res.status(200).send(bookings))
           .catch((error) => res.status(400).send(error))
}) 

//getting a specific tool booking by id
router.get("/specific/:id", (req, res) =>{
    return TollBookings
      .findByPk(req.params.id)
      .then((bookings) => {
        if (!bookings) {
          return res.status(404).send({
            message: 'TollBookings Not Found',
          });
        }
        return res.status(200).send(bookings);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },)

//creating a new toll booking
router.post("/addBooking", async(req, res) => {
    return TollBookings
      .create(
      { 
        district : req.body.district,
        vehicleType : req.body.vehicleType,
         price : req.body.price,
        //tripPlan : req.body.tripPlan,
        TollDetail_id : req.body.TollDetail_id
      })
      .then((bookings) => res.status(201).send(bookings))
      .catch((error) => res.status(400).send(error));
  },
) 

//deleting a specific tollbooking by id
router.delete("/delete/:id", async(req,res) => {
    return TollBookings
           .findByPk(req.params.id)
           .then(bookings =>{
               if(!bookings){
                   return res.status(400).send({
                       message : "TollBooking not found in the database"
                   });
               }
               return bookings.destroy()
                          .then(() => res.status(204).send())
                          .catch((error) => res.status(400).send(error))
           })
           .catch((error) => res.status(400).send(error))

});

//updating a specific toll booking by id
router.put("/update/:id",  async(req,res) => {
    return TollBookings
           .findByPk(req.params.id)
           .then(bookings => {
               if(!bookings){
                 //if toll booking not found by id then send this message
                   return res.status(404).send({
                       message : "TollBooking not found in the database"
                   })
               }
               return bookings
               //update toll booking if found
                      .update({
                        district : req.body.district,
                        vehicleType : req.body.vehicleType,
                        // tollName : req.body.tollName,
                        //vehicleType : req.body.section,
                        price : req.body.price,
                        TollDetail_id : req.body.TollDetail_id
                      })
                      .then(() => res.status(200).send(bookings))
                      .catch((error) => res.status(400).send(error))
           })
           .catch((error) => res.status(400).send(error))
})

module.exports = router;

