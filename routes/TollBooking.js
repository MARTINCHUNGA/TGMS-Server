const express = require("express");
const { authPage } = require("../middleware/middleware");
const router = express.Router();
const { TollBookings } = require("../models");


//TollBooking routes
router.get("/", async(req,res) => {
    return TollBookings
           .findAll()
           .then((bookings) => res.status(200).send(bookings))
           .catch((error) => res.status(400).send(error))
}) 


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

router.post("/addBooking", async(req, res) => {
    return TollBookings
      .create(
      { 
        district: req.body.district,
        tollName: req.body.tollName,
        section: req.body.section,
        vehicleType: req.body.vehicleType,
        regNumber: req.body.regNumber,
        price: req.body.price,
        
        //tripPlan : req.body.tripPlan,
        TollDetail_id : req.body.TollDetail_id
      })
      .then((bookings) => res.status(201).send(bookings))
      .catch((error) => res.status(400).send(error));
  },
) 


router.delete("/", async(req,res) => {
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

router.put("/update/:id",  async(req,res) => {
    return TollBookings
           .findByPk(req.params.id)
           .then(bookings => {
               if(!bookings){
                   return res.status(404).send({
                       message : "TollBooking not found in the database"
                   })
               }
               return bookings
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

