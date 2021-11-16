const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

let weatherData = require('./modules/weather.js');
const Crops = require('./modules/crops.js');
const Pests = require('./modules/pest.js');
const PlantModel = require('./modules/plantModel.js');
const Seed = require('./modules/seed.js');
const clearDB = require('./modules/clear.js');

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


// Seed and Clear
app.get("/seed", Seed.seedDb);
app.get('/clear', clearDB)

app.get("/test", (req, res) => res.send("SERVER IS RUNNING"));





app.get('/allPests', (req, res) => {
  PestModel.find((err, item) => {
    if (err) return res.status(500).send(err);
    else {
      res.status(200).send(item);
    }

  });
})





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


