const express = require("express")
const app = express()
const cors = require("cors")

app.use(express.json())

app.use(cors())

//import the models here
const db = require("./models")

//import routers here
const userRouter = require("./routes/User")

app.use("/users", userRouter)



db.sequelize.sync().then(() => {

    app.listen(3000, () => {
        console.log("Server running on port : 3000")
    })

})

