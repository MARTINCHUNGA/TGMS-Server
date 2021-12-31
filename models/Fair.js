const sequelize = require("sequelize");

module.exports = (sequelize,DataTypes) => {

    const Fairs = sequelize.define( "Fairs", {
     
        dailyPass : {
            type : DataTypes.STRING,
            allowNull : false
        },
        monthly : {
            type : DataTypes.STRING,
            allowNull : false
        },

        singleJourney : {
            type : DataTypes.STRING,
            allowNull : false
        },
        return: {
            type : DataTypes.STRING,
            allowNull : false
        },
    
    })

    return Fairs
}