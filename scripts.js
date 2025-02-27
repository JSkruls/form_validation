const inputs = document.querySelectorAll('input'); //node list of inputs
const submitBtn = document.querySelector('#submit'); //create account button
const nameRegex = /^[a-zA-Z]+$/; //name and surname validation pattern
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; //email validation pattern
const phoneRegex = /^(\+)?(\d{3})?\d{8}$/; //phone validation pattern
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])[A-Za-z\d\W]{6,15}$/; //password validation pattern
const checkBox = document.querySelector('#terms'); // input check-box
const passOne = document.querySelector('input[name="password"]'); //password input
const passTwo = document.querySelector('input[name="confirm"]'); //password confirmation input
const progress = document.querySelector('.progress_bar_wrap'); //password strength wrapper
const eyeIcon = document.getElementById('togglePassword');

checkBox.addEventListener('click', (e) => { //when valid/checked display no validation message
  checkBox.setCustomValidity('');
});

passOne.addEventListener('focus', (e) => { //show progress bars only on input focus
  progress.style.visibility = 'visible';
});

passOne.addEventListener('blur', (e) => { //hide progress bars
  progress.style.visibility = 'hidden';
});

eyeIcon.addEventListener('click', (e) => {
  if(passOne.type === 'password') {
     passOne.type = 'text';
     passTwo.type = 'text';
     eyeIcon.classList.remove('fa-eye-slash');
     eyeIcon.classList.add('fa-eye');
  }
  else if (passOne.type === 'text') {
    passOne.type = 'password';
    passTwo.type = 'password';
    eyeIcon.classList.remove('fa-eye');
    eyeIcon.classList.add('fa-eye-slash');
  }
});


function passwordStrength(password) { //colors progress bars based on input char
  let firstBar = document.querySelector('.one');
  let secondBar = document.querySelector('.two');
  let thirdBar = document.querySelector('.three');
  let fourthBar = document.querySelector('.four');
  let regexArray = new Array(); //stores regex patterns
  let colorCode = 0; //passed regex pattern counter

  
  if(!passOne.value) { //on empty input progress bars turn gray
    Array.from(progress.children).forEach((bar) => {
      bar.style.background = 'rgba(147, 147, 147, 1)';
    });
  }
  

  //populates array with password regex parts
  regexArray.push('[a-z]');
  regexArray.push('[A-Z]');
  regexArray.push('[0-9]');
  regexArray.push('[!@#$%^&*()]');

  regexArray.forEach(pattern => { //each array string is turned to regex and tested for validity
    if(new RegExp(pattern).test(password)) {
        colorCode++; //on each pass color code is increased 0 to 4
      }
  });

  switch(colorCode) {
    case 1: 
      firstBar.style.background = 'rgba(200, 25, 25, 1)'; 
      secondBar.style.background = 'rgba(147, 147, 147, 1)';
      thirdBar.style.background = 'rgba(147, 147, 147, 1)';
      fourthBar.style.background = 'rgba(147, 147, 147, 1)';
      break;

    case 2: 
      firstBar.style.background = 'rgba(255, 172, 29, 1)';
      secondBar.style.background = 'rgba(255, 172, 29, 1)';
      thirdBar.style.background = 'rgba(147, 147, 147, 1)';
      fourthBar.style.background = 'rgba(147, 147, 147, 1)';
      break;

    case 3: 
      firstBar.style.background = 'rgba(231, 229, 21, 1)';
      secondBar.style.background = 'rgba(231, 229, 21, 1)';
      thirdBar.style.background = 'rgba(231, 229, 21, 1)';
      fourthBar.style.background = 'rgba(147, 147, 147, 1)';
      break;

    case 4: 
      firstBar.style.background = 'rgba(113, 183, 46, 1)';
      secondBar.style.background = 'rgba(113, 183, 46, 1)';
      thirdBar.style.background = 'rgba(113, 183, 46, 1)';
      fourthBar.style.background = 'rgba(113, 183, 46, 1)';
      break;
  }
}

inputs.forEach((input) => {
  input.addEventListener('input', (e) => { //on every input character entry 
    switch(input.name) { //[f] turn into a function; re-write it shorter (with object?)
      case 'first_name': //check input type against its respective validation pattern]
        if(!nameRegex.test(input.value)) { //on validation failure
          input.classList.remove('valid'); //remove pre-existing valid styling if present
          input.classList.add('invalid'); //and apply invalid styling
        } 
        else { //if validation is passed
          input.classList.remove('invalid'); //remove invalid styling if error is corrected
          input.classList.add('valid'); //and apply valid styling
          input.setCustomValidity('');  //remove validity error message
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
          passTwo.removeAttribute('disabled');
          input.classList.remove('invalid');
          input.classList.add('valid');
          input.setCustomValidity('');
          if(passOne.value !== passTwo.value) { //style password confirmation input invalid if they don't match
            passTwo.classList.remove('valid');
            passTwo.classList.add('invalid');
            passTwo.setCustomValidity(`Doesn't match the password`); //apply password miss match validation message
            let children = passTwo.parentElement.children[0].childNodes; 
            children.forEach(child => { //upon re-entering a different password change confirm icon green to red
              if (child.nodeType !== Node.TEXT_NODE) { 
                if(child.getAttribute('style').includes('fill: rgb(31, 52, 21);')) { 
                    child.style.fill = 'rgb(52, 26, 21)'; 
                }
                if(child.getAttribute('style').includes('fill: rgb(141, 192, 116);')) { 
                    child.style.fill = 'rgb(192, 129, 116)'; 
                }
                if(child.getAttribute('style').includes('stroke: rgb(31, 52, 21);')) { 
                    child.style.stroke = 'rgb(52, 26, 21)'; 
                }
                if(child.getAttribute('style').includes('stroke: rgb(141, 192, 116);')) { 
                    child.style.stroke = 'rgb(192, 129, 116)'; 
                }
              }
            });
          }
          else if (passOne.value === passTwo.value && passTwo.value !== '') { //remove invalid styling from confirmation input when first password is changed and then reverted back
            passTwo.classList.add('valid');
            passTwo.classList.remove('invalid');
            let children = passTwo.parentElement.children[0].childNodes; 
            children.forEach(child => { //entering confirm before pass styles icon red, adding same password would't color would remain red, not it turns green
              if (child.nodeType !== Node.TEXT_NODE) { 
                if(child.getAttribute('style').includes('fill: rgb(52, 26, 21);')) { // rgb(31, 52, 21);
                    child.style.fill = 'rgb(31, 52, 21)'; 
                }
                if(child.getAttribute('style').includes('fill: rgb(192, 129, 116);')) { //rgb(141, 192, 116)
                    child.style.fill = 'rgb(141, 192, 116)'; 
                }
                if(child.getAttribute('style').includes('stroke: rgb(52, 26, 21);')) { 
                    child.style.stroke = 'rgb(31, 52, 21)'; 
                }
                if(child.getAttribute('style').includes('stroke: rgb(192, 129, 116);')) { 
                    child.style.stroke = 'rgb(141, 192, 116)'; 
                }
              }
            });
          }
        }
        break;

        case 'confirm':   
        if(passOne.value !== passTwo.value) { //style invalid if validity and both match, but extra chars are added
          input.classList.remove('valid');
          input.classList.add('invalid');
        } 
        else if (passTwo.value) { //prevent confirmation input to be valid when both passwords are empty
          input.classList.remove('invalid');
          input.classList.add('valid');
          input.setCustomValidity('');
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

submitBtn.addEventListener('click', (e) => { //on 'create account' button click
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
    
    if(!input.classList.contains('valid') || input.value === '') { //assigns validation message to empty or invalid inputs
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
      input.classList.add('invalid'); //on submit click styles all empty inputs invalid
    }; 
  });
});

inputs.forEach((input) => { //loops through <input>s attaching 'input' event listeners
  input.addEventListener('input', (e) => { //on every input
    if(input.classList.contains('valid')) { //checks if <input> field is valid against regex pattern
     let children = input.parentElement.children[0].childNodes; //[f] turn into a function; avoid children[0] and target by element ('svg')-> refactoring screenshot
        children.forEach(child => { //loops through NodeList: <circle>; <line>; <path> etc.
        if (child.nodeType !== Node.TEXT_NODE) { //if child isn't a text node and contains fill or stroke color change input icon to green
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
          }
        }
      });
    } else if (!input.classList.contains('valid')) { //checks if <input> field is valid against regex pattern
        let children = input.parentElement.children[0].childNodes; //[f] turn into a function; avoid children[0] and target by element ('svg')-> refactoring screenshot
          children.forEach(child => { //loops through NodeList: <circle>; <line>; <path> etc.
          if (child.nodeType !== Node.TEXT_NODE) { //if child isn't a text node and contains fill or stroke color change input color to red
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
            }
          }
        });
    }
  });
});
