const mongoose = require("mongoose");

const { Schema } = mongoose;

const plantSchema = new mongoose.Schema({
  x: { type: Number },
  y: { type: Number },
  width: {type: Number },
  height: { type: Number },
  plantName: { type: String },
  plantFamily: { type: String },
  determinate: { type: Boolean },
  directSowDate: { type: Date },
  daysToMaturity: { type: Number },
  harvestCountdown: { type: Date },
  lightRequirements: { type: String },
  fertilizing: { type: Object },
  companionPlants: { type: Array },
  enemyPlants: { type: Array },
  cropImage: { type: String },
  plantDescription: { type: String },
  plantSowMethod: { type: String },
  medianDaysToFirstHarvest: { type: Number },
  medianDaysToLastHarvest: { type: Number },
  pestActivity: { type: Array },
});

const PlantModel = mongoose.model("gardenPlant", plantSchema);

module.exports = PlantModel;
