const sequelize = require("sequelize");

module.exports = (sequelize,DataTypes) => {

    const TollBookings = sequelize.define( "TollBookings", {

        district : {
            type : DataTypes.STRING,
            allowNull : false
        },
        // tollName : {
        //     type : DataTypes.STRING,
        //     allowNull : false
        // }, 
        vehicleType : {
            type : DataTypes.STRING,
            allowNull : false
        },
        // regNumber : {
        //     type : DataTypes.STRING,
        //     allowNull : false
        // },
        price : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
    });

    TollBookings.associate = (models) => {
        TollBookings.belongsToMany(models.Users, {
            through: "userBooking",
            as : 'Users',
            foreignKey : 'TollBooking_id'
        }); 
        TollBookings.belongsTo(models.TollDetails,{
            foreignKey: 'TollDetail_id',
            as : 'TollDetails',
            OnDelete : 'NO ACTION'
        });  

        // TollBookings.hasMany(models.Vehicles, {
        //     foreignKey: 'vehicle_id',
        //     as : 'vehicles',
        //     onDelete: 'CASCADE'
        // });
    }

    return TollBookings;
}