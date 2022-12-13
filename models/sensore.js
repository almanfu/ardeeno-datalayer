const mongoose = require("mongoose")
// schema
const SensoreSchema = new mongoose.Schema({
  id: {type:String, required:true, unique:true},
  impianto : {type:mongoose.Schema.Types.ObjectId, ref:'Impianto'},
  parametri : [{type:string}],
  lat: {type:Number, required:true},
  long: {type:Number, required:true},
  dataDismissione: {type:Date},
  isDismesso: {type:Boolean, required:true}
});

const Sensore = mongoose.model("Sensore", SensoreSchema); //convert to model named Utente
module.exports = Sensore