const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  email: String,
  lat: Number,
  lng: Number,
  url: String,
  country: String,
  state: String,
  city: String,
  zip: Number,
  createdAt : {
    type : Date,
    default : Date.now() ,
  }
});

module.exports = mongoose.model("Hospital",hospitalSchema);
