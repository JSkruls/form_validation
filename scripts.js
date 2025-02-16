const inputs = document.querySelectorAll('input'); //select all <input> elements storing them in a NodeList
const submitBtn = document.querySelector('#submit'); 
const nameRegex = /^[a-zA-Z]+$/; //name and surname validation pattern
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; //email validation pattern
const phoneRegex = /^(\+)?(\d{3})?\d{8}$/; //phone validation pattern
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])[A-Za-z\d\W]{6,15}$/; //password validation pattern
const checkBox = document.querySelector('#terms'); // input checkbox
let firstPassword = document.querySelector('input[name="password"]'); //probably have to make them global variables
let secondPassword = document.querySelector('input[name="confirm"]');

checkBox.addEventListener('click', (e) => { //when valid/checked display no validation message
  checkBox.setCustomValidity('');
});

inputs.forEach((input) => {
  input.addEventListener('input', (e) => { //on every input character entry 
    switch(input.name) { //[f] turn into a function; re-write it shorter (with object?)
      case 'first_name': //[check input type against its respective validation pattern]
        if(!nameRegex.test(input.value)) { //on validation failure
          input.classList.remove('valid'); //remove pre-existing valid styling
          input.classList.add('invalid'); //and apply invalid styling
        } 
        else { //if validation is passed
          input.classList.remove('invalid'); //remove invalid styling when error is corrected
          input.classList.add('valid'); //and apply valid styling
          input.setCustomValidity(''); 
        } 
        break;

      case 'surname': 
        if(!nameRegex.test(input.value)) {  
          input.classList.remove('valid');
          input.classList.add('invalid');
        } 
        else { 
          input.classList.remove('invalid');
          input.classList.add('valid');
          input.setCustomValidity(''); 
        }
        break;
      
      case 'email': 
        if(!emailRegex.test(input.value)) { 
          input.classList.remove('valid');
          input.classList.add('invalid');
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
        } 
        else {
          input.classList.remove('invalid');
          input.classList.add('valid');
          input.setCustomValidity('');
          if(firstPassword.value !== secondPassword.value) {
            secondPassword.classList.remove('valid');
            secondPassword.classList.add('invalid');
            secondPassword.setCustomValidity(`Doesn't match the password`);
         }
        }
        break;

        case 'confirm': 
          
          console.log(`${firstPassword.value} : ${secondPassword.value}`);
        if(!passwordRegex.test(input.value) && firstPassword.value !== secondPassword.value ||
        passwordRegex.test(input.value) &&  firstPassword.value !== secondPassword.value) { 
          input.classList.remove('valid');
          input.classList.add('invalid');
        } 
        else { 
          if(firstPassword.value === secondPassword.value) {
          input.classList.remove('invalid');
          input.classList.add('valid');
          input.setCustomValidity('');
          console.log('else');
          } 
        }
        break;
        
      case 'terms':
        if(input.checked) { //[f] turn into a function
          input.classList.remove('invalid');
          input.classList.add('valid');
        } 
        else if(!input.checked) { 
          input.classList.remove('valid');
          input.classList.add('invalid');
        }
        break;
    }
  });
});

submitBtn.addEventListener('click', (e) => { //[on 'create account' button click]
  inputs.forEach((input) => { 
    let children = input.parentElement.children[0].childNodes; //[f] turn into a function; avoid children[0] and target by element ('svg')-> refactoring screenshot
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
    });
    if(!input.classList.contains('valid') || input.value === '') { //check if no input is left empty or invalid
      switch(input.name) { //[r] put inside submitBtn click event; [f] turn into a function!
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

          case 'terms':
            input.setCustomValidity('You must agree to our terms of service');
            break;
      }
      input.classList.add('invalid'); //turn unfilled inputs invalid
    }; 
  });
});



inputs.forEach((input) => { //loops through <input>s attaching 'input' event listeners
  input.addEventListener('input', (e) => { //on every input
    if(input.classList.contains('valid')) { //checks if <input> field is valid against regex pattern
     let children = input.parentElement.children[0].childNodes; //[f] turn into a function; avoid children[0] and target by element ('svg')-> refactoring screenshot
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
        let children = input.parentElement.children[0].childNodes; //[f] turn into a function; avoid children[0] and target by element ('svg')-> refactoring screenshot
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
