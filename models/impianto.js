const mongoose = require("mongoose")
// schema
const ImpiantoSchema = new mongoose.Schema({
  modello: {type: mongoose.Schema.Types.ObjectId, ref:'Modello', required:true},
  indirizzo: {type:String, required:true},
  fattura: {type:String, required:true},
  superficie: {type:Number, required:true},
  dataAcquisto: {type:Date, required:true},
  dataDismissione: {type:Date},
  isDismesso: {type:Boolean},
  sensori: [{type: mongoose.Schema.Types.ObjectId, ref:'Sensore'}]
});

const Impianto = mongoose.model("Impianto", ImpiantoSchema); //convert to model named Impianto
module.exports = Impianto