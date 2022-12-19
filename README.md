# ardeeno-datalayer
This app is used to insert/retrieve data directly to/from the database and is intended as a mock-up of Ardeeno DataDataLayer.

## Usage
```bash
npm start
```
1. `Node` creates and loads to `Mongo` Modello, Impianto, Utente
2. `Python` creates 200 random coordinates in a given place -> `sensori.json`
3. `Node`  
   a. loads 200 Sensore to `Mongo` and gets the `id` -> `sensori_id.json`  
   b. creates and loads 10 Snapshot to `Mongo` -> `snapshots_ts.json`
4. `Python` creates 10*200 Misurazioni -> `misurazioni.json`
5. `Node` loads 20*200 Misurazioni to `Mongo`

Remember to set `numsensori` in `rndsensori.py` and `rndmisurazioni.py`
Remember to set new parametri in `rndmisurazioni.py` when changing Modello