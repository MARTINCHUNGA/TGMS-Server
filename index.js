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
const fairRouter = require("./routes/Fair")
const receiptRouter = require("./routes/Receipt")

app.use("/users", userRouter);
app.use("/vehicles", vehicleRouter);
app.use("/tolls", tollRouter);
app.use("/fairs", fairRouter);
app.use("/receipts", receiptRouter);


db.sequelize.sync().then(() => {

    app.listen(3001, () => {
        console.log("Server running on port : 3001");
    })
});

