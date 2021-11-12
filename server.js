const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");


const Crops = require('./modules/crops.js');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;



app.get('/crops', Crops.getAllPlants);
app.post('/crops', Crops.postPlant);
app.put('/crops/:id', Crops.updatePlant);
app.delete('/crops/:id', Crops.deletePlant);
app.get("/test", (req, res) => res.send("SERVER IS RUNNING"));



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
