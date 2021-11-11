'use strict';

// JUST FOR TESTING PURPOSES!!! THIS DISABLES HTTPS SECURITY
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const axios = require('axios');

const PlantModel = require('./plantModel.js');

const Data = {};

Data.accessCropAPI = async (req, res) => {

  // Request Query
  // let { plantName } = req.query;
  // let cropURL = `http://www.growstuff.org/crops/${plantName}.json`;

  // TEST URL
  let cropURL = `http://www.growstuff.org/crops/avocado.json`;
  console.log(cropURL);
  try {
    let getCrops = await axios.get(cropURL);
    console.log(getCrops.data);
    // console.log('Object:', Object.values(getCrops.data));
    // const plantArray = getCrops.data(crop => new Plant(crop));

    const plantObject = {
      plantName: getCrops.data.name,
      lightRequirements: getCrops.data.openfarm_data.attributes.sun_requirements,
      plantDescription: getCrops.data.openfarm_data.attributes.description,
      plantSowMethod: getCrops.data.openfarm_data.attributes.sowing_method,
      medianDaysToFirstHarvest: getCrops.data.median_days_to_first_harvest,
      medianDaysToLastHarvest: getCrops.data.median_days_to_last_harvest
    };

    console.log(plantObject);

    res.status(200).send(plantObject);
  }
  catch (err) {
    console.log('No Plant Data:', err.message);
  }
}


module.exports = Data;