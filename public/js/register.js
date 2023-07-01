//console.log('prueba');

(function (){

const formulario = document.getElementById('form-register');
const nameInput = document.querySelector('#name-input');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const btnRegistro = document.getElementById('form-btn');
const btnPolitica = document.getElementById('btn-politica');

//Validamos

//vaidacion con regex 

const emailVal = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
const passwordVal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

let valname = false;
let valpass = false;
let valemail = false;
let valPolitica = false;


btnPolitica.addEventListener('input',e=>{
    valPolitica = e.target.checked
    extra = e.target.value
    validar(btnPolitica,valPolitica, extra);
})

nameInput.addEventListener('input', e => {
    console.log(e.target.value);

    valname = e.target.value;

    if(valname === ''){
        nameInput.classList.remove('outline-red-700','outline-4','outline');
        nameInput.classList.remove('outline-green-700','outline-4','outline');
        nameInput.classList.add('focus:outline-blue-600');
        
        
    }else{
        nameInput.classList.remove('focus:outline-blue-600');
        nameInput.classList.add('outline-green-700','outline-4','outline');
    }


})

emailInput.addEventListener('input', e => {
    console.log(e.target.value);

    valemail = emailVal.test(e.target.value);
    console.log(valemail)
    validar(emailInput, valemail);

})

passwordInput.addEventListener('input', e=> {
    //console.log(e.target.value);

    valpass = passwordVal.test(e.target.value);
    validar(passwordInput, valpass); 
    
})

//Formulario y envio de correo a base de datos
formulario.addEventListener('submit',e =>{
    e.preventDefault();
    
    const urlRender = 'https://capstyle.onrender.com/api/users';
    const urlLocalHost = 'http://localhost:3001/api/users';

    const newUser = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    }


if(nameInput.value === '' && emailInput.value === '' && passwordInput.value === ''){
    //para ver si hay algun campo vacio
    mostrarAlerta('Campos Vacios');
 }else{
    
    // Envía los datos al servidor
    fetch(urlRender, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    })
    .then(response => response.json())
    .then(data => {
        // manejar la respuesta exitosa
        console.log('Success:', data);
         //para crear la cuenta
         alert('Cuenta creada exitosamente✅');
         //resetear la web
         window.location.href = '/register';
    })
    .catch((error) => {
        // manejar el error
        console.error('Error:', error);
       //Ya existe la cuenta
       mostrarAlerta('Esta cuenta ya existe');
        nameInput.value = '';
        nameInput.classList.remove('outline-green-700', 'outline-4', 'outline');
        emailInput.value = '';
        emailInput.classList.remove('outline-green-700', 'outline-4', 'outline');
        passwordInput.value = '';
        passwordInput.classList.remove('outline-green-700', 'outline-4', 'outline');
    });

}

    //quedamos AQUIIIII
         
})

//mensaje de campos vacios
function mostrarAlerta(mensaje) {
    const contenedorAlerta = document.querySelector('#alerta-error');
    const alerta = document.querySelector('bg-red-100');
    if (!alerta) {
        
        const alerta = document.createElement('p');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center');
        alerta.innerHTML = `
        <strong class = "font-bold text-xl">Error:</strong>
        <span class="block sm:inline text-xl">${mensaje}</span>
        `;
        contenedorAlerta.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 1500);
    }
} // fin del formulario mas envio de datos a la base de datos


const validar = (input,val, extra) => {

    btnRegistro.disabled = valname && valemail && valpass && valPolitica ? false : true;
    
    if(input.value === ''){

        input.classList.remove('outline-green-700', 'outline-4', 'outline');
        input.classList.remove('outline-red-700', 'outline-4', 'outline');
        input.classList.remove('outline-black');

    }else if(val){

        if(val = extra){
            //console.log('Politicas seleccionadas');
        }else{
            input.classList.remove('outline-red-700', 'outline-4', 'outline');
            input.classList.add('outline-green-700', 'outline-4', 'outline');
        }

    }else{
        input.classList.remove('outline-green-700', 'outline-4', 'outline');
        input.classList.add('outline-red-700', 'outline-4', 'outline');
    }

} 

})();
