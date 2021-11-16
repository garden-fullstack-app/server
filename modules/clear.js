'use strict';

const PlantModel = require('./plantModel.js');
const PestModel = require('./pestModel.js');

async function clearDB(req, res) {
  try {
    await PlantModel.deleteMany({});
    console.log('Database Cleared');
    res.status(200).send('cleared')
    await PestModel.deleteMany({});
    console.log('Database Cleared');
    res.status(200).send('cleared')
  }
  catch (e) {
    console.log('error:', e.message);
  }
}

module.exports = clearDB;
