const express = require("express");
const cors = require("cors");
require("dotenv").config();

const Data = require('./modules/data.js');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/crops', Data.accessCropAPI);

app.get("/test", (req, res) => res.send("SERVER IS RUNNING"));

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
