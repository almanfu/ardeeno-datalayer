const mongoose = require("mongoose")
// schema
const ImpiantoSchema = new mongoose.Schema({
  modello: {type: mongoose.Schema.Types.ObjectId, ref:'Modello', required:true},
  indirizzo: {type:String, required:true},
  lat: {type:Number, required:true},
  long: {type:Number, required:true},
  fattura: {type:String, required:true},
  superficie: {type:Number, required:true},//effettiva in km^2
  dataAcquisto: {type:Date, required:true},
  dataDismissione: {type:Date},
  isDismesso: {type:Boolean, default:false},
  sensori: {type:[{type: mongoose.Schema.Types.ObjectId, ref:'Sensore'}], default:[]}
});

const Impianto = mongoose.model('Impianto', ImpiantoSchema, 'Impianti'); //convert to model named Impianto
module.exports = Impianto