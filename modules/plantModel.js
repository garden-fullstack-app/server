const mongoose = require('mongoose');

const { Schema } = mongoose;

const plantSchema = new mongoose.Schema({
  plantName: { type: String },
  lightRequirements: { type: String },
  plantDescription: { type: String },
  plantSowMethod: { type: String },
  medianDaysToFirstHarvest: { type: Number },
  medianDaysToLastHarvest: { type: Number },
}
)

const PlantModel = mongoose.model('gardenPlant', plantSchema);

module.exports = PlantModel;