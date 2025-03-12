const inputs = document.querySelectorAll('input'); 
const submit = document.querySelector('#submit');
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
      paintIconRed(input); // Apply invalid icon coloring
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

// Avoid input validity styling on page load
// Make :valid/invalid styling apply on elements with .interacted class
inputs.forEach((input) => {
  input.addEventListener('focus', (e) => {
    input.classList.add('interacted');
  });
});

//Add 'red' keys to object to switch from red back to green
//Possible will need separate function for styleIconGreen
const shapeColors = {
  'fill: rgb(31, 52, 21)': 'rgb(52, 26, 21)',
  'fill: rgb(141, 192, 116)': 'rgb(192, 129, 116)',
  'stroke: rgb(31, 52, 21)': 'rgb(52, 26, 21)',
  'stroke: rgb(141, 192, 116)': 'rgb(192, 129, 116)',
}

// Apply invalid colors to icon of current input field 
// Works if svg child has either 'stroke' or 'fill', not both
function paintIconRed(input) { 
  let shapes = input.parentElement.children[0].childNodes; // Grab all children/shapes of svg 
  shapes = Array.from(shapes).filter(shape => shape.nodeType !== Node.TEXT_NODE); // Remove text nodes for .getAttribute() to work
  shapes.forEach(shape => { 
    let objectKey; 
    if(Object.keys(shapeColors).some(key => { // Find and store object key matching inline css property 
      objectKey = key; 
      return shape.getAttribute('style').includes(key); 
    })) { 
      objectKey.includes('fill') ? // Change color of css prop found in style attribute
        shape.style.fill = shapeColors[objectKey]: 
        shape.style.stroke = shapeColors[objectKey]; 
      }
  });
}



