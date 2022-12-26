const mongoose = require("mongoose")
// schema
const ModelloSchema = new mongoose.Schema({
  nome: {type:String, required:true, unique:true},
  tipo: {type:String, required:true},
  immagine: {type:String, required:true},
  costo: {type:Map, required:true},//in euro, senza iva->class Costo di front-end
  numSensori: {type:Number, required:true},
  superficie: {type:Number, required:true},//consigliata in km^2
  pi: {type:Number, required:true},
  parametri: {type:[{type:Map}], required:true},
});

const Modello = mongoose.model('Modello', ModelloSchema, 'Modelli'); //convert to model named Modello
module.exports = Modello