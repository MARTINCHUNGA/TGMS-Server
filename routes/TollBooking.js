const express = require("express");
const router = express.Router();
const { TollBookings } = require("../models");


// router.get("/", async(req, res)=> {
//     const listOfBookings = await TollBookings.findAll();
//     res.json(listOfBookings);
// });


// router.get("/:tollDetailId", async(req, res)=> {
//     const tollDetailId = req.params.tollDetailId;
//     const bookings = await TollBookings.findAll({where: {TollDetailId: tollDetailId} });
//     res.json(bookings);

// });

// router.post("/", async (req,res) => {
//     const tollBooking = req.body;  //receive data
//     await TollBookings.create(tollBooking); //insert into the database
//     res.json(tollBooking);  //return the same data to be sure

// });

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
      .create({ 
        district : req.body.district,
        tollName : req.body.tollName,
        vehicleType : req.body.section,
        price : req.body.price,
        tripPlan : req.body.tripPlan
      })
      .then((bookings) => res.status(201).send(bookings))
      .catch((error) => res.status(400).send(error));
  },
) 


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

router.put("/update/:id", async(req,res) => {
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
                        tollName : req.body.tollName,
                        vehicleType : req.body.section,
                        price : req.body.price,
                        tripPlan : req.body.tripPlan
                      })
                      .then(() => res.status(200).send(bookings))
                      .catch((error) => res.status(400).send(error))
           })
           .catch((error) => res.status(400).send(error))
})

module.exports = router;

