

const fs = require('fs');
const csv = require('csv-parser');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres','postgres', 'qwerty123!', {
    host: 'database-1.ckrevdxnqm8k.us-east-2.rds.amazonaws.com',
    dialect: "postgres",
    operatorsAliases: false,
});

const GhgModel =sequelize.define("ghg-emission", {
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

async function bulkInsertToDatabase() {
  try {
    await GhgModel.sync();

    const results = [];
    fs.createReadStream('../assets/greenhouse_gas_inventory_data.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        await GhgModel.bulkCreate(results);

        console.log('Green house gases data inserted successfully!');
        process.exit(0); 
      });
  } catch (error) {
    console.error('Error inserting data:', error);
    process.exit(1); 
  }
}

bulkInsertToDatabase();