const express = require("express");
const cors = require("cors");
require('dotenv').config();
const mongoose = require('mongoose')
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true}
);

app.get("/test", (req, res) => res.send("SERVER IS RUNNING"));
app.get('/allPlants', (req, res) => {
    PlantModel.find((err, item) => {
        if(err) return res.status(500).send(err);
        else{
            res.status(200).send(item);
        }
    
    });
})
app.get('/allPests', (req, res) => {
    PestModel.find((err, item) => {
        if(err) return res.status(500).send(err);
        else{
            res.status(200).send(item);
        }
    
    });
})
app.get('/seed', seed);
app.get('/clear', clearDB)



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('mongo database is connected :) !'));
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));

const pestSchema = new mongoose.Schema({
    pestName: {type: String},
    pestFamily: {type: String},
    dateSpotted: {type: Date},
    weather: {type: Object},
    plantsAttacked: {type: Array},
    preventiveMeasure: {type: String}

})

const plantSchema = new mongoose.Schema({
    plantName: {type: String},
    plantFamily: {type: String},
    determinate: {type: Boolean},
    directSowDate: {type: Date},
    daysToMaturity: {type:Number},
    harvestCountdown:{type: Date},
    lightRequirements: {type: String},
    fertilizing: {type: Object},
    companionPlants: {type: Array},
    enemyPlants: {type: Array}

})
// Model 

const PlantModel = mongoose.model('gardenPlant', plantSchema, 'gardenCollection');
const PestModel = mongoose.model('gardenPest', pestSchema, 'gardenCollection');
 


async function clearDB(req, res){
try{
    await PlantModel.deleteMany({});
    console.log('Database Cleared');
    res.status(200).send('cleared')
    await PestModel.deleteMany({});
    console.log('Database Cleared');
    res.status(200).send('cleared')
}
catch(e){
    console.log('error:', e.message);
}
}

function seed(req, res){
    const seedArr = [
        {
            plantName: 'orange',
            plantFamily: 'fruit',
            determinate: true,
        },
        {
            plantName: 'banana',
            plantFamily: 'fruit',
            determinate: true,
        },
        {
            plantName: 'apple',
            plantFamily: 'fruit',
            determinate: true,
        },
        

    ]
    seedArr.forEach(seed => {
        let entry = new PlantModel(seed);
        entry.save();
    })
    res.status(200).send('seeded the database');
}

const sampleEntry = new PestModel({
    pestName: 'rat',
    pestFamily: 'rodent',
    dateSpotted: 10/20/2021,
    
})
sampleEntry.save();