//import { mostrarAlerta } from './alerta.js';
import { obtenerProducto, editarProducto } from './api.js';

const nombreInput = document.querySelector('#nombre');
const precioInput = document.querySelector('#precio');
const marcaInput = document.querySelector('#marca');
const tipoInput = document.querySelector('#tipo');
const idInput = document.querySelector('#id');
const imagenInput = document.querySelector('#imagen');
const colorInput = document.querySelector('#color');

document.addEventListener('DOMContentLoaded', async () => {
    //verificar si el cliente existe
    const parametrosURL = new URLSearchParams(window.location.search);
    const idProducto = parametrosURL.get('id');
    console.log(idProducto);
    const producto = await obtenerProducto(idProducto);
    
    mostrarProducto(producto);

    //ahora vamos a registrar en el formulario

    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', validarProducto);
})

function mostrarProducto(producto) {
    
    const {  nombre, precio, marca, tipo, color, imagen, _id } = producto;
    
    nombreInput.value = nombre;
    precioInput.value = precio;
    marcaInput.value = marca;
    tipoInput.value = tipo;
    imagenInput.value = imagen;
    colorInput.value = color;
    idInput.value = _id;
}

async function validarProducto(e) {
    e.preventDefault();
    const producto = {
        nombre: nombreInput.value,
        precio: precioInput.value,
        marca: marcaInput.value,
        tipo: tipoInput.value,
        color: colorInput.value,
        imagen: imagenInput.value,
        id: parseInt(idInput.value)
    }
    
    if (validar(producto)) {
        mostrarAlerta('Todos los campos son obligatorios');
        return;
    }

    await editarProducto(producto);
    alert('Producto editado exitosamente ✅')
    window.location.href = 'index.html';

}

function validar(e) {
    return !Object.values(e).every(i => i !== '');
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