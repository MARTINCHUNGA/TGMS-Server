
const express = require("express");
const router = express.Router();
const { Fairs } = require("../models");
const { route } = require("./User");


// Fair routes
//get all fairs
router.get("/", async(req,res) => {
    return Fairs
           .findAll()
           .then((fairs) => res.status(200).send(fairs))
           .catch((error) => res.status(400).send(error))
}) 

//get a specific fair by id
router.get("/specific/:id", (req, res) =>{
    return Fairs
      .findByPk(req.params.id)
      .then((fair) => {
        if (!fair) {
          return res.status(404).send({
            message: 'Fair Not Found',
          });
        }
        return res.status(200).send(fair);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },)
//create a new fair
router.post("/addfair", async(req, res) => {
    return Fairs
      .create({ 
        dailyPass : req.body.dailyPass,
        monthly : req.body.monthly,
        singleJourney : req.body.singleJourney,
        return : req.body.return
      })
      .then((fair) => res.status(201).send(fair))
      .catch((error) => res.status(400).send(error));
  },
) 

//delete fair by id
router.delete("/delete/:id", async(req,res) => {
    return Fairs
           .findByPk(req.params.id)
           .then(fair =>{
               if(!fair){
                   return res.status(400).send({
                       message : "Fair not found in the database"
                   });
               }
               return fair.destroy()
                          .then(() => res.status(204).send())
                          .catch((error) => res.status(400).send(error))
           })
           .catch((error) => res.status(400).send(error))

});

//update fair by id
router.put("/update/:id", async(req,res) => {
    return Fairs
           .findByPk(req.params.id)
           .then(fair => {
               if(!fair){
                   return res.status(404).send({
                       message : "Fair not found in the database"
                   })
               }
               return fair
                      .update({
                          dailyPass : req.body.dailyPass,
                          monthly : req.body.monthly,
                          singleJourney : req.body.singleJourney,
                          return : req.body.return
                      })
                      .then(() => res.status(200).send(fair))
                      .catch((error) => res.status(400).send(error))
           })
           .catch((error) => res.status(400).send(error))
})





module.exports = router;