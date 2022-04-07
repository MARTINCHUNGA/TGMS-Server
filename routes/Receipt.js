

const express = require("express");
const router = express.Router();
const { Receipt } = require("../models");


//Receipts routes
//get all receipts
router.get("/", async(req,res) => {
    return Receipt
           .findAll()
           .then((receipts) => res.status(200).send(receipts))
           .catch((error) => res.status(400).send(error))
})

//get a specific receipt by id
router.get("/specific/:id", (req, res) =>{
    return Receipt
      .findByPk(req.params.id)
      .then((receipt) => {
        if (!receipt) {
          return res.status(404).send({
            message: 'Receipt Not Found',
          });
        }
        return res.status(200).send(fair);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },)

  //create a new receipt
  router.post("/addReceipt", async(req, res) => {
    return Receipt
      .create({ 
        tollName : req.body.tollName,
        District : req.body.District,
        vehicleType : req.body.vehicleType,
        price : req.body.price
      })
      .then((fair) => res.status(201).send(fair))
      .catch((error) => res.status(400).send(error));
  },
) 

//delete receipt by id
router.delete("/delete/:id", async(req,res) => {
    return Receipt
           .findByPk(req.params.id)
           .then(receipt =>{
               if(!receipt){
                   return res.status(400).send({
                       message : "Receipt not found in the database"
                   });
               }
               return receipt.destroy()
                          .then(() => res.status(204).send())
                          .catch((error) => res.status(400).send(error))
           })
           .catch((error) => res.status(400).send(error))

});
//update receipt by id
router.put("/update/:id", async(req,res) => {
    return Receipt
           .findByPk(req.params.id)
           .then(receipt => {
               if(!receipt){
                 //send this message if receipt not found
                   return res.status(404).send({
                       message : "Receipt not found in the database"
                   })
               }
               //return receipt
               return receipt
                      .update({
                        tollName : req.body.tollName,
                        District : req.body.District,
                        vehicleType : req.body.vehicleType,
                        price : req.body.price
                      })
                      .then(() => res.status(200).send(receipt))
                      .catch((error) => res.status(400).send(error))
           })
           .catch((error) => res.status(400).send(error))
})


module.exports = router