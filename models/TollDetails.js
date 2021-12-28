const sequelize = require("sequelize");

module.exports = (sequelize,DataTypes) => {

    const Toll = sequelize.define( "TollDetails", {
     
        branchNumber : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        district : {
            type : DataTypes.STRING,
            allowNull : false
        },
        tollName : {
            type : DataTypes.STRING,
            allowNull : false
        }, 
        section : {
            type : DataTypes.STRING,
            allowNull : false
        },
       
    })

    return Toll
}