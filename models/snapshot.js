const mongoose = require("mongoose")
// schema
const SnapshotSchema = new mongoose.Schema({
  impianto: {type:mongoose.Schema.Types.ObjectId, ref:'Impianto', required:true},
  timestamp: {type:Date, required:true},
  misurazioni: [{type:mongoose.Schema.Types.ObjectId, ref:'Misurazione'}]
});

const Snapshot = mongoose.model("Snapshot", SnapshotSchema); //convert to model named Utente
module.exports = Snapshot