
const sequelize = require("sequelize");

module.exports = (sequelize,DataTypes) => {

    const Receipts = sequelize.define( "Receipts", {
     
        tollName : {
            type : DataTypes.STRING,
            allowNull : false
        },
        District : {
            type : DataTypes.STRING,
            allowNull : false
        },

        vehicleType : {
            type : DataTypes.STRING,
            allowNull : false
        },
        price : {
            type : DataTypes.STRING,
            allowNull : false
        }
    })

    return Receipts
}