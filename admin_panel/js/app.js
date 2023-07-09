import { obtenerProductos, eliminarProducto } from "./api.js";

(function (){

const listado = document.querySelector('#listado-Productos');
listado.addEventListener('click', confirmarEliminar);
document.addEventListener('DOMContentLoaded', mostrarProductos);


async function mostrarProductos() {
    const productos = await obtenerProductos();

    productos.forEach(producto => {
        const { nombre, precio, marca, tipo, _id, imagen} = producto;
        
        const fila = document.createElement('tr');
        
        fila.innerHTML += `
        <td class="px-2 sm:px-6 py-1 sm:py-4 whitespace-no-wrap border-b border-gray-200">
            <div class="flex flex-col items-center justify-center sm:gap-1">
            <p class= "text-xs sm:text-sm leading-5 font-medium text-gray-700 dark:text-gray-200 text-center">${nombre}</p>
            <img class="imagen-delete w-8 sm:w-10 md:w-14 h-8 sm:h-10 md:h-14" src="${imagen}"></img>
            </div>
        </td>
        <td class="px-2 sm:px-6 py-1 sm:py-4 whitespace-no-wrap border-b border-gray-200">
            <p class= "text-xs sm:text-sm leading-5 font-medium text-gray-700 dark:text-gray-200 text-center">${precio}</p>
        </td>
        <td class="px-2 sm:px-6 py-1 sm:py-4  whitespace-no-wrap border-b border-gray-200">
            <p class= "text-xs sm:text-sm leading-5 font-medium text-gray-700 dark:text-gray-200 text-center">${marca} - ${tipo}</p>
        </td>

        <td class="px-2 sm:px-6 py-1 sm:py-4 whitespace-no-wrap border-b border-gray-200">
        <div class="flex flex-col sm:flex-row items-center justify-center sm:gap-2">
        <a href = "editar-producto.html?id=${_id}" id="${_id}" class=" text-sm sm:text-base text-teal-600 dark:text-teal-500 hover:text-teal-900 dark:hover:text-teal-600">Editar</a>
        <a href="#" data-producto="${_id}" class="text-sm sm:text-base text-red-600 dark:text-red-500 hover:text-red-900 dark:hover:text-red-600 eliminar">Eliminar</a>
        </div>
        </td>
    `
        listado.appendChild(fila);
        
    });
       
}

async function confirmarEliminar(e){
    if(e.target.classList.contains('eliminar')){
        const productoId = e.target.dataset.producto;

        //console.log(productoId);

        const confirmar = confirm('Quieres eliminar este producto?❌');
        if(confirmar){
            await eliminarProducto(productoId);
            const imgCon = e.target.parentElement.parentElement
            const texto = imgCon.querySelector(".imagen-delete").src;
            let imagenName = texto.split("/").pop().split("?")[0];
            console.log(imagenName);
            
            fetch("/delete-imagen", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"  
            },
            body: JSON.stringify({ imagenName })

            })
            
            alert('Producto eliminado exitosamente ✅');
            window.location.reload(); 
        }
    }
}

})();    

