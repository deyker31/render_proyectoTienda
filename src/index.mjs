import express from 'express';
import paymentRoutes from './routes/pago.mjs';
import {PORT} from './config.mjs';

const app = express();

//Esto  hace que pueda usar peticion CORS en este puerto
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
//export const PRICE = 200;
app.use(paymentRoutes);

app.listen(PORT)
console.log('El servidor esta corriendo en el puerto', PORT);
