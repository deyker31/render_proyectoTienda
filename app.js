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
/////
//Paypal
/////
const paymentRoutes = require('./src/routes/pago.js');
const { PORT } = require('./src/config.js');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/paypal', paymentRoutes);
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

///
//enviar imagen con multer
///

const multer  = require('multer');
const mimeTypes = require('mime-types');
const admin = require("firebase-admin");
// Configurar Firebase
var serviceAccount = require("./imagenes.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://imagenes-capstyle.appspot.com"
});

var bucket = admin.storage().bucket();

// Configurar Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/admin_productos', upload.single('imagen'), function (req, res, next) {
  // req.file es el `imagen` file

  if (!req.file) {
    res.status(400).send('No file submitted');
    return;
  }

  // Crear un nuevo blob en el bucket y subir el archivo
  var blob = bucket.file(req.file.originalname);
  var blobStream = blob.createWriteStream();
  const url = blob.publicUrl();
  
  
  blobStream.on('error', (err) => {
    next(err);
  });

  blobStream.on('finish', () => {
    // El archivo se subió correctamente
    res.status(200).json({ url });
  });

  // Cuando no hay más datos para subir, cierra el stream
  blobStream.end(req.file.buffer);
});

///eliminar imagen de firebase

app.post("/delete-imagen", (req, res) => {
  const { imagenName } = req.body;
 
  const file = bucket.file(imagenName); 
  file.delete().then(() => {
    res.send("Image deleted");
  }).catch(err => {
    console.error(err);
    res.status(500).send("Error deleting image");
  });
})




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

/*
//usando fs para llear datos de bd
const fs = require('fs');

async function leerBaseDeDatos() {
  return new Promise((resolve, reject) => {
    fs.readFile('https://capstyle.onrender.com/apiServer/registros', 'utf8', (error, data) => {
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
  }); */

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

// Obtener un producto por su ID
app.get('/apiGorras/:id', (req, res) => {
  const id = req.params.id;

  // Buscar el producto por su ID en la base de datos
  Gorra.findById(id)
    .then(producto => {
      res.json(producto);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'Error al obtener el producto de MongoDB' });
    });
});

// Editar un producto
app.put('/apiGorras/:id', (req, res) => {
  const id = req.params.id;
  const nuevoProducto = req.body;
  
  // Actualizar el producto por su ID en la base de datos
  Gorra.findByIdAndUpdate(id, nuevoProducto)
    .then(() => {
      res.json({ mensaje: 'Producto actualizado en MongoDB '});
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'Error al actualizar el producto en MongoDB' });
    });
});

//actualizar imagen de firebase
app.post("/update-image", async (req, res) => {
  const { currentImageUrl, newImage } = req.body;
  
  const file = bucket.file(currentImageUrl);
  
  const downloadUrl = file.publicUrl();  
  
  await fetch(downloadUrl, {
    method: 'PUT', 
    body: newImage
  });  
  
  await file.updateMetadata({
    contentType: newImage.type  
  });

  res.send("Image updated!");
})


//IMPORTANTE
app.use(express.json());

module.exports = app;
