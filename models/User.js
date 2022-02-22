const { user } = require("pg/lib/defaults");
const sequelize = require("sequelize");

module.exports = (sequelize,DataTypes) => {

    const Users = sequelize.define( "Users", {
     
        
        username : {
            type : DataTypes.STRING,
            allowNull : false
        },

        email : {
            type : DataTypes.STRING,
            allowNull : false
        },
        phone : {
            type : DataTypes.STRING,
            allowNull : false
        },
        // role : {
        //     type : DataTypes.STRING,
        //     default: user,
        //     allowNull : false
        // },
        password : {
            type : DataTypes.STRING,
            allowNull : false
        },
        confirmPassword : {
            type : DataTypes.STRING,
            allowNull : true
        },
        // username : {
        //     type : DataTypes.STRING,
        //     allowNull : false
        // },
    });

    Users.associate = (models) => {
        Users.belongsToMany(models.TollBookings, {
            through: "userBooking",
        });

    }

    

    return Users
}