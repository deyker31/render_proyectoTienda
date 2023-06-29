const mongoose = require('mongoose');


const gorraSchema = new mongoose.Schema({
  id: Number,
  name: String,  
  price: Number,
  image: String 
});

const Gorras = mongoose.model('Gorras', gorraSchema);

//module.exports = Gorras;
/*
const fs = require('fs');

const gorrasJson = fs.readFileSync('./database/bd.json');
const gorras = JSON.parse(gorrasJson);
console.log(gorras);

gorras.forEach(capJson => {
    const cap = new gorras(capJson.gorras);
    cap.save()
      .then(() => console.log('Gorra creada'))
      .catch(err => console.error(err));
  });

gorras.find()
  .then(caps => {
    // Renderiza la vista de gorras y pasa los datos como variable
    res.render('caps', { caps });
  })
  .catch(err => console.error(err)); */

  array.gorras.forEach(function(obj){
    let gorra = new Gorras(obj);
    gorra.save();
    //console.log(gorra);
  });