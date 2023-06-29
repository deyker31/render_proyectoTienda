const mongoose = require('mongoose');
const fs = require('fs');

//me traigo la informacion de mi base de datos json con la libreria fs
const gorrasJson = fs.readFileSync('./database/bd.json');
const array = JSON.parse(gorrasJson);

//  Esquema de mis productos (gorras)
const GorraSchema = new mongoose.Schema({
  id: Number,
  nombre: String,  
  precio: Number,
  imagen: String ,
  marca: String ,
  tipo: String ,
  color: String 
});

//const RegistroSchema = new mongoose.Schema({/* define tu esquema aquí */});
//const UserSchema = new mongoose.Schema({/* define tu esquema aquí */});

const Gorras = mongoose.model('Gorras', GorraSchema);
//const Registro = mongoose.model('Registro', RegistroSchema);



array.gorras.forEach(function(obj){
  Gorras.findOne(obj).then(existeGorra => {
    if(!existeGorra){
      let gorra = new Gorras(obj);
      gorra.save();
    }
  }).catch(err => {
    throw err;
  });
});



