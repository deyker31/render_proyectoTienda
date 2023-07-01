//selectores
const formL=document.querySelector('#form-login');

const emailInputLogin=document.querySelector('#email-login');
const passwordInputLogin=document.querySelector('#password-login');
const botonUsuario = document.querySelector('.ul-usuario-1');

formL.addEventListener('submit', e => {
    e.preventDefault();

    const urlRender = 'https://capstyle.onrender.com/api/login';
    const urlLocalHost = 'http://localhost:3001/api/login';

    const email = emailInputLogin.value;
    const password = passwordInputLogin.value;
    let loginUser = {
      email: email,
      password: password
  };

  if(loginUser){
    fetch(urlRender, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginUser),
    })
    .then(response => response.json())
    .then(data => {
      if(data.message === 'Sesión Admin'){

        // admin y redireccion
        alert('Has iniciado sesion con rol de admin 👨‍🎓');
        window.location.href = '/admin_productos';

      }else if (data.message === 'Sesión Usuario') {
            // Iniciar sesión exitosamente
            alert('Has iniciado sesion correctamente 🙎‍♂️');
            // Almacenar el estado de inicio de sesión en localStorage
            localStorage.setItem('loggedIn', 'true');
            // Redirigir a la página de perfil o a otra página de tu aplicación
            window.location.href = '/'
        } else {
            alert('Correo electrónico o contraseña incorrecta ❌');
        }
    })
    .catch((error) => {
        // manejar el error
        console.error('Error:', error);
        alert('Ocurrió un error al intentar iniciar sesión');
    });
  }
  
  });   



function checkLoggedInStatus() {
    const loggedIn = localStorage.getItem('loggedIn');
    const contenedor = document.getElementById('register-menu');
    var primerElemento = contenedor.children[0];

    if (loggedIn === 'true') {
        
        //
        
         // Mostrar el botón de menú desplegable
        document.getElementById('register-button').style.display = 'inline-block';
        document.querySelector('.img-usuario-circulo').style.display = 'inline-block';
        const li = document.createElement('li');
        li.innerHTML = `
        <p class="text-center text-sm mx-1  font-bold">Bienvenido/a !</p>
        `;
        contenedor.insertBefore(li, primerElemento.nextSibling); 
        
        // Agregar un evento de clic al enlace de cierre de sesión
        document.getElementById('logout-link').addEventListener('click', () => {
        // Eliminar el estado de inicio de sesión de localStorage
        localStorage.removeItem('loggedIn');
        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = '/login'; 
    }); 
    }else{
        document.getElementById('register-button').style.display = 'inline-block'
        contenedor.style.display = 'none'
    } 
  
}
  
window.addEventListener('load', () => {
    checkLoggedInStatus();
  });


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
}


