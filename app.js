const dotenv = require("dotenv").config()
const mongoose = require("mongoose")

const Utente = require("./models/utente")
const Impianto = require("./models/impianto")
const Sensore = require("./models/sensore")
const Snapshot = require("./models/snapshot")
const Misurazione = require("./models/misurazione")

// logging
console.log("server started");
console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)
console.log(process.env.MONGODB_URI)

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.log("Error: ", err)
    console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState)
    //insert data
  }
)