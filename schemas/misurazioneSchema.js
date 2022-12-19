const mongoose = require("mongoose")
// schema
const MisurazioneSchema = new mongoose.Schema({
  sensore: {type:mongoose.Schema.Types.ObjectId, ref:'Sensore', required:true},
  timestamp: {type:Date, required:true},
  valori: {type:Map, required:true}
},
{capped:200*12*24*31*12*5}// preserves insertion order
);

module.exports = MisurazioneSchema