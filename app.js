require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');



(async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI_TEST);
        console.log('Te has conectado a mongoDB');
    } catch (error) {
        console.log(error);
    }
})(); 

//rutas FRONTEND

app.use('/',express.static(path.resolve('views','home')));//pagina de inicio o home
app.use('/register',express.static(path.resolve('views','register')));//pagina de registro
app.use('/login',express.static(path.resolve('views','login')));//pagina de inicio de sesion
app.use('/gorras',express.static(path.resolve('views','gorras')));//pagina de los productos o gorras
app.use('/contact',express.static(path.resolve('views','contact')));//pagina de contacto
app.use('/pago',express.static(path.resolve('views','pago')));//pantalla de compra
app.use(express.static('public'));//ruta donde estan el css, el js y img
app.use('/recursos',express.static(__dirname+'/public'));//carpeta de public , y todos los archivos lo llamaremos desde aqui
app.use(express.static('database'));//temporal
app.use('/admin_productos',express.static(path.resolve('admin_panel')));//pantalla de productos
app.use('/pago/alerta',express.static(path.resolve('src', 'pagoCancelado')));// conexion de pagoalerta
app.use('/alerta',express.static(path.resolve('views', 'pagoExitoso')));// conexion de pagoalerta


//usando fs para llear datos de bd
const fs = require('fs');

async function leerBaseDeDatos() {
  return new Promise((resolve, reject) => {
    fs.readFile('http://localhost:3000/registros', 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

//enviando en esta ruta la id
app.put('/registros/:id', async function (req, res) {
    var id = req.params.id;
    var precio = req.body.precio;
  
    try {
      // Leer la base de datos
      var baseDeDatosJSON = await leerBaseDeDatos();
      var baseDeDatos = JSON.parse(baseDeDatosJSON);
  
      // Actualizar el precio del objeto correspondiente
      if (baseDeDatos.hasOwnProperty(id)) {
        baseDeDatos[id].precio = precio;
      } else {
        console.error("No se encontró el objeto con el ID especificado.");
      }
  
      // Guardar la base de datos
      await guardarBaseDeDatos(JSON.stringify(baseDeDatos));
  
      console.log("Precio actualizado correctamente en la base de datos.");
      res.send(baseDeDatos[id]); // Devolver el objeto actualizado
    } catch (error) {
      console.error("Error al actualizar precio en la base de datos:", error);
      res.status(500).send("Error al actualizar precio en la base de datos.");
    }
  });




//IMPORTANTE
app.use(express.json());

module.exports = app;
