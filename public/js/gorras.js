//selectores


const contenedor = document.querySelector('#products');
const categoriaGorras = document.querySelector('#categoria-gorras');
const selectGorras = document.querySelector('#select-filter');
const colorFilter = document.querySelector('#color-filter');


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
    const bannerCarga = document.getElementById('banner-carga');
    //quitar banner despues de 0.5 segundos
    setTimeout(()=>{
        bannerCarga.style.display = 'none';
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
        eventCheckBox(data);
        noSeleccion(data);
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
        contenedor.appendChild(div);
    })

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


function eventCheckBox(bd){
    colorFilter.addEventListener('input', e=>{
        let element = e.target.value;
        if(infoGorras.color = element){
            filtrarColor(bd);
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

function filtrarColor(bd){
    const bdPorDefecto = bd.slice();
    const todos = document.querySelector('#todos-checkbox').value
    const resultado = bd.filter(filtrarColores);
    console.log(resultado.length + 'aqui')
    if(resultado.length){ 
        mostrarHTML(resultado);
    }else if(todos === 'todos'){
        mostrarHTML(bdPorDefecto);
    }
}

function filtrarColores(color){
    if(color.color){
        return color.color === infoGorras.color;
    }
    return color
}

//obligar a que se seleccione un solo checkbox

let checked;

const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', e => {
        if(e.target.checked) {
        checked = e.target;
        }
    });
    });
   
    
    noSeleccion();


function noSeleccion(bd){
    document.addEventListener('click', e => {

        if(checked) {
            checked.checked = false;
            //checked = null;
            mostrarHTML(bd);  
        }
    });
}
    
   




//limpiar select

function limpiarHTML(){
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild)
    }
}