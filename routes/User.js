
const express = require("express");
const router = express.Router();
const { Users } = require("../models");




// router.get("/", async(req, res)=> {
//     const allUsers = await Users.findAll()
//     res.json(allUsers)
// });

// router.post("/adduser", async (req,res) => {
//     const user = req.body;  //receive data
//     await Users.create(user); //insert into the database
//     res.json(user);  //return the same data to be sure

// });

// User routes
router.get("/", async(req,res) => {
    return Users
           .findAll()
           .then((user) => res.status(200).send(user))
           .catch((error) => res.status(400).send(error))
}) 


router.get("/specific/:id", (req, res) =>{
    return Users
      .findByPk(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },)

router.post("/addUser", async(req, res) => {
    return Users
      .create({ 
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        gender : req.body.gender,
        email : req.body.email,
        DoB : req.body.DoB
      })
      .then((user) => res.status(201).send(user))
      .catch((error) => res.status(400).send(error));
  },
) 


router.delete("/delete/:id", async(req,res) => {
    return Users
           .findByPk(req.params.id)
           .then(user =>{
               if(!user){
                   return res.status(400).send({
                       message : "User not found in the database"
                   });
               }
               return user.destroy()
                          .then(() => res.status(204).send())
                          .catch((error) => res.status(400).send(error))
           })
           .catch((error) => res.status(400).send(error))

});

router.put("/update/:id", async(req,res) => {
    return Users
           .findByPk(req.params.id)
           .then(user => {
               if(!user){
                   return res.status(404).send({
                       message : "User not found in the database"
                   })
               }
               return user
                      .update({
                        firstName : req.body.firstName,
                        lastName : req.body.lastName,
                        gender : req.body.gender,
                        email : req.body.email,
                        DoB : req.body.DoB
                      })
                      .then(() => res.status(200).send(user))
                      .catch((error) => res.status(400).send(error))
           })
           .catch((error) => res.status(400).send(error))
})



module.exports = router;