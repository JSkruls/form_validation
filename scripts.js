const inputs = document.querySelectorAll('.validate'); 
const submit = document.querySelector('#submit');
const nameRegex = /^[a-zA-Z]+$/; //name and surname validation pattern
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; //email validation pattern
const phoneRegex = /^(\+)?(\d{3})?\d{8}$/; //phone validation pattern
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])[A-Za-z\d\W]{4,10}$/; //password validation pattern
const password = document.querySelector('input[name="password"]'); //password input
const confirmation = document.querySelector('input[name="confirm"]'); //password confirmation input
const passwordBars = document.querySelectorAll('.bar');
const eyeIcon = document.getElementById('togglePassword'); // Show/Hide password field input

// List of error msgs for each input type/name
const invalidityMessages = { 
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
    paintIcon(input);
  });
});

confirmation.addEventListener('input', (e) => {
  confirmation.setCustomValidity(''); // Reset validation error & invalidity state 
  if(!confirmation.checkValidity()) {
    confirmation.setCustomValidity(invalidityMessages['confirm']); // Set error message as per object
  } 
});

// Check validity and set error msgs on from submit
submit.addEventListener('click', (e) => {
  inputs.forEach((input) => {
    if(!input.checkValidity()) {
      input.setCustomValidity(invalidityMessages[input.name]); 
    }
  });
});

// Check validity and set error msg for confirmation field
submit.addEventListener('click', (e) => {
  confirmation.setCustomValidity('');
  if(!confirmation.checkValidity() && (confirmation.value !== password.value) ||
    confirmation.checkValidity() && (confirmation.value !== password.value)) {
    confirmation.setCustomValidity(invalidityMessages['confirm']);
    console.log('checking pass and confirm equality');
  }
});

// Avoid input validity styling on page load
// Make :valid/invalid styling apply on elements with .interacted class
inputs.forEach((input) => {
  input.addEventListener('focus', (e) => {
    input.classList.add('interacted');
    paintIcon(input);
  });
});

// Validity state colors for paintIcon() function
// Turning green into red uses object's value
// Going red into green uses object's key
const shapeColors = {
  'rgb(31, 52, 21)': 'rgb(52, 26, 21)',
  'rgb(141, 192, 116)': 'rgb(192, 129, 116)',
  'rgb(31, 52, 21)': 'rgb(52, 26, 21)',
  'rgb(141, 192, 116)': 'rgb(192, 129, 116)',
}

// Apply colors to icon of current input field
function paintIcon(input) { 
  let shapes = input.parentElement.children[0].childNodes; // Grab all children/shapes of svg 
  shapes = Array.from(shapes).filter(shape => shape.nodeType !== Node.TEXT_NODE); // Remove text nodes for .getAttribute() to work
  shapes.forEach(shape => { 
    let objectValue; 
    let objectKey;

    // If valid to invalid paint icon green to red
    if(Object.keys(shapeColors).some(key => { // Find which inline rgb() value matches object's key 
      objectKey = key; // Store inline rgb() value to be changed
      return shape.getAttribute('style').includes(key) && !input.checkValidity(); 
    })) { 
      shape.setAttribute("style", // Change inline color for one inside object
        shape.getAttribute("style").replace(/rgb\(\s*\d+,\s*\d+,\s*\d+\s*\)/, 
        shapeColors[objectKey]));
      }

    // If invalid to valid paint icon red to green
    if(Object.values(shapeColors).some(value => { // Find which inline rgb() value matches object's value 
      objectValue = value; // Store inline rgb() value to be changed
      return shape.getAttribute('style').includes(value) && input.checkValidity(); 
    })) { 
      objectKey = Object.entries(shapeColors).find(([key, value]) => value === objectValue)[0]; // Find which key matches object's value
      shape.setAttribute("style", // Change inline color for one inside object
        shape.getAttribute("style").replace(/rgb\(\s*\d+,\s*\d+,\s*\d+\s*\)/, 
        objectKey));
      }
  });
}

// Show progress bars on input 'focus'
password.addEventListener('focus', (e) => { 
  passwordBars.forEach((bar) => {
    bar.style.visibility = 'visible';
  });
});

// Hide progress bars on input 'blur'
password.addEventListener('blur', (e) => { 
  passwordBars.forEach((bar) => {
    bar.style.visibility = 'hidden';
  });
});

// Color bars inside password field based on regex patterns passed
function paintPasswordBars(password) { 
  const regexArray = ['[a-z]','[A-Z]','[0-9]','[!@#$%^&*()]'];
  const passwordColors = [
    'rgba(147, 147, 147, 1)',
    'rgba(200, 25, 25, 1)',
    'rgba(255, 172, 29, 1)',
    'rgba(231, 229, 21, 1)',
    'rgba(113, 183, 46, 1)'
  ]
  let colorIndex = 0; // Define the color for painted password bars

  // Update password strength(colorIndex) on each input
  regexArray.forEach(pattern => { 
    if(new RegExp(pattern).test(password)) {
        colorIndex++; 
      }
  });

  // Grey out all password bars when backspacing password
  // Must stay above for loop to work properly
  passwordBars.forEach((bar) => { // just use passwordBars; hide bars instead of progress; delete progress querySelector
    bar.style.background = 'rgba(147, 147, 147, 1)';
  });

  // Re-paint the number of bars equal to password strength(colorIndex)
  for(i = 0; i < colorIndex; i++) {
    passwordBars.item(i).style.backgroundColor = passwordColors[colorIndex];
  }
}

// Reveal / hide password field input
eyeIcon.addEventListener('click', (e) => {
  if(password.type === 'password') {
     password.type = 'text';
     confirmation.type = 'text';
     eyeIcon.classList.remove('fa-eye-slash');
     eyeIcon.classList.add('fa-eye');
  }
  else if (password.type === 'text') {
    password.type = 'password';
    confirmation.type = 'password';
    eyeIcon.classList.remove('fa-eye');
    eyeIcon.classList.add('fa-eye-slash');
  }
});

// Apply icon colors to confirmation on mismatch with password
document.body.addEventListener('input', handleEvent);
  function handleEvent(event) {
  if(event.target.id === 'confirm' || event.target.id === 'password') {
  // Paint invalid if entering confirmation input before password(empty)
  if(confirmation.value !== password.value && !password.value) {
    confirmation.classList.remove('valid');
    confirmation.classList.add('invalid');
  }
  // Paint invalid if confirmation doesn't match password(filled)
  else if(confirmation.value !== password.value && password.value) {
    confirmation.classList.remove('valid');
    confirmation.classList.add('invalid');
  }
  // Paint valid if confirmation matches password(filled)
  else if(confirmation.value === password.value && password.value) {
    confirmation.classList.remove('invalid');
    confirmation.classList.add('valid');
  }

  let shapes = confirmation.parentElement.children[0].childNodes; 
  shapes = Array.from(shapes).filter(shape => shape.nodeType !== Node.TEXT_NODE);
  shapes.forEach(shape => { 
    let objectValue; 
    let objectKey;
    
    // If valid to invalid paint icon green to red 
    if((Object.keys(shapeColors).some(key => { // Find which inline rgb() value matches object's key 
      objectKey = key; // Store inline rgb() value to be changed
      return shape.getAttribute('style').includes(key); 
    })) && confirmation.value !== password.value) { 
      shape.setAttribute("style", // Change inline color for one inside object
        shape.getAttribute("style").replace(/rgb\(\s*\d+,\s*\d+,\s*\d+\s*\)/, 
        shapeColors[objectKey]));
    }

    // If invalid to valid paint icon red to green 
    if((Object.values(shapeColors).some(value => { // Find which inline rgb() value matches object's value 
      objectValue = value; // Store inline rgb() value to be changed
      return shape.getAttribute('style').includes(value) ; 
    })) && confirmation.value === password.value && password.value) { 
      objectKey = Object.entries(shapeColors).find(([key, value]) => value === objectValue)[0]; // Find which key matches object's value
      shape.setAttribute("style", // Change inline color for one inside object
        shape.getAttribute("style").replace(/rgb\(\s*\d+,\s*\d+,\s*\d+\s*\)/, 
        objectKey));
    }
  });
  }
};

// Apply icon colors to confirmation on focus
confirmation.addEventListener('focus', (e) => {
  confirmation.classList.add('invalid'); // Add invalid border and exclamation icon
  // Override with valid styling when password is valid and both equal
  if(password.value === confirmation.value && password.checkValidity()) { 
    confirmation.classList.remove('invalid');
    confirmation.classList.add('valid');
  }

  // Paint invalid styling to the left icon
  let shapes = confirmation.parentElement.children[0].childNodes; 
  shapes = Array.from(shapes).filter(shape => shape.nodeType !== Node.TEXT_NODE);
  shapes.forEach(shape => { 
    let objectValue; 
    let objectKey;
    
    // If valid to invalid paint icon green to red 
    if((Object.keys(shapeColors).some(key => { // Find which inline rgb() value matches object's key 
      objectKey = key; // Store inline rgb() value to be changed
      return shape.getAttribute('style').includes(key); 
    })) && confirmation.value === password.value && !password.checkValidity()) { // Turn red when both are empty or don't pass validation
      shape.setAttribute("style", // Change inline color for one inside object
        shape.getAttribute("style").replace(/rgb\(\s*\d+,\s*\d+,\s*\d+\s*\)/, 
        shapeColors[objectKey]));
    }
  });
});


// Add password hint (with timeout?)
// Re-work email regex pattern
// What i've learned : adding one eventlistener to multiple elements; adding multiple event listeners to multiple elements
