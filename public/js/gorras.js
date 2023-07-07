//selectores


const contenedor = document.querySelector('#products');
const categoriaGorras = document.querySelector('#categoria-gorras');
const selectGorras = document.querySelector('#select-filter');
const colorFilter = document.querySelector('#color-filter');
const fragment = document.createDocumentFragment();

const infoGorras = {
    id: '',
    nombre: '',
    tipo: '',
    marca: '',
    precio: '',
    imagen: '',
    color:''
}

window.addEventListener('load', function(){
    const div = document.createElement('div')
    div.classList.add('grid','col-span-4','items-center','justify-center')
    div.innerHTML =
    `
    <p class="my-32 text-gray-800 dark:text-gray-200">Cargando ...</p>
    `
    contenedor.appendChild(div)
    const bannerCarga = document.getElementById('banner-carga');
    //quitar banner despues de 0.5 segundos
    setTimeout(()=>{
        bannerCarga.style.display = 'none';
        div.remove();
    }, 500)
    
});

//cargar base de datos
bdJson();

function bdJson(){
    const url = 'https://capstyle.onrender.com/gorrasBd';
    (async ()=>{
        const res = await fetch(url);
        const data = await res.json();
        
        mostrarHTML(data);
        eventInput(data);
        eventInputColor(data);
    })();
}



//Mostrar HTML 

function mostrarHTML(gorras){
    limpiarHTML();
    
    gorras.forEach(gorra =>{
        const div = document.createElement('div');
        div.innerHTML = `
        
        <div class="mx-auto w-8/12 md:w-full max-w-sm h-full flex flex-col items-center justify-between bg-white dark:bg-gray-800  border border-gray-200 rounded-lg shadow dark:border-gray-700">
            <a href="#">
                <img class="py-auto mt-3 px-auto rounded-t-lg mx-auto w-11/12 h-32 md:h-48" src="${gorra.imagen}" alt="img-products" />
            </a>
            <div class="px-5 pb-5 text-center">
                <a href="#">
                    <h5 class="text-md md:text-lg font-semibold tracking-tight text-zinc-500 dark:text-zinc-400">${gorra.marca} ${gorra.tipo}</h5>
                </a>
                <div class="mt-2.5 mb-3">
                <h5 class="nombre-text text-lg md:text-xl text-black font-normal tracking-tight dark:text-white">${gorra.nombre}</h5>
                </div>
                <div class="precio mb-1 text-center">
                    <span class="text-2xl md:text-3xl font-bold text-gray-900  dark:text-white">$${gorra.precio}</span>
                </div>
                <div class="flex items-center justify-center">
                <a href="#" class="btn-carrito text-white px-2 lg:px-3 rounded-lg text-xs lg:text-sm py-2 bg-orange-500 uppercase" data-id="${gorra._id}">Añadir al carrito</a>
                </div>
            </div>
        </div>

        `
        fragment.appendChild(div);
    })
    requestAnimationFrame(() => {
        contenedor.appendChild(fragment);
      });
    
}


//captura de eventos


function eventInput(bd){
    const bdPorDefecto = bd.slice();
    selectGorras.addEventListener('input',e=>{
        let element = e.target.value;
        if(element === 'Menor-Mayor'){
         filtrarMin(bd);
        }else if(element === 'Mayor-Menor'){
            filtrarMax(bd);
        }else if(element === 'A-Z'){
            filtrarMarcaAZ(bd);
        }else if(element === 'Z-A'){
            filtrarMarcaZA(bd);
        }else{
            mostrarHTML(bdPorDefecto);
        }
    })
}


function eventInputColor(bd){
    colorFilter.addEventListener('input', e=>{
        let element = e.target.value;
        if(element === "rojo"){
            filtrarRojo(bd);
        }else if(element === "amarillo"){
            filtrarAmarillo(bd);
        }else if(element === "verde"){
            filtrarVerde(bd);
        }else if(element === "marron"){
            filtrarMarron(bd);
        }else if(element === "celeste"){
            filtrarCeleste(bd);
        }else if(element === "blanco"){
            filtrarBlanco(bd);
        }else if(element === "negro"){
            filtrarNegro(bd);
        }else if(element === "gris"){
            filtrarGris(bd);
        }else if(element === "naranja"){
            filtrarNaranja(bd);
        }else if(element === "morado"){
            filtrarMorado(bd);
        }else if(element === "rosado"){
            filtrarRosado(bd);
        }else if(element === "azul"){
            filtrarAzul(bd);
        }         
    })
  
} 


//funciones de filtrado por input

function filtrarMin(bd){
    
    bd.sort((x, y) => x.precio - y.precio);
    //console.log(bd);
    if (bd.length) {  
        mostrarHTML(bd);
    }

}

function filtrarMax(bd){
    
    bd.sort((x, y) => y.precio - x.precio);
    //console.log(bd);
    if (bd.length) {  
        mostrarHTML(bd);
    }

}

function filtrarMarcaAZ(bd){
    
    bd.sort((x, y) => x.marca.localeCompare(y.marca));
    //console.log(bd);
    if (bd.length) {  
        mostrarHTML(bd);
    }

}

function filtrarMarcaZA(bd){
    
    bd.reverse((x, y) => x.marca.localeCompare(y.marca));
    //console.log(bd);
    if (bd.length) {  
        mostrarHTML(bd);
    }

}

//funciones de filtrado por checkbox (color)

function filtrarRojo(bd){
    const bdNuevo = bd.filter(bd => bd.color === "rojo");
    if(bdNuevo.length == 0){
        noExiste();
    }else{
        mostrarHTML(bdNuevo);
    }   
}    
function filtrarAmarillo(bd){
    const bdNuevo = bd.filter(bd => bd.color === "amarillo");
    if(bdNuevo.length == 0){
        noExiste();
    }else{
        mostrarHTML(bdNuevo);
    }   
} 
function filtrarVerde(bd){
    const bdNuevo = bd.filter(bd => bd.color === "verde");
    if(bdNuevo.length == 0){
        noExiste();
    }else{
        mostrarHTML(bdNuevo);
    }   
}
function filtrarMarron(bd){
    const bdNuevo = bd.filter(bd => bd.color === "marron");
    if(bdNuevo.length == 0){
        noExiste();
    }else{
        mostrarHTML(bdNuevo);
    }   
}
function filtrarCeleste(bd){
    const bdNuevo = bd.filter(bd => bd.color === "celeste");
    if(bdNuevo.length == 0){
        noExiste();
    }else{
        mostrarHTML(bdNuevo);
    }   
}   
  
function filtrarBlanco(bd){
    const bdNuevo = bd.filter(bd => bd.color === "blanco");
    if(bdNuevo.length == 0){
        noExiste();
    }else{
        mostrarHTML(bdNuevo);
    }   
} 
function filtrarNegro(bd){
    const bdNuevo = bd.filter(bd => bd.color === "negro");
    if(bdNuevo.length == 0){
        noExiste();
    }else{
        mostrarHTML(bdNuevo);
    }   
} 
function filtrarGris(bd){
    const bdNuevo = bd.filter(bd => bd.color === "gris");
    if(bdNuevo.length == 0){
        noExiste();
    }else{
        mostrarHTML(bdNuevo);
    }   
}  
function filtrarNaranja(bd){
    const bdNuevo = bd.filter(bd => bd.color === "naranja");
    if(bdNuevo.length == 0){
        noExiste();
    }else{
        mostrarHTML(bdNuevo);
    }   
}   
function filtrarMorado(bd){
    const bdNuevo = bd.filter(bd => bd.color === "morado");
    if(bdNuevo.length == 0){
        noExiste();
    }else{
        mostrarHTML(bdNuevo);
    }   
} 
function filtrarRosado(bd){
    const bdNuevo = bd.filter(bd => bd.color === "rosado");
    if(bdNuevo.length == 0){
        noExiste();
    }else{
        mostrarHTML(bdNuevo);
    }   
}
function filtrarAzul(bd){
    const bdNuevo = bd.filter(bd => bd.color === "azul");
    if(bdNuevo.length == 0){
        noExiste();
    }else{
        mostrarHTML(bdNuevo);
    }   
}    



//limpiar select

function limpiarHTML(){
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild)
    }
}

//funcion no existe producto

function noExiste(){
    limpiarHTML();
    const div = document.createElement('div');
    div.classList.add('mx-auto','p-1','grid','lg:col-span-4','md:col-span-3','sm:col-span-2', 'col-start-1')
    div.innerHTML =
    `
    <p class="text-lg md:text-3xl text-center uppercase sm:px-5 sm:py-7 my-10 rounded-md text-gray-500 dark:text-gray-100">
    <span class="text-red-600">¡</span>
    Color seleccionado no existe
    <span class="text-red-600">!</span>
    </p>
    
    `
    contenedor.appendChild(div);
}