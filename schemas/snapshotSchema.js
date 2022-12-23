const mongoose = require("mongoose")
// schema
const SnapshotSchema = new mongoose.Schema({
  impianto: {type: mongoose.Schema.Types.ObjectId, ref:'Impianto', required:true},
  date: {type:Date, required:true, unique:true}
},
{capped:12*24*31*12*5}//preserves insertion order
);

module.exports = SnapshotSchema