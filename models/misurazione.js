const mongoose = require("mongoose")
// schema
const MisurazioneSchema = new mongoose.Schema({
  sensore: {type:mongoose.Schema.Types.ObjectId, ref:'Sensore', required:true},
  timestamp: {type:Date, required:true},
  valori: [{ type:(new Schema({ any: {} })) }]
});

const Misurazione = mongoose.model("Misurazione", MisurazioneSchema); //convert to model named Utente
module.exports = Misurazione