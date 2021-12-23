const express = require("express")

const app = express()

//import the models here
const db = require("./models")


app.listen(3000, () => {
    console.log("Server running on port : 3000")
})