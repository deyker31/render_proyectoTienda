import { nuevoProducto } from "./api.js";

(function (){
//Selectores 
const formulario = document.querySelector('#formulario');

formulario.addEventListener('submit', validarProducto);

async function setProductImage(copia , urlImagen) {
    copia.imagen = urlImagen; 
    console.log(copia)  
    //enviar datos a funcion nuevoProducto
    await nuevoProducto(copia);
    window.location.href = '/admin_productos'
    alert('Producto agregado exitosamente ✅');
  }

async function validarProducto(e) {
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const precio = document.querySelector('#precio').value;
    const marca = document.querySelector('#marca').value;
    const tipo = document.querySelector('#tipo').value;
    const color = document.querySelector('#color').value; 
    const imagen = document.querySelector('#imagen').value; 
    
    const producto = {
        nombre,
        precio,
        marca,
        tipo,
        color,
        imagen
    }
    console.log(producto);
    if (validar(producto)) {

        //Todos los campos son obligatorios
        mostrarAlerta('Todos los campos son obligatorios');
        return;
    }
    //enviar imagen a la carpeta
    const formData = new FormData(formulario); // crear objeto FormData

    fetch('/admin_productos', {
        method: 'POST',
        body: formData
    })
    .then(response  => response.json())
        .then(({ url })  => {
            const texto = url;
            const partes = texto.split("/");
            const nombre_imagen = partes[partes.length - 1];
            const urlImagen = `https://firebasestorage.googleapis.com/v0/b/imagenes-capstyle.appspot.com/o/${nombre_imagen}?alt=media`;
            const copia = Object.assign({}, producto);
            setProductImage(copia , urlImagen);
        })
        .catch(error => {
            console.error(error);
            // manejar el error
        });
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

