//selectores
const verificarPagoExitoso = JSON.parse(localStorage.getItem('pagoExitoso'));
const alertaCancelarPago = document.getElementById('alerta-pagoexitoso');
//Evento DOM
document.addEventListener('DOMContentLoaded',()=>{
    pagoExitosoAlerta();
})

function pagoExitosoAlerta(){
    if(verificarPagoExitoso === true){
        localStorage.removeItem('carrito');//vaciar carrio una vez completado el pago
     alertaCancelarPago.classList.remove('invisible'); 
     setTimeout(function() {
       alertaCancelarPago.classList.add('invisible'); 
     }, 2000);
     
     //alert('Pago Cancelado');
     
     let prueba2 = false
     const verificarPagoExitoso = localStorage.setItem('pagoExitoso',prueba2);
   }
   
   }