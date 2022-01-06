const sequelize = require("sequelize");

module.exports = (sequelize,DataTypes) => {

    const TollBooking = sequelize.define( "TollBooking", {
      
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

    return TollBooking;
}