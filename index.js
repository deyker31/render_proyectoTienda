/*
const app = require('./app');
const http = require('http');
const server = http.createServer(app);


server.listen(process.env.PORT || 3001 ,()=>{
    console.log('El servidor esta corriendo');
}) */

const app1 = require('./app');
const app2 = require('./models/gorras');

const express = require('express');
const app = express();

app.use('/', app1);
app.use('/apiGorras', app2);

const server = app.listen(3001, () => {
  console.log('Listening on port 3001');
});