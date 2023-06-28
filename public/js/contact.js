const emailInput = document.querySelector('input[name="floating_email"]');
const directionInput = document.querySelector('input[name="repeat_direction"]');
const firstNameInput = document.querySelector('input[name="floating_first_name"]');
const lastNameInput = document.querySelector('input[name="floating_last_name"]');
const phoneInput = document.querySelector('input[name="floating_phone"]');
const mensajeInput = document.querySelector('textarea[name="floating_mensaje"]');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const directionRegex = /^[a-zA-Z0-9\s,'-]*$/;
const nameRegex = /^[a-zA-Z\s]*$/;
const phone = /^\d{3}-\d{3}-\d{4}$/;

const validateInput = (input, regex) => {
  if (regex.test(input.value)) {
    input.style.borderColor = 'green';
  }else if(input === '') {
    input.style.borderColor = '';
  }else {
    input.style.borderColor = 'red';
  }
};

emailInput.addEventListener('input', () => {
  validateInput(emailInput, emailRegex);
});

directionInput.addEventListener('input', () => {
  validateInput(directionInput, directionRegex);
});

firstNameInput.addEventListener('input', () => {
  validateInput(firstNameInput, nameRegex);
});

lastNameInput.addEventListener('input', () => {
  validateInput(lastNameInput, nameRegex);
});

phoneInput.addEventListener('input', () => {
  validateInput(phoneInput, phoneRegex);
});

mensajeInput.addEventListener('input', () => {
  if (mensajeInput.value.trim() !== '') {
    mensajeInput.style.borderColor = 'green';
  } else {
    mensajeInput.style.borderColor = 'red';
  }
});
