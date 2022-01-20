
const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken')

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
  const {
    firstName,
    lastName,
    email,
    gender,
    DoB,
    username,
    password

  } = req.body
  bcrypt.hash(password, 10).then((hash) => {
     return Users.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      gender : gender,
      DoB: DoB,
      username: username,
      password : hash
    })
    .then((user) => res.status(201).send(user))
    .catch((error) => res.status(400).send(error));
  })
    // return Users
    //   .create({ 
    //     firstName : req.body.firstName,
    //     lastName : req.body.lastName,
    //     gender : req.body.gender,
    //     email : req.body.email,
    //     DoB : req.body.DoB
    //   })
    //   .then((user) => res.status(201).send(user))
    //   .catch((error) => res.status(400).send(error));
  },
) 

router.post("/login", async(req,res) =>{
  const { username, password } = req.body
  const user = await Users.findOne({ where: { username: username}}) 
  //res.send(user.password)

  //check if the user exist
  if(!user) res.json({error: "User does not exist"});

  bcrypt.compare(password, user.password).then((match) => {

    if(!match) res.json({error : "Password and username does not match"});


    const accessToken = sign(
      { username : user.username, id : user.id},
       "importantsecret"
       ); 

    
    res.json(accessToken);
  })

  
})

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