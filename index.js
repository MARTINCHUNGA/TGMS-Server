 const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(cors());

//import the models here
const db = require("./models");

//import routers here
const userRouter = require("./routes/User");
const vehicleRouter = require("./routes/Vehicle");
const tollRouter = require("./routes/Toll");
<<<<<<< HEAD
const tollBookingRouter = require("./routes/TollBooking");


app.use("/users", userRouter);
app.use("/vehicles", vehicleRouter);
app.use("/tolls", tollRouter);
<<<<<<< HEAD
app.use("/tollBooking", tollBookingRouter);

=======
app.use("/fairs", fairRouter);
app.use("/receipts", receiptRouter);
>>>>>>> 0ff1095722a06a46bcfc8993bb1b397348ef41a9


db.sequelize.sync().then(() => {

    app.listen(3001, () => {
        console.log("Server running on port : 3001");
    })
});

