const db = require("../models");
const GhgEmissions = db.ghg_emissions;
const Op = db.Sequelize.Op;


// inserts data into the table- country year value parameter 
exports.create = (req,resp) => {

    const {value, country, year, parameter} = req.body;

    if (!req.body.value|| !req.body.country || !req.body.year ) {
        resp.status(400).send({
          message: "Year, Country or Value can't be empty!"
        });
        return;
    }
    const param = new Set(['CO2', 'NO2', 'SO2'])
    if(!param.has(parameter)){
        resp.status(400).send({
            message: "Param not CO2, SO2 or NO2"
        });
        return;
    }

    return GhgEmissions.create({
        year: year,
        country: country,
        value: value,
        parameter: parameter,
    })
      .then((data) => {resp.send(data)})
      .catch((err) => {
        resp.send({
            message:
              err.message || "Error occurred while creating emission data."
          });
    });
  
};

// // Retrieve all emissions from the database.
exports.retrieveAll = (req, resp) => {
      return GhgEmissions.findAll()
      .then((data) => {resp.send(data)})
      .catch((err) => {
        resp.status(500).send({
            message:
              err.message || "Error occurred while fetching emission data."
          });
    });
};

// // Find data for a country within year range, param, country
exports.retrieveBtwYears = (req, resp) => {
    const {startYear, endYear, country, parameter} = req.query;

    if(!startYear || !endYear || !country || !parameter){
        resp.status(400).send({
            message: "Error: missing Query param startYear, endYear, country and parameter"
        });
        return;
    }

    return GhgEmissions.findAll({
        where: {
            year: {
                [Op.between]: [startYear, endYear]
            },
            country: country,
            parameter: parameter

        }
    })
    .then(data => resp.send(data))
    .catch(err => {
        resp.status(500).send({
          message:
            err.message || `Error occurred while retrieving emission data between ${startYear} and ${endYear}`
        });
    });
};



