//selectores
const formL=document.querySelector('#form-login');

const emailInputLogin=document.querySelector('#email-login');
const passwordInputLogin=document.querySelector('#password-login');
const botonUsuario = document.querySelector('.ul-usuario-1');

formL.addEventListener('submit', e => {
    e.preventDefault();
    const email = emailInputLogin.value;
    const password = passwordInputLogin.value;
    const url = 'http://localhost:3000/users';
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const user = data.find(user => user.email === email && user.password === password);
        if (user) {
          if (email === 'admin@admin.com' && password === 'admin123') {
            // admin y redireccion
            alert('Has iniciado sesion con rol de admin 👨‍🎓');
            window.location.href = '/admin_productos';
          }else{
          // Iniciar sesión exitosamente
          alert('Has iniciado sesion correctamente 🙎‍♂️');
          // Almacenar el estado de inicio de sesión en localStorage
            localStorage.setItem('loggedIn', 'true');
          // Redirigir a la página de perfil o a otra página de tu aplicación
          window.location.href = '/'; }

        } else {
          // Mostrar un mensaje de error al usuario
          alert('Correo electrónico o contraseña incorrectos');
        }
      });
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


