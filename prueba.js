const { Gorra } = require('./app'); 

Gorra.find({}).then(products => {
  // products contiene todos los documentos de productos 
  // Muestra los productos en tu página HTML
  console.log(products)
})
console.log(Gorra);