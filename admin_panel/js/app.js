import { obtenerProductos } from "./api.js";
const fs = require('fs');


(function (){

const listado = document.querySelector('#listado-Productos');
listado.addEventListener('click', confirmarEliminar);
document.addEventListener('DOMContentLoaded', mostrarProductos);


async function mostrarProductos() {
    const productos = await obtenerProductos();

    productos.forEach(producto => {
        const { nombre, precio, marca, tipo, id } = producto;
        const fila = document.createElement('tr');
        
        fila.innerHTML += `
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <p class= "text-sm leading-5 font-medium text-gray-700">${nombre}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <p class= "text-sm leading-5 font-medium text-gray-700">${precio}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <p class= "text-sm leading-5 font-medium text-gray-700">${marca} - ${tipo}</p>
        </td>

        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <a href = "editar-producto.html?id=${id}" id="${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
            <a href="#" data-producto="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
        </td>
    `
        listado.appendChild(fila);
        
    });
       
}

/*
async function confirmarEliminar(e){
    if(e.target.classList.contains('eliminar')){
        const productoId = parseInt(e.target.dataset.producto);
        console.log(productoId);

        const confirmar = confirm('Quieres eliminar este producto?❌');
        if(confirmar){
            await eliminarProducto(productoId);
            alert('Producto eliminado exitosamente ✅');
            window.location.href = 'https://capstyle.onrender.com/admin_productos/';  
        }
    }
}
*/
const url = 'https://capstyle.onrender.com/apiServer/gorras';

async function eliminarProducto(productoId) {
    try {
      const data = fs.readFileSync('../../database/bd.json');
      const productos = JSON.parse(data);
  
      // Encuentra el índice del producto a eliminar
      const index = productos.findIndex(producto => producto.id === productoId);
  
      if (index !== -1) {
        // Elimina el producto del array
        productos.splice(index, 1);
  
        // Guarda los cambios en el archivo JSON
        fs.writeFileSync('../../database/bd.json', JSON.stringify(productos));
  
        console.log('Producto eliminado exitosamente');
      } else {
        console.log('No se encontró el producto');
      }
    } catch (error) {
      console.error(error);
    }
  }

  
async function confirmarEliminar(e) {
    if (e.target.classList.contains('eliminar')) {
    const productoId = parseInt(e.target.dataset.producto);
    console.log(productoId);
    const confirmar = confirm('¿Quieres eliminar este producto? ❌');
if (confirmar) {
  await eliminarProducto(productoId);
  alert('Producto eliminado exitosamente ✅');
  window.location.href = 'https://capstyle.onrender.com/admin_productos/';
}
    }
}



})();    

