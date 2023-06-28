//Selectores
//selectores productos
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
        tr.classList.add('dark:text-white')
        tr.innerHTML = `
            <td class="text-center px-2"><img src="${curso.imagen}" class="mx-auto" alt="${curso.nombre}" width="60" height="60"/></td>
            <td class="text-lg text-center font-bold text-blue-600 dark:text-blue-500">${curso.nombre}</td>
            <td class="text-lg font-bold text-center px-5">${curso.precio}</td>
           <td class="text-lg text-center">${curso.cantidad}</td>
        `
        contenedor.appendChild(tr);
        
    });
}

function metodoDePago(){
    const botonPaypal = document.querySelector('#paypal-button');
    
    botonPaypal.addEventListener('click', async (e)=>{
        e.preventDefault();
        const respuesta = await fetch('http://localhost:3005/create-order',{
            method:'POST',
        })
        const data = await respuesta.json();
        //console.log(data)
        window.location.href = data.links[1].href
    })
    

}

//al cargar la pagina pago o reiniciarla enviar datos de precio a la bd


function cargarPrecioBd(){
window.addEventListener("load", async function() {
    const url = 'http://localhost:3000/registros/1';
    let objeto = {
      id: 1,
      precio: precioTotal2.toFixed(2)
    };
  
    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ precio: objeto.precio })
      });
  
      const data = await res.json();
      if (objeto.precio !== data.precio) {
        objeto.precio = data.precio;
        await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ precio: objeto.precio })
        });
      }
    } catch (error) {
      console.log(error);
    }
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