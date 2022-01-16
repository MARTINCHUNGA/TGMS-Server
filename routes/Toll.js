const express = require("express");
const router = express.Router();
const { TollDetails } = require("../models");


// router.get("/", async(req, res)=> {
//     const listOfTolls = await TollDetails.findAll();
//     res.json(listOfTolls);
// });

// router.get("/byId/:id", async(req, res)=> {
//     const id = req.params.id;
//     res.json(listOfTolls);
//     const tolls = await TollDetails.findByPK(id);
//     res.json(tolls);


// });

// router.post("/", async (req,res) => {
//     const toll = req.body;  //receive data
//     await TollDetails.create(toll); //insert into the database
//     res.json(toll);  //return the same data to be sure

// });

// Fair routes
router.get("/", async(req,res) => {
    return TollDetails
           .findAll()
           .then((tolls) => res.status(200).send(tolls))
           .catch((error) => res.status(400).send(error))
}) 


router.get("/specific/:id", (req, res) =>{
    return TollDetails
      .findByPk(req.params.id)
      .then((tolls) => {
        if (!tolls) {
          return res.status(404).send({
            message: 'Toll Not Found',
          });
        }
        return res.status(200).send(tolls);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },)

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


router.delete("/delete/:id", async(req,res) => {
    return TollDetails
           .findByPk(req.params.id)
           .then(toll =>{
               if(!toll){
                   return res.status(400).send({
                       message : "Toll not found in the database"
                   });
               }
               return toll.destroy()
                          .then(() => res.status(204).send())
                          .catch((error) => res.status(400).send(error))
           })
           .catch((error) => res.status(400).send(error))

});

router.put("/update/:id", async(req,res) => {
    return TollDetails
           .findByPk(req.params.id)
           .then(toll => {
               if(!toll){
                   return res.status(404).send({
                       message : "Toll not found in the database"
                   })
               }
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

