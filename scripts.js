const inputs = document.querySelectorAll('input'); //select all <input> elements storing them in a NodeList
const submitBtn = document.querySelector('#submit'); 
const nameRegex = /^[a-zA-Z]+$/; //name and surname validation pattern
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; //email validation pattern
const phoneRegex = /^(\+)?(\d{3})?\d{8}$/; //phone validation pattern
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])[A-Za-z\d\W]{6,15}$/; //password validation pattern


inputs.forEach((input) => {
  input.addEventListener('input', (e) => { //on every input character entry 
    switch(input.name) {
      case 'first_name': //check input type against its respective validation pattern
        if(!nameRegex.test(input.value) || input.value.length > 20) { //on validation failure
          input.classList.remove('valid'); //remove pre-existing valid styling
          input.classList.add('invalid'); //and apply invalid styling
        } 
        else { //if validation is passed
        input.classList.remove('invalid'); //remove invalid styling when error is corrected
        input.classList.add('valid'); //and apply valid styling
        } 
        break;

      case 'surname': 
        if(!nameRegex.test(input.value) || input.value.length > 20) { 
          input.classList.remove('valid');
          input.classList.add('invalid');
        } 
        else { 
        input.classList.remove('invalid');
        input.classList.add('valid');
        }
        break;
      
      case 'email': 
        if(!emailRegex.test(input.value) || input.value.length > 30) { 
          input.classList.remove('valid');
          input.classList.add('invalid');
        } 
        else { 
        input.classList.remove('invalid');
        input.classList.add('valid');
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

submitBtn.addEventListener('click', (e) => { //on 'create account' button click
  inputs.forEach((input) => { 
    if(!input.classList.contains('valid') || input.value === '') { //check if no input is left empty or invalid
      input.classList.add('invalid'); //turn untouched inputs invalid
      e.preventDefault(); //disable submit button until all fields are valid
    }; 
  });
});

inputs.forEach((input) => { //loops through <input>s attaching 'input' event listeners
  input.addEventListener('input', (e) => { //on every input
    if(input.classList.contains('valid')) { //checks if <input> field is valid against regex pattern
      let children = input.parentElement.children[0].childNodes; //accesses NodeList of children of inputs upper sibling <svg>, skips <xml because it's a declaration
      children.forEach(child => { //loops through NodeList: <circle>; <line>; <path> etc.
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
          }
        }
      });
    } else if (!input.classList.contains('valid')) { //checks if <input> field is valid against regex pattern
        let children = input.parentElement.children[0].childNodes; //accesses NodeList of children of inputs upper sibling <svg>, skips <xml because it's a declaration
        children.forEach(child => { //loops through NodeList: <circle>; <line>; <path> etc.
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
            }
          }
        });
    }
  });
});