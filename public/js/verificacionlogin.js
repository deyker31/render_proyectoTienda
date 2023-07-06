function checkLogged() {
    const loggedIn = localStorage.getItem('loggedIn');
    const contenedor = document.getElementById('register-menu');
    var primerElemento = contenedor.children[0];
    const bloque = document.querySelector('#membresia');
    if (loggedIn === 'true') {
      // El usuario ha iniciado sesión
      // Agrega aquí el código que necesites para mostrar la sesión iniciada
      document.getElementById('register-button').style.display = 'inline-block';
      contenedor.classList.add('hidden');
      document.querySelector('.img-usuario-circulo').style.display = 'inline-block';
      if(bloque){
        bloque.style.display = "none";
      }
      const li = document.createElement('li');
      li.innerHTML = `
        <p class="text-center text-sm mx-1 font-bold">Bienvenido/a !</p>
      `;
      contenedor.insertBefore(li, primerElemento.nextSibling);
      document.getElementById('logout-link').addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        window.location.href = '/login';
      });
    } else {
      // El usuario no ha iniciado sesión
      //Código para mostrar la página de inicio de sesión
      document.getElementById('register-button').style.display = 'inline-block'
      contenedor.style.display = 'none'
    }
  }