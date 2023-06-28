//Selectores
const carrito = document.querySelector('#sub-carrito');
const listaCursos = document.querySelector('#products');
const contenedorCarrito = document.querySelector('#contenedor-carrito');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const btnRealizarCompra = document.querySelector('#realizar-compra');
const btnsDiv = document.querySelector('#div-carrito-compra')
let btnPrecioTotal = document.querySelector('#precio-total span');
let articulosCarrito = [];
let precioTotal = 0;
//Eventos

cargarEventListeners();

function cargarEventListeners(){
    //captura un evento cuando hacemos click en el boton "Agregar Carrito"
    listaCursos.addEventListener('click',agregarCurso);

    //eliminar un curso del carrito
    carrito.addEventListener('click',eliminarCurso)

    //agregar curso al presionar el btn en el carrito

    carrito.addEventListener('click', sumarCurso)

    //
    if (localStorage.getItem('precioTotal')) {
        precioTotal = parseFloat(localStorage.getItem('precioTotal'));
        btnPrecioTotal.textContent = `$${precioTotal.toFixed(2)}`;
    }
    
    //click a realizar compra
    btnRealizarCompra.addEventListener('click', () => {
        const loggedIn = localStorage.getItem('loggedIn');
        if (loggedIn === 'true') {
          // El usuario ha iniciado sesión, redirigir a la página de pago
          const url = '/pago/';
          window.location.href = url;
        } else {
          // El usuario no ha iniciado sesión, redirigir a la página de inicio de sesión
          alert('Debes iniciar sesión para continuar');
          const url = '/login/';
          window.location.href = url;
        }
      });

    // vaciar carrito
    // vaciar carrito
    vaciarCarritoBtn.addEventListener('click',()=>{
        articulosCarrito = [];
        vaciarCarrito();
        guardarCarritoEnLocalStorage();
        if(articulosCarrito.length>=1){
            btnsDiv.style = 'visibility: visible';
            document.querySelector('#carrito-vacio').style = 'visibility: hidden';
        }else{
            document.querySelector('#carrito-vacio').style = 'visibility: visible';
            btnsDiv.style = 'visibility: hidden';
        }
    });

    // Cargar carrito desde el localStorage al cargar la página
    document.addEventListener('DOMContentLoaded', () => {
        if (localStorage.getItem('carrito')) {
            articulosCarrito = JSON.parse(localStorage.getItem('carrito'));
            crearCursosHTML();
            if(articulosCarrito.length>=1){
                btnsDiv.style = 'visibility: visible';
                document.querySelector('#carrito-vacio').style = 'visibility: hidden';
            }else{
                document.querySelector('#carrito-vacio').style = 'visibility: visible';
                btnsDiv.style = 'visibility: hidden';
            }
        }
    });
    

}

//funciones



function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('btn-carrito')){
        const curso = e.target.parentElement.parentElement.parentElement;
        //console.log(curso);
        leerDatosCurso(curso);
    }
}

function leerDatosCurso(curso){
   
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        nombre: curso.querySelector('.nombre-text').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('.btn-carrito').getAttribute('data-id'),
        cantidad: 1
    }

    if(articulosCarrito.some(curso => curso.id === infoCurso.id)){

        const cursos = articulosCarrito.map(curso => {
            if(curso.id ===infoCurso.id){
                
                curso.cantidad ++;

                let num1 = Number(infoCurso.precio.slice(1));
                const total = num1*curso.cantidad
                curso.precio = '$'+total.toFixed(2);
                
                return curso;
            }else{
                return curso;
            }
            
        })      
        
        articulosCarrito = [...cursos];         
        // Calcular precio total
        calcularPrecioTotal();


    }else{ 
        
        articulosCarrito = [...articulosCarrito, infoCurso]
        
        // Calcular precio total
        calcularPrecioTotal();

    }
    //en el span seleccionado cambiar el valor
    calcularPrecioTotal();
    //al agregar un producto al carrito el btn vaciar carrito y realizar compras se cambia modo visible
    if(articulosCarrito.length >= 1){
        btnsDiv.style = 'visibility: visible';
        document.querySelector('#carrito-vacio').style = 'visibility: hidden';
        //console.log('si existe');
    }else{
        btnsDiv.style = 'visibility: hidden';
        //console.log('no existe');
    }      

    
    crearCursosHTML();
    guardarCarritoEnLocalStorage();
    
}


//crear HTML en carrito
function crearCursosHTML(){
    //limpiar carrito 
    vaciarCarrito();
    
    //creando HTML 
    articulosCarrito.forEach(curso=> {
        const row = document.createElement('tr');
        //row.style = 'class="px-5 md:px-10 mx-auto gap-2 md:gap-4"'
      row.innerHTML =`
         <td>
          <img src ="${curso.imagen}" class="mx-auto w-10 sm:w-12 md:w-20 h-8 sm:h-10 md:h-16">
          </td>
          <td class="text-center nombre-text text-sm sm:text-md md:text-lg lg:text-xl text-black font-normal tracking-tight dark:text-white">${curso.nombre}</td>
          <td class="precio text-center text-sm sm:text-md md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white">${curso.precio}</td>
          <td class="text-center text-black dark:text-zinc-100">${curso.cantidad}</td>
          <td>
           <a href="#" class="borrar-curso rounded-xl text-sm text-md text-black dark:text-white" data-id="${curso.id}">-</a>
            </td>
            <td>
            <a href="#" class="btn-carrito-2 sumar-curso rounded-xl text-sm md:text-md text-black dark:text-white" data-id="${curso.id}">+</a>
             </td>  
             
      `;
         contenedorCarrito.appendChild(row)

  })
  guardarCarritoEnLocalStorage();

  
}


//eliminar un curso del carrito
function eliminarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')
        const existe = articulosCarrito.some(curso=>curso.id ===cursoId);
        const precioCopia = document.querySelector('.precio span').textContent
        const precio = Number(precioCopia.slice(1));

        
        if(existe){
            const curso = articulosCarrito.map(curso=>{
                if(curso.id === cursoId){
                    if(curso.cantidad > 1){
                        curso.cantidad --;

                        curso.precio = 0;
                        const total =  precio*curso.cantidad;
                        curso.precio = '$'+total.toFixed(2);
                        
                        return curso;
                    }else{
                        articulosCarrito = articulosCarrito.filter(curso=>curso.id !==cursoId);
                        return curso;
                    }
                    
                }
            })
            // Calcular precio total
            calcularPrecioTotal();
        }
        
        //al no quedar ningun producto en el carrito se oculta el btn vaciar carrito y realizar compra
        if(articulosCarrito.length>=1){
            btnsDiv.style = 'visibility: visible';
            document.querySelector('#carrito-vacio').style = 'visibility: hidden';
            //console.log('si existe');
        }else{
            document.querySelector('#carrito-vacio').style = 'visibility: visible';
            btnsDiv.style = 'visibility: hidden';
            //console.log('no existe');
        }

        crearCursosHTML();
        
    }


}

//sumar un curso del carrito
    
function sumarCurso(e){
    e.preventDefault();
    
    if(e.target.classList.contains('sumar-curso')){
        const cursoId = e.target.getAttribute('data-id')
        const existe = articulosCarrito.filter(curso=>curso.id ===cursoId);
        const precioCopia = document.querySelector('.precio span').textContent
        const precio = Number(precioCopia.slice(1));
        
        if(existe){
            const curso = articulosCarrito.map(curso=>{
                if(curso.id ===cursoId){
                    if(curso.cantidad > 0){
                        curso.cantidad ++;

                        curso.precio = 0
                        const total = precio*curso.cantidad
                        curso.precio = '$'+total.toFixed(2);
                        
                        
                        return curso;
                    }else{
                        articulosCarrito = articulosCarrito.filter(curso=>curso.id !==cursoId);
                        return curso;
                    }
                    //sumar del arreglo del carrito el curso
                }
            })
            crearCursosHTML(curso);
            guardarCarritoEnLocalStorage();
            // Calcular precio total
            calcularPrecioTotal();

            //Actuliza precio en el html p al hacer click en el boton sumar
            btnPrecioTotal.textContent = '$' + precioTotal.toFixed(2);
        }
    }

}

//calculartotal
function calcularPrecioTotal(){
    precioTotal = 0;
    articulosCarrito.forEach(curso=>{
        const precio = Number(curso.precio.slice(1));
        precioTotal += precio;
    });
    // Guardar el precio total en el localStorage
    localStorage.setItem('precioTotal', precioTotal);
    //Cambiar html del p vacio por el precio total actualizado
    btnPrecioTotal.textContent = '$'+precioTotal.toFixed(2);
    
}

//limpiar carrito
function vaciarCarrito(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

    //si se le da click a vaciar carrito de oculta el btn
    if(articulosCarrito>=1){
        btnsDiv.style = 'visibility: visible';
        document.querySelector('#carrito-vacio').style = 'visibility: hidden';
        //console.log('si existe');
    }else if(articulosCarrito.length <=0){
        document.querySelector('#carrito-vacio').style = 'visibility: visible';
        btnsDiv.style = 'visibility: hidden';
        //console.log('no existe');
    }
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}
        

