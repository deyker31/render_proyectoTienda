const { Gorra } = require('./app'); 

Gorra.find({}).then(products => {
  // products contiene todos los documentos de productos 
  // Muestra los productos en tu página HTML
  mostrarHTML(products);
})
function mostrarHTML(products){
    document.querySelector('body').appendChild(products);
}