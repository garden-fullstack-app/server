"use strict";

// JUST FOR TESTING PURPOSES!!! THIS DISABLES HTTPS SECURITY
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const axios = require("axios");

const PlantModel = require("./plantModel.js");

const plantArray = [];

const Crops = {};

Crops.postPlant = async (req, res) => {
  // Request Query
  console.log("Incoming: ", req.body);
  let { plantFamily } = req.body;
  let cropURL = `http://www.growstuff.org/crops/${plantFamily}.json`;

  // TEST URL
  // let cropURL = `http://www.growstuff.org/crops/leek.json`;

  try {
    let allCrops = await axios.get(cropURL);
    let getCrops = allCrops;
    // console.log(getCrops.data);

    // Target key/values of pulled API data of to shape desired plant object
    const plantObject = {
      x: req.body.x,
      y: req.body.y,
      width: req.body.width,
      height: req.body.height,
      plantName: req.body.plantName,
      plantFamily: req.body.plantFamily,
      determinate: req.body.determinate,
      directSowDate: req.body.directSowDate,
      daysToMaturity: req.body.daysToMaturity,
      lightRequirements: req.body.lightRequirements,
      fertilizing: req.body.fertilizing,
      plantDescription: getCrops.data.openfarm_data.attributes?.description ?? "no data",
      plantSowMethod: getCrops.data.openfarm_data.attributes?.sowing_method ?? "no data",
      medianDaysToFirstHarvest: getCrops.data?.median_days_to_first_harvest ?? "no data",
      medianDaysToLastHarvest: getCrops.data?.median_days_to_last_harvest ?? "no data",
      cropImage: getCrops.data.openfarm_data?.attributes?.main_image_path ?? "no data",
    };

    // alternate Light Requirements
    // lightRequirements: getCrops.data.openfarm_data.attributes.sun_requirements,

    //req.body Information to insert into plant object above
    // plantName: req.body.plantName,
    // plantFamily: req.body.plantFamily,
    // determinate: req.body.determinate,
    // directSowDate: req.body.directSowDate,
    // daysToMaturity: req.body.daysToMaturity,
    // lightRequirements: req.body.lightRequirements,
    // fertilizing: req.body.fertilizing
    // plantName: { type: String },
    // plantFamily: req.body.name,
    // determinate: { type: Boolean },
    // directSowDate: { type: Date },
    // daysToMaturity: { type: Number },
    // harvestCountdown: { type: Date },
    // lightRequirements: { type: String },
    // fertilizing: { type: Object },
    // companionPlants: { type: Array },
    // enemyPlants: { type: Array },

    let postEntry = PlantModel(plantObject);
    postEntry.save((err, postEntry) => {
      if (err) {
        console.log(err);
      }
      console.log("Post Entry Happened");
      res.status(200).json(postEntry);
    });
  } catch (err) {
    console.log("No Plant Data:", err.message);
  }
};

// Function to retrieve all stored plants GET Route
Crops.getAllPlants = async (req, res) => {
  try {
    //   let filterQ = {};
    //   if (req.query.status) {
    //     let { status } = req.query;
    //     filterQ.status = status;
    //   }
    //   //JWKS
    //   const item = await PlantModel.find(filterQ);
    //   let token = '';
    //   if (!req.headers.authorization) token = '';
    //   else {
    //     token = req.headers.authorization.split([' '])[1];
    //   }

    //   jwt.verify(token, getKey, {}, function (err, user) {
    //     if (err) res.status(500).send(`Invalid Token: ${err.message}`);
    //     else {
    //       res.status(200).send(item);
    //     }
    //   })

    PlantModel.find((err, item) => {
      if (err) return res.status(500).send(err);
      else {
        console.log(item)
        res.status(200).send(item);
      }
    });
  } catch (error) {
    res.status(500).send(`Error retrieving Plant data:${error.message}`);
  }
};

// Functional PUT Route
Crops.updatePlant = async (req, res) => {
  let putObj = req.body;
  console.log('put' ,req.body);
  let id = req.params.id;
  console.log(req.params);

  try {
    const updatedObj = await PlantModel.findByIdAndUpdate(id, putObj, { new: true, overwrite: true });
    res.status(200).send(updatedObj);
  } catch (err) {
    res.status(500).send(`Unable to perform PUT: ${err.message}`);
  }
};

// Functional DELETE Route
Crops.deletePlant = async (req, res) => {
  let { id } = req.params;
  try {
    let deletedObj = await PlantModel.findByIdAndDelete(id);
    res.status(200).send(deletedObj);
  } catch (err) {
    res.status(500).send(`Deletion Error: ${err.message}`);
  }
};

module.exports = Crops;
