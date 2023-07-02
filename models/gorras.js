require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Definir el esquema el modelo de datos
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

const Objeto = mongoose.model('Objeto', GorraSchema);

// Ruta para recibir la solicitud POST
app.post('https://capstyle.onrender.com/apiGorras/', (req, res) => {
  const objeto = new Objeto(req.body);

  // Guardar el objeto en MongoDB
  objeto.save()
    .then(()=> {
      res.json({ mensaje: 'Objeto guardado en MongoDB' });
    })
    .then(error => {
      res.status(500).json({ error: 'Error al guardar el objeto en MongoDB' });
    });
});