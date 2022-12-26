const mongoose = require('mongoose')
// schema
const UtenteSchema = new mongoose.Schema({
  email: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  indirizzo: {type:String, required:true},
  nome: {type:String, required:true},
  cognome: {type:String, required:true},
  telefono: {type:String, required:true, unique:true},
  ruolo: {type:String, enum:['cliente', 'tecnico', 'supervisore', 'amministratore'], default:'cliente'},
  isEmailConfermata: {type:Boolean, default:true},
  impiantiAcquistati: {type:[{type: mongoose.Schema.Types.ObjectId, ref: 'Impianto'}], default:[]},
  cf: {type:String, unique:true, sparse:true},
  isDimesso: {type:Boolean, default:false}
});

const Utente = mongoose.model('Utente', UtenteSchema, 'Utenti'); //convert to model named Utente
module.exports = Utente