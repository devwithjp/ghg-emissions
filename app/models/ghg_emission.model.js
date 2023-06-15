module.exports = (sequelize, Sequelize) => {
    const GhgEmission = sequelize.define("ghg-emission", {
      year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      value: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      parameter:{
        type: Sequelize.ENUM('CO2','NO2','SO2')
      }
    });
  
    return GhgEmission;
  };