const sequelize = require("sequelize");

module.exports = (sequelize,DataTypes) => {

    const Vehicles = sequelize.define( "vehicles", {
     
        vehicleType : {
            type : DataTypes.STRING,
            allowNull : false
        },
        price : {
            type : DataTypes.STRING,
            allowNull : false
        },
    })

    return Vehicles
}