const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const emission_routes = require("./app/controllers/ghg_emissions.controller.js");


const app = express();

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
});


// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });
  

  
let corsOptions = {
    origin: "https://localhost:8080"
}

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Ghg Emissions" });
  })
app.get('/ghg-emissions', emission_routes.retrieveAll)
app.post('/ghg-emissions', emission_routes.create)
app.get('/ghg-emissions', emission_routes.retrieveBtwYears)
app.delete('/ghg-emissions', emission_routes.deleteAll)
const PORT = process.env.PORT || 8080

app.listen(PORT, ()=> console.log("Server is running on ", PORT))