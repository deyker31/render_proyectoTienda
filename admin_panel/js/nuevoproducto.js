import { nuevoProducto } from "./api.js";

(function (){
//Selectores 
const formulario = document.querySelector('#formulario');

formulario.addEventListener('submit', validarProducto);

async function validarProducto(e) {
    e.preventDefault();

    

    const nombre = document.querySelector('#nombre').value;
    const precio = document.querySelector('#precio').value;
    const marca = document.querySelector('#marca').value;
    const tipo = document.querySelector('#tipo').value;
    const color = document.querySelector('#color').value;
    const imagen = document.querySelector('#imagen');
    const imagenFile = imagen.files[0]; // obtener el archivo seleccionado
    const imagenNombre = imagenFile.name; // obtener el nombre del archivo
    
    
    const producto = {
        nombre,
        precio,
        marca,
        tipo,
        color,
        imagen: `/recursos/img/products/${imagenNombre}` 
    }
    console.log(producto);
    if (validar(producto)) {

        //Todos los campos son obligatorios
        mostrarAlerta('Todos los campos son obligatorios');
        return;
    }
    //enviar datos a funcion nuevoProducto
    await nuevoProducto(producto);
    alert('Producto agregado exitosamente ✅');
    //enviar imagen a la carpeta
    const formData = new FormData(formulario); // crear objeto FormData

    fetch('/admin_productos', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
        console.log(data);
        // hacer algo con la respuesta del servidor
        })
        .catch(error => {
        console.error(error+"hola");
        // manejar el error
        });
    window.location.href = '/admin_productos'
}

function validar(producto) {
    return !Object.values(producto).every(index => index !== '');
}


function mostrarAlerta(mensaje) {
    const contenedorAlerta = document.querySelector('#alerta-error');
    const alerta = document.querySelector('bg-red-100');
    if (!alerta) {
        
        const alerta = document.createElement('p');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center');
        alerta.innerHTML = `
        <strong class = "font-bold">Error</strong>
        <span class="block sm:inline">${mensaje}</span>
        `;
        contenedorAlerta.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 1000);
    }
}   

})();

