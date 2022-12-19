//imports
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10
const fs = require('fs')
const spawnSync = require('child_process').spawnSync

//mongoose
const Utente = require("./models/utente")
const Modello = require("./models/modello")
const Impianto = require("./models/impianto")
const Sensore = require("./models/sensore")
const SnapshotSchema = require("./schemas/snapshotSchema")
const MisurazioneSchema = require("./schemas/misurazioneSchema")
///mongoose consts
const CLIENTE_ID="639f1c3274aef65fb510cb79"
const MODELLO_ID="639f2d4574aef65fb510cb8b"
const IMPIANTO_ID="639f2df174aef65fb510cb8f"

//code parameters
const NEW_CLIENTE=false
const NEW_MODELLO=false
const NEW_IMPIANTO=false
const NEW_SENSORI=false
const NEW_SNAP_MIS=true

const N_SNAPSHOTS=10


// logging
console.log("server started");
console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)
console.log("...connecting to " + process.env.MONGODB_URI)

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  async (err) => {
    if (err) return console.log("Error: ", err)
    console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState)

    if(NEW_CLIENTE){
      //add one Cliente Mario Rossi
      await Utente.remove()
      await Utente.deleteMany()
      const myCliente = await Utente.create({
        _id: CLIENTE_ID,
        email: "mario.rossi@gmail.com",
        password: bcrypt.hashSync("password", SALT_ROUNDS),
        indirizzo: "Fake Street 123",
        nome: "Mario",
        cognome: "Rossi",
        telefono: "1112223333",
        ruolo: "cliente",
        isEmailConfermata: true,
        impiantiAcquistati: [IMPIANTO_ID],
      })
    }

    if(NEW_MODELLO){
      //add one Modello
      await Modello.remove()
      await Modello.create({
        _id: MODELLO_ID,
        nomeModello: "FP200A",
        tipo: "FP",
        immagine: "/media/fp_a.png",
        costo: 97412.73,
        numSensori: 200,
        superficie: 20,
        pi: 5,
        parametri : [{name:"temp", uom:"°C"}, {name:"hum_rel", uom:"%"}, {name:"CO2", uom:"ppm"}, {name:"O2", uom:"ppm"}, {name:"tvoc", uom:"ppb"}]
      })
    }

    if(NEW_IMPIANTO){
      //add one Impianto
      await Impianto.remove()
      await Impianto.create({
        _id: IMPIANTO_ID,
        modello: MODELLO_ID,
        indirizzo: "Panarotta SP11, 38056 Levico Terme TN",
        fattura: "697999697895",
        superficie: 26.35,
        dataAcquisto: "2022-12-12"
      })      
    }

    //get myImp
    const myImp = await Impianto.findOne({_id:IMPIANTO_ID})
    //get Modello of myImp
    const modello = await Modello.findOne({_id:MODELLO_ID}).exec()
    //get sensori id
    const sensori_id = []
    for(sensore of myImp.sensori){
      sensori_id.push(sensore._id)
    }

    if(NEW_SENSORI){
      //add many Sensore to myImp
      await Sensore.remove()
      ///call rnd_sensori.py
      spawnSync('python3', ['rnd_sensori.py'])
      const sensori = JSON.parse(fs.readFileSync('./sensori.json', 'utf8'))
      for (let sensore of sensori){
        sensore.impianto = IMPIANTO_ID;
        sensore._id = (await Sensore.create(sensore))._id;
        console.log("_id="+sensore._id)
        myImp.sensori.push(sensore._id)
      }
      sensori_id = myImp.sensori
      await Impianto.updateOne(myImp)
    }

    if(NEW_SNAP_MIS){
      //add many Snapshot to myImp
      let myImpSnapshot = mongoose.model('Snapshot', SnapshotSchema, 'Snapshots_'+myImp._id)
      await myImpSnapshot.remove()
      snapshots_ts = []
      for(let i of Array(N_SNAPSHOTS).keys()){
        snapshots_ts.push(new Date(2022, 11, 12, 1, i*5, 0, 0).getTime())
        console.log(await myImpSnapshot.create({
          impianto: IMPIANTO_ID,
          timestamp: new Date(2022, 11, 12, 1, i*5, 0, 0)}))
      }
      
      //add many Misurazione to mySnap
      ///save sensori_id.json, snapshots_ts.json
      fs.writeFileSync('sensori_id.json', JSON.stringify(sensori_id))
      fs.writeFileSync('snapshots_ts.json', JSON.stringify(snapshots_ts))
      ///call rnd_misurazioni.py
      spawnSync('python3', ['rnd_misurazioni.py'])
      let myImpMisurazioni = mongoose.model('Misurazione', MisurazioneSchema, 'Misurazioni_'+myImp._id)
      await myImpMisurazioni.remove()
      const misurazioni = JSON.parse(fs.readFileSync('./misurazioni.json', 'utf8'))
      for(let misurazione of misurazioni){
        console.log(await myImpMisurazioni.create(misurazione))
      }
    }

    process.exit()
})
