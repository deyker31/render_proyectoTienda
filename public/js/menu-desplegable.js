const menuBtn = document.querySelector('.menu-btn');
const menuBtn2 = document.querySelector('.menu-btn-2');
const dropdown = document.querySelector('#dropdown');
menuBtn.addEventListener('click', () => {
  dropdown.classList.remove('hidden');
  dropdown.classList.add('md:hidden');
  menuBtn.classList.add('hidden');
  menuBtn2.classList.remove('hidden');
  document.querySelector('nav').classList.add('cambio-1');
  document.querySelector('main').classList.add('cambio-2');
  document.querySelector('footer').classList.add('cambio-2');
}) 
menuBtn2.addEventListener('click', () => {
    dropdown.classList.add('hidden');
    menuBtn2.classList.add('hidden');
    menuBtn.classList.remove('hidden');
    menuBtn.classList.add('md:hidden');
    document.querySelector('nav').classList.remove('cambio-1');
    document.querySelector('main').classList.remove('cambio-2');
    document.querySelector('footer').classList.remove('cambio-2');
}) 