const inputs = document.querySelectorAll('input'); //node list of inputs
const submit = document.querySelector('#submit'); //create account button
const nameRegex = /^[a-zA-Z]+$/; //name and surname validation pattern
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; //email validation pattern
const phoneRegex = /^(\+)?(\d{3})?\d{8}$/; //phone validation pattern
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])[A-Za-z\d\W]{6,15}$/; //password validation pattern

const invalidityMessages = { // List of error msgs for each input type/name
  first_name: 'Enter your first name',
  surname: 'Enter your last name',
  email: 'Provide your email',
  phone: 'Provide your phone number',
  password: 'Create your password',
  confirm: 'Repeat the password',
  terms: 'Agree to terms to proceed',
}

// Check validity and set error msgs on each input
inputs.forEach((input) => {
  input.addEventListener('input', (e) => {
    input.setCustomValidity(''); // Reset validation error & invalidity state 
    if(!input.checkValidity()) {
      input.setCustomValidity(invalidityMessages[input.name]); // Set error message as per object
    }
  });
});

// Check validity and set error msgs on from submit
submit.addEventListener('click', (e) => {
  inputs.forEach((input) => {
    if(!input.checkValidity()) {
      input.setCustomValidity(invalidityMessages[input.name]); 
    }
  });
});
