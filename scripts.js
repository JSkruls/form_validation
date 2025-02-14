const inputs = document.querySelectorAll('input'); //select all <input> elements storing them in a NodeList
const submitBtn = document.querySelector('#submit'); 
const nameRegex = /^[a-zA-Z]+$/; //name and surname validation pattern
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; //email validation pattern
const phoneRegex = /^(\+)?(\d{3})?\d{8}$/; //phone validation pattern
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])[A-Za-z\d\W]{6,15}$/; //password validation pattern
let checkBox = document.querySelector('#terms');

checkBox.addEventListener('click', (e) => {
  checkBox.setCustomValidity('');
});



inputs.forEach((input) => {
  input.addEventListener('input', (e) => { //on every input character entry 
    switch(input.name) {
      case 'first_name': //check input type against its respective validation pattern
        if(!nameRegex.test(input.value) || input.value.length > 20) { //on validation failure
          input.classList.remove('valid'); //remove pre-existing valid styling
          input.classList.add('invalid'); //and apply invalid styling
          input.setCustomValidity('Fill in your name');
        } 
        else { //if validation is passed
          input.classList.remove('invalid'); //remove invalid styling when error is corrected
          input.classList.add('valid'); //and apply valid styling
          input.setCustomValidity('');
        } 
        break;

      case 'surname': 
        if(!nameRegex.test(input.value) || input.value.length > 20) { 
          input.classList.remove('valid');
          input.classList.add('invalid');
          input.setCustomValidity('Fill in your surname');
        } 
        else { 
          input.classList.remove('invalid');
          input.classList.add('valid');
          input.setCustomValidity('');
        }
        break;
      
      case 'email': 
        if(!emailRegex.test(input.value) || input.value.length > 30) { 
          input.classList.remove('valid');
          input.classList.add('invalid');
          input.setCustomValidity('Provide your email address');
        } 
        else { 
          input.classList.remove('invalid');
          input.classList.add('valid');
          input.setCustomValidity('');
        }
        break;

      case 'phone': 
        if(!phoneRegex.test(input.value)) { 
          input.classList.remove('valid');
          input.classList.add('invalid');
          input.setCustomValidity('Leave us your phone number');
        } 
        else { 
          input.classList.remove('invalid');
          input.classList.add('valid');
          input.setCustomValidity('');
        }
        break;

      case 'password':
        if(!passwordRegex.test(input.value)) { 
          input.classList.remove('valid');
          input.classList.add('invalid');
          input.setCustomValidity('Must contain small letters, capitals, numbers and symbols');
        } 
        else { 
          input.classList.remove('invalid');
          input.classList.add('valid');
          input.setCustomValidity('');
        }
        break;
        
      case 'terms':
        if(input.checked) { 
          input.classList.remove('invalid');
          input.classList.add('valid');
        } 
        else if (!input.checked){ 
          input.classList.remove('valid');
          input.classList.add('invalid');
        }
        break;
    }
  });
});
checkBox.setCustomValidity('');
window.addEventListener('load', (e) => {
  inputs.forEach((input) => {
    if(input.value === '' || !input.classList.contains('valid')) {
      switch(input.name) { // should all of this be inside submit click handler?
        case 'first_name': 
          input.setCustomValidity('Fill in your name');
          break;
  
        case 'surname': 
          input.setCustomValidity('Fill in your surname');
          break;
  
        case 'email': 
          input.setCustomValidity('Provide your email address');
          break;
  
        case 'phone': 
          input.setCustomValidity('Leave us your phone number');
          break;
  
        case 'password':
          input.setCustomValidity('Must contain small letters, capitals, numbers and symbols');
          break;
      }
    }
  });
});

submitBtn.addEventListener('click', (e) => { //on 'create account' button click
  checkBox.setCustomValidity('You must agree to our terms of service');
  inputs.forEach((input) => { 
    let children = input.parentElement.children[0].childNodes;
    children.forEach(child => { //loops through NodeList: <circle>; <line>; <path> etc.
      if (child.nodeType !== Node.TEXT_NODE) { //if child isn't a text node and contains fill or stroke color, changes it to opposite
        if(!input.classList.contains('valid') && child.getAttribute('style').includes('fill: rgb(31, 52, 21);')) { //if has dark green fill
            child.style.fill = 'rgb(52, 26, 21)'; // change to dark red
        }
        if(!input.classList.contains('valid') && child.getAttribute('style').includes('fill: rgb(141, 192, 116);')) { // if has light-green fill
            child.style.fill = 'rgb(192, 129, 116)'; //change to light red
        }
        if(!input.classList.contains('valid') && child.getAttribute('style').includes('stroke: rgb(31, 52, 21);')) { // if has dark-green fill
            child.style.stroke = 'rgb(52, 26, 21)'; // change to dark red
        }
        if(!input.classList.contains('valid') && child.getAttribute('style').includes('stroke: rgb(141, 192, 116);')) { // if has light-green fill
            child.style.stroke = 'rgb(192, 129, 116)'; //change to light red
        }
      }
    }); // hoist and delete from here!
    if(!input.classList.contains('valid') || input.value === '') { //check if no input is left empty or invalid
      input.classList.add('invalid'); //turn unfilled inputs invalid
    }; 
  });
});



inputs.forEach((input) => { //loops through <input>s attaching 'input' event listeners
  input.addEventListener('input', (e) => { //on every input
    if(input.classList.contains('valid')) { //checks if <input> field is valid against regex pattern
     let children = input.parentElement.children[0].childNodes; // !hoist this upward! //accesses NodeList of children of inputs upper sibling <svg>, skips <xml because it's a declaration
/*f1*/  children.forEach(child => { //loops through NodeList: <circle>; <line>; <path> etc.
        if (child.nodeType !== Node.TEXT_NODE) { //if child isn't a text node and contains fill or stroke color, changes it to opposite
          if(child.getAttribute('style').includes('fill: rgb(52, 26, 21);')) { //if fill is dark red
            child.style.fill = 'rgb(31, 52, 21)'; //change to dark green
          }
          if(child.getAttribute('style').includes('fill: rgb(192, 129, 116);')) { //if fill is light red 
            child.style.fill = 'rgb(141, 192, 116)'; //change to light green
          }
          if(child.getAttribute('style').includes('stroke: rgb(52, 26, 21);')) { //if stroke is dark red 
            child.style.stroke = 'rgb(31, 52, 21)'; //change to dark green
          }
          if(child.getAttribute('style').includes('stroke: rgb(192, 129, 116);')) { //if stroke is light red 
            child.style.stroke = 'rgb(141, 192, 116)'; //change to light green
/* */     }
        }
      });
    } else if (!input.classList.contains('valid')) { //checks if <input> field is valid against regex pattern
        let children = input.parentElement.children[0].childNodes; // !delete after hoisting! //accesses NodeList of children of inputs upper sibling <svg>, skips <xml because it's a declaration
/*f2*/    children.forEach(child => { //loops through NodeList: <circle>; <line>; <path> etc.
          if (child.nodeType !== Node.TEXT_NODE) { //if child isn't a text node and contains fill or stroke color, changes it to opposite
            if(child.getAttribute('style').includes('fill: rgb(31, 52, 21);')) { //if has dark green fill
                child.style.fill = 'rgb(52, 26, 21)'; // change to dark red
            }
            if(child.getAttribute('style').includes('fill: rgb(141, 192, 116);')) { // if has light-green fill
                child.style.fill = 'rgb(192, 129, 116)'; //change to light red
            }
            if(child.getAttribute('style').includes('stroke: rgb(31, 52, 21);')) { // if has dark-green fill
                child.style.stroke = 'rgb(52, 26, 21)'; // change to dark red
            }
            if(child.getAttribute('style').includes('stroke: rgb(141, 192, 116);')) { // if has light-green fill
                child.style.stroke = 'rgb(192, 129, 116)'; //change to light red
/* */       }
          }
        });
    }
  });
});