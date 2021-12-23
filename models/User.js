const { Sequelize, DataTypes } = require("sequelize/dist")

module.exports = () => {

  const User = Sequelize.define( "User", {
      firstName: {
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
          type : DataTypes.STRING,
          allowNull : false
      },
      phone : {
          type : DataTypes.STRING,
          allowNull : false
      },
    //   {
    //       await User.sync({force : true})
    //   }
  })
    
   return User
}