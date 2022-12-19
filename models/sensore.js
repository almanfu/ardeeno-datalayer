const mongoose = require("mongoose")
// schema
const SensoreSchema = new mongoose.Schema({
  impianto: {type: mongoose.Schema.Types.ObjectId, ref:'Impianto', required:true},
  lat: {type:Number, required:true},
  long: {type:Number, required:true},
  dataDismissione: {type:Date},
  isDismesso: {type:Boolean, required:true, default:false}
});

const Sensore = mongoose.model('Sensore', SensoreSchema, 'Sensori'); //convert to model named Sensore
module.exports = Sensore