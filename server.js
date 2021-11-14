const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

let weatherData = require('./modules/weather.js');
const Crops = require('./modules/crops.js');
const Pests = require('./modules/pest.js');
const PlantModel = require('./modules/plantModel.js');


const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }
);


// Weather Route
app.get('/weather', weatherData);

// Plant Routes
app.get('/crops', Crops.getAllPlants);
app.post('/crops', Crops.postPlant);
app.put('/crops/:id', Crops.updatePlant);
app.delete('/crops/:id', Crops.deletePlant);

// Pest Routes
app.get('/allPests', Pests.getAllPests);
app.post('/allPests', Pests.addAPest);
// app.put('allPests/:id', Pests.updatePest);
app.delete('/allPests/:id', Pests.deleteOnePest);


app.get("/test", (req, res) => res.send("SERVER IS RUNNING"));





app.get('/allPests', (req, res) => {
  PestModel.find((err, item) => {
    if (err) return res.status(500).send(err);
    else {
      res.status(200).send(item);
    }

  });
})
app.get('/seed', seed);
app.get('/clear', clearDB)



// Mongoose Connections
mongoose.connect(process.env.MONGO_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true }
);


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', _ => {
  console.log('We\'re connected!');
});

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));










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

function seed(req, res) {
  const seedArr = [
    {
      plantName: 'orange',
      plantFamily: 'fruit',
      determinate: true,
      directSowDate: "12/10/2018",
      daysToMaturity: 80,
      harvestCountdown: "12/10/2018",
      lightRequirements: 'Full Sun',
      fertilizing: { fertilizer: 'NPK' },
      companionPlants: [],
      enemyPlants: [],
      cropImage: 'https://s3.amazonaws.com/openfarm-project/production/media/pictures/attachments/54b4aef16130650002050000.jpg?1421127404',
      plantDescription: 'Round orange fruit',
      plantSowMethod: 'None',
      medianDaysToFirstHarvest: 38,
      medianDaysToLastHarvest: 56
    }


  ]
  seedArr.forEach(seed => {
    let entry = new PlantModel(seed);
    entry.save();
  })
  res.status(200).send('seeded the database');
}



// {
//   plantName: 'banana',
//   plantFamily: 'fruit',
//   determinate: true,
// },
// {
//   plantName: 'apple',
//   plantFamily: 'fruit',
//   determinate: true,