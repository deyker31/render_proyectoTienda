require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
//
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const jsonServer = require('json-server');
// Crea un router de json-server
const router = jsonServer.router('./database/bd.json');
// Crea un middleware de json-server
const middlewares = jsonServer.defaults();
// Configura el servidor Express para usar el middleware de json-server
app.use(middlewares);

// Configura el servidor Express para usar el router de json-server en la ruta /apiServer
app.use('/apiServer', router);

//mongoDB

(async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI_TEST,{ useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Te has conectado a mongoDB');
    } catch (error) {
        console.log(error);
    }
})();  


/**/

const User = mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}));
// Middleware para parsear el cuerpo de las solicitudes HTTP
app.use(bodyParser.json());


app.post('/api/users', async (req, res) => {
  try {
    // Verifica si el correo electrónico ya existe
    const existeUser = await User.findOne({ email: req.body.email });
    if (existeUser) {
      return res.status(400).send('El correo electrónico ya está en uso');
    }
    // Si el correo electrónico no existe, crea el nuevo usuario
    const user = new User(req.body);
    await user.save();

    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}); 


////Verficar Sesion /////

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email: email });
    if(email === 'admin123@gmail.com' && password === 'Admin123.'){
      res.json({ message: 'Sesión Admin' });
    }else if (user && user.password === password) {
          res.json({ message: 'Sesión Usuario' });
      } else {
          res.json({ message: 'Correo electrónico o contraseña incorrectos' });
      }
  } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Ocurrió un error al intentar iniciar sesión' });
  }
});


//require('./models/gorras.js');

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
app.use('/admin_productos/nuevoproducto', express.static(path.resolve('admin_panel/nuevo-producto.html')));//pantalla de productos
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

////
////NUEVOPRODUCTO
////

  //  Esquema de mis productos (gorras)
const GorraSchema = new mongoose.Schema({
  nombre: String,  
  precio: Number,
  imagen: String ,
  marca: String ,
  tipo: String ,
  color: String 
});

const Gorra = mongoose.model('gorras', GorraSchema);

// Ruta para recibir la solicitud POST
app.post('/apiGorras', (req, res) => {
const producto = new Gorra(req.body);

// Guardar el objeto en MongoDB
producto.save()
  .then(()=> {
    res.json({ mensaje: 'Producto guardado en MongoDB' });
  })
  .then(error => {
    res.status(500).json({ error: 'Error al guardar el producto en MongoDB' });
  });
});

////
////Extraer gorras
////

app.get('/gorrasBd', (req, res) => {
  Gorra.find()
    .then(gorras => {
      res.send(gorras);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error al extraer las gorras de MongoDB' });
    });
});


///
// Ruta para eliminar un producto por su ID
///
app.delete('/apiGorras/:id', (req, res) => {
  const id = req.params.id;

  //inar el producto por su ID
  Gorra.findByIdAndDelete(id)
    .then(() => {
      res({ mensaje: 'Producto eliminado de MongoDB' });
    })
    .catch(error => {
      console.error('Error al eliminar el producto:', error);
      res.status(500).json({ error: 'Error al eliminar el producto de MongoDB' });
    });
});


//IMPORTANTE
app.use(express.json());

module.exports = app;
