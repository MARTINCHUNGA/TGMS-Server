

const express = require("express");
const router = express.Router();
const { Receipt } = require("../models");


//Receipts routes
router.get("/", async(req,res) => {
    return Receipt
           .findAll()
           .then((receipts) => res.status(200).send(receipts))
           .catch((error) => res.status(400).send(error))
})

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

router.put("/update/:id", async(req,res) => {
    return Receipt
           .findByPk(req.params.id)
           .then(receipt => {
               if(!receipt){
                   return res.status(404).send({
                       message : "Receipt not found in the database"
                   })
               }
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