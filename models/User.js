const sequelize = require("sequelize");

module.exports = (sequelize,DataTypes) => {

    const Users = sequelize.define( "Users", {
     
        firstName : {
            type : DataTypes.STRING,
            allowNull : false
        },
        lastName : {
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
    });

    Users.associate = (models) => {
        Users.belongsToMany(models.TollBookings, {
            through: "userBooking",
        });

    }

    

    return Users
}