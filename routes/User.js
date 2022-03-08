
const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken');
const { validateToken,authRole } = require("../middleware/Auth");

// User routes
router.get("/", validateToken, async(req,res) => {
    return Users
           .findAll()
           .then((user) => res.status(200).send(user))
           .catch((error) => res.status(400).send(error))
}) 

router.get("/specific/:id", validateToken, (req, res) =>{
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

router.post("/register", async(req, res) => {
  const {
    username,
    email,
    phone,
    password,
    
  } = req.body
   //Check if the user already exist 
   const userAlreadyExists = await Users.findOne({where: {email}}).catch(
    (err) => {
      console.log("Error", err)
    }
  )
  if (userAlreadyExists) {
      return res.status(409).json({message: "User with email already exists!" })
  } else {

    //create user with hashed password
    bcrypt.hash(password, 10).then((hash) => {
      const newUser = new Users({
        username: username,
        email: email,
        phone: phone,
        password : hash,
        confirmPassword : hash})
    
        //save the user 
        const savedUser =  newUser.save().catch((err) => {
          console.log("Error", err)
          res.status(500).json({error: "cannot register user at the moment!"})
        })
        if(savedUser) res.json({message: "Thanks for registering"}) 
    })
    
  }
  },
) 




router.post("/login",  async(req,res) =>{
  const { username, password } = req.body
  const user = await Users.findOne({ where: { username: username }}) 

  //check if the user exist
  if(!user) {
    res.json({error: "User does not exist"})
  } else {
    bcrypt.compare(password, user.password).then((match) => {

      if(!match) {
        res.json({error : "Password and username does not match"});
      } else {
        const accessToken = sign(
          { username : user.username, id : user.id},
           "importantsecret"
           ); 
        res.json(accessToken);
      }
    })
  }
})

router.delete("/delete/:id", validateToken, async(req,res) => {
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

router.put("/update/:id", validateToken, async(req,res) => {
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