
const mongoose = require('mongoose');

const { Schema } = mongoose;



const pestSchema = new mongoose.Schema({
  pestName: { type: String },
  pestFamily: { type: String },
  dateSpotted: { type: Date },
  weather: { type: Object },
  plantsAttacked: { type: Array },
  preventiveMeasure: { type: String }

})

const PestModel = mongoose.model('gardenPest', pestSchema, 'gardenCollection');
const sampleEntry = new PestModel({
  pestName: 'rat',
  pestFamily: 'rodent',
  dateSpotted: 10 / 20 / 2021,

})
sampleEntry.save();

module.exports = PestModel;
