const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get("/test", (req, res) => res.send("SERVER IS RUNNING"));

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
