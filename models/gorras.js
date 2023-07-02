require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//mongoDB

(async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI_TEST,{ useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Te has conectado a mongoDB');
    } catch (error) {
        console.log(error);
    }
})();  


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
  app.post('/apiGorras', (req, res) => {
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

// Definir el esquema el modelo de datos

//IMPORTANTE
app.use(express.json());

// Iniciar el servidor
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Servidor en el puerto ${port}`);
});