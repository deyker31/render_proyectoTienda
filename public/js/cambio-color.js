const toggleButton = document.getElementById('dark-mode-toggle');

toggleButton.addEventListener('click', () => {
  const moonIcon = toggleButton.querySelector('.fa-moon');
  const sunIcon = toggleButton.querySelector('.fa-sun');
  const body = document.body;

  if (moonIcon.classList.contains('hidden')) {
    moonIcon.classList.remove('hidden');
    sunIcon.classList.add('hidden');
    body.classList.remove('dark');
    localStorage.setItem('darkMode', 'off');
  } else {
    moonIcon.classList.add('hidden');
    sunIcon.classList.remove('hidden');
    body.classList.add('dark');
    localStorage.setItem('darkMode', 'on');
  }
});

// Verificar el estado del modo oscuro al cargar la página
const darkMode = localStorage.getItem('darkMode');
if (darkMode === 'on') {
  const moonIcon = toggleButton.querySelector('.fa-moon');
  const sunIcon = toggleButton.querySelector('.fa-sun');
  const body = document.body;
  moonIcon.classList.add('hidden');
  sunIcon.classList.remove('hidden');
  body.classList.add('dark');
} else {
  localStorage.setItem('darkMode', 'off');
}