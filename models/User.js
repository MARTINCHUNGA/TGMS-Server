const sequelize = require("sequelize");

module.exports = (sequelize,DataTypes) => {

    const User = sequelize.define( "User", {
     
        firstName : {
            type : DataTypes.STRING,
            allowNull : false
        },
        lastName : {
            type : DataTypes.STRING,
            allowNull : false
        },
        firstName : {
            type : DataTypes.STRING,
            allowNull : false
        }, 
        email : {
            type : DataTypes.STRING,
            allowNull : false
        },
        gender : {
            type : DataTypes.STRING,
            allowNull : false
        },
        DoB : {
            type : DataTypes.DATE,
            allowNull : false
        },


    })

    return User
}