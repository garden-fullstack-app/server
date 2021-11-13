const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

let weatherData = require('./modules/weather.js');
const Crops = require('./modules/crops.js');
const Pests = require('./modules/pest.js');

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
// app.get('/seed', seed);
// app.get('/clear', clearDB)



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






// app.get('/allPlants', (req, res) => {
//   PlantModel.find((err, item) => {
//     if (err) return res.status(500).send(err);
//     else {
//       res.status(200).send(item);
//     }

//   });
// })





// async function clearDB(req, res) {
//   try {
//     await PlantModel.deleteMany({});
//     console.log('Database Cleared');
//     res.status(200).send('cleared')
//     await PestModel.deleteMany({});
//     console.log('Database Cleared');
//     res.status(200).send('cleared')
//   }
//   catch (e) {
//     console.log('error:', e.message);
//   }
// }

// function seed(req, res) {
//   const seedArr = [
//     {
//       plantName: 'orange',
//       plantFamily: 'fruit',
//       determinate: true,
//     },
//     {
//       plantName: 'banana',
//       plantFamily: 'fruit',
//       determinate: true,
//     },
//     {
//       plantName: 'apple',
//       plantFamily: 'fruit',
//       determinate: true,
//     },


//   ]
//   seedArr.forEach(seed => {
//     let entry = new PlantModel(seed);
//     entry.save();
//   })
//   res.status(200).send('seeded the database');
// }

