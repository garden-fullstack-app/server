'use strict';

// JUST FOR TESTING PURPOSES!!! THIS DISABLES HTTPS SECURITY
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const axios = require('axios');

const PlantModel = require('./plantModel.js');

const plantArray = [];

const Crops = {};



Crops.postPlant = async (req, res) => {
  // Request Query
  let { plantName } = req.query;
  let cropURL = `http://www.growstuff.org/crops/${plantName}.json`;

  // TEST URL
  // let cropURL = `http://www.growstuff.org/crops/leek.json`;

  try {
    let getCrops = await axios.get(cropURL);
    console.log(getCrops.data);

    // Target key/values of pulled API data of to shape desired plant object
    const plantObject = {
      plantName: getCrops.data.name,
      lightRequirements: getCrops.data.openfarm_data.attributes.sun_requirements,
      plantDescription: getCrops.data.openfarm_data.attributes.description,
      plantSowMethod: getCrops.data.openfarm_data.attributes.sowing_method,
      medianDaysToFirstHarvest: getCrops.data.median_days_to_first_harvest,
      medianDaysToLastHarvest: getCrops.data.median_days_to_last_harvest
    };


    let postEntry = PlantModel(plantObject);
    postEntry.save();
    // Send newly created plantObject to the plant Array
    plantArray.push(plantObject);
    res.status(200).send(postEntry);
  }
  catch (err) {
    console.log('No Plant Data:', err.message);
  }
}


// Function to retrieve all stored plants GET Route
Crops.getAllPlants = (req, res) => {
  PlantModel.find((err, item) => {
    if (err) return res.status(500).send(err);
    else {
      res.status(200).send(item);
    }
  })
}

// Functional PUT Route
Crops.updatePlant = async (req, res) => {
  let putObj = req.body;
  console.log(req.body);
  let id = req.params.id;
  console.log(req.params);

  try {
    const updatedObj = await PlantModel.findByIdAndUpdate(id, putObj, { new: true, overwrite: true });
    res.status(200).send(updatedObj);
  }
  catch (err) {
    res.status(500).send(`Unable to perform PUT: ${err.message}`);
  }
}


// Functional DELETE Route
Crops.deletePlant = async (req, res) => {
  let { id } = req.params;
  try {
    let deletedObj = await PlantModel.findByIdAndDelete(id);
    res.status(200).send(deletedObj);
  }
  catch {
    res.status(500).send(`Deletion Error: ${err.message}`);
  }
}



module.exports = Crops;