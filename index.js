const express = require("express");
const { v4: uuidv4 } = require('uuid');
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const  HospitalRouter  = require("./routes/hospitalRoute");
const app = express();
const port = process.env.PORT || 8080;

const db_url = process.env.DATABASE_URL;

app.use(express.json());
app.use(cors());



mongoose
  .connect(db_url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });


  app.use('/api/v1', HospitalRouter)  



  
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
