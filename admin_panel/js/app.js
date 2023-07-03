import { obtenerProductos, eliminarProducto } from "./api.js";

(function (){

const listado = document.querySelector('#listado-Productos');
listado.addEventListener('click', confirmarEliminar);
document.addEventListener('DOMContentLoaded', mostrarProductos);


async function mostrarProductos() {
    const productos = await obtenerProductos();

    

    productos.forEach(producto => {
        const { nombre, precio, marca, tipo, _id} = producto;
        
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
        <a href = "editar-producto.html?id=${_id}" id="${_id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
            <a href="#" data-producto="${_id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
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

async function confirmarEliminar(e){
    if(e.target.classList.contains('eliminar')){
        const productoId = e.target.dataset.producto;

        //console.log(productoId);

        const confirmar = confirm('Quieres eliminar este producto?❌');
        if(confirmar){
            await eliminarProducto(productoId);

            alert('Producto eliminado exitosamente ✅');
            window.location.reload(); 
        }
    }
}

})();    

