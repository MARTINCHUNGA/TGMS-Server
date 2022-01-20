const sequelize = require("sequelize");

module.exports = (sequelize,DataTypes) => {

    const TollDetails = sequelize.define( "TollDetails", {

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
    });

    TollDetails.associate = (models) => {
        TollDetails.hasMany(models.TollBookings, {
            //onDelete: "cascade",
            foreignKey: 'TollDetail_id',
            as : 'TollBookings',
            onDelete: 'CASCADE'
        });   
    }

   
    return TollDetails;
}