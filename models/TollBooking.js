const sequelize = require("sequelize");

module.exports = (sequelize,DataTypes) => {

    const TollBookings = sequelize.define( "TollBookings", {

        district : {
            type : DataTypes.STRING,
            allowNull : false
        },
        tollName : {
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
        },
        tripPlan : {
            type : DataTypes.STRING,
            allowNull : false
        },
    });

    TollBookings.associate = (models) => {
        TollBookings.belongsToMany(models.Users, {
            through: "userBooking",
        });   
    }

    return TollBookings;
}