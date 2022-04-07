const express = require("express");
const router = express.Router();
const { TollDetails } = require("../models");


// Toll routes
//get all tolls
router.get("/", async(req,res) => {
    return TollDetails
           .findAll()
           .then((tolls) => res.status(200).send(tolls))
           .catch((error) => res.status(400).send(error))
}) 

//get specific toll by id
router.get("/specific/:id", (req, res) =>{
    return TollDetails
      .findByPk(req.params.id)
      .then((tolls) => {
        if (!tolls) {
          //if toll not found send this message
          return res.status(404).send({
            message: 'Toll Not Found',
          });
        }
        //toll found and return it
        return res.status(200).send(tolls);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },)

//create a new toll
router.post("/addToll", async(req, res) => {
    return TollDetails
      .create({ 
        district : req.body.district,
        tollName : req.body.tollName,
        section : req.body.section
      })
      .then((toll) => res.status(201).send(toll))
      .catch((error) => res.status(400).send(error));
  },
) 

//delete toll by id
router.delete("/delete/:id", async(req,res) => {
    return TollDetails
           .findByPk(req.params.id)
           .then(toll =>{
               if(!toll){
                 //toll not found send this message
                   return res.status(400).send({
                       message : "Toll not found in the database"
                   });
               }
               //toll found and perform delete operation
               return toll.destroy()
                          .then(() => res.status(204).send())
                          .catch((error) => res.status(400).send(error))
           })
           .catch((error) => res.status(400).send(error))

});

// update specific toll by id
router.put("/update/:id", async(req,res) => {
    return TollDetails
           .findByPk(req.params.id)
           .then(toll => {
               if(!toll){
                 //toll not found send this message
                   return res.status(404).send({
                       message : "Toll not found in the database"
                   })
               }
               //toll found and perform update action
               return toll
                      .update({
                        district : req.body.district,
                        tollName : req.body.tollName,
                        section : req.body.section
                      })
                      .then(() => res.status(200).send(toll))
                      .catch((error) => res.status(400).send(error))
           })
           .catch((error) => res.status(400).send(error))
})

module.exports = router;

