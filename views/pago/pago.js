//Selectores
//selectores productos

 const url = 'https://capstyle.onrender.com/paypal/create-order' // url produccion
 //const url = 'http://localhost:3001/paypal/create-order' // url desarrollo

const carrito = JSON.parse(localStorage.getItem('carrito'));
const precioTotal2 = JSON.parse(localStorage.getItem('precioTotal'));
const btnPrecioTotal2 = document.querySelector(".total-pago");
const contenedor = document.getElementById('contenedor-pago-productos');
const verificarPagoCancelado = JSON.parse(localStorage.getItem('pagoCancelado'));


document.addEventListener('DOMContentLoaded', (e)=>{
  e.preventDefault();
    //cargar precio a bd
    cargarPrecioBd();
    //metodo de pago
    metodoDePago();
    //mostrar productos extraidos del localstorage
    mostrarProductos(carrito);
    //Mostrar precio total de localstorage
    btnPrecioTotal2.textContent = '$'+precioTotal2.toFixed(2);
    cancelarPagoAlerta()
    
})

//funciones
function mostrarProductos(curso){
    
    curso.forEach(curso => {
        const tr= document.createElement('tr');
        tr.classList.add('dark:text-white','td-carrito')
        tr.innerHTML = `
            <td class="text-center px-0 md:px-2"><img src="${curso.imagen}" class="mx-auto w-7 sm:w-14 md:w-16 h-7 sm:h-14 md:h-16" alt="${curso.nombre}"></td>
            <td class="text-center font-bold text-blue-600 dark:text-blue-500">${curso.nombre}</td>
            <td class="font-bold text-center px-0 sm:px-3 md:px-5">${curso.precio}</td>
            <td class="text-center">${curso.cantidad}</td>
        `
        contenedor.appendChild(tr);
        
    });
}

function metodoDePago(){
    const botonPaypal = document.querySelector('#paypal-button');


    botonPaypal.addEventListener('click', async (e)=>{
        e.preventDefault();
        const respuesta = await fetch(url,{
            method:'POST',
        })
        const data = await respuesta.json();
        console.log(data)
        window.location.href = data.links[1].href
    })
    

}

//al cargar la pagina pago o reiniciarla enviar datos de precio a la bd


function cargarPrecioBd(){
window.addEventListener("load", async function() {
  
  //AQUI VA EL PRECIO TOTAL
  const id = 1
  fetch(`https://capstyle.onrender.com/apiServer/registros/${id}`, {
  method: 'PATCH',  
  body: JSON.stringify({ precioTotal2 }),  
  headers: {
    'Content-Type': 'application/json'
  }
  })

});  
}

 //
 function cancelarPagoAlerta(){
 if(verificarPagoCancelado === true){
  
  const alertaCancelarPago = document.getElementById('alert-cancel');
  alertaCancelarPago.classList.remove('invisible'); 
  setTimeout(function() {
    alertaCancelarPago.classList.add('invisible'); 
  }, 1500);
  
  //alert('Pago Cancelado');
  
  let prueba = false
  const verificarPagoCancelado = localStorage.setItem('pagoCancelado',prueba);
}

}