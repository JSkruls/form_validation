const inputs = document.querySelectorAll('input'); //select all <input> elements storing them in a NodeList

inputs.forEach((input) => { //loops through <input>s attaching 'input' event listeners
  input.addEventListener('input', (e) => { //on every input
    if(input.checkValidity()) { //checks if <input> field is valid against a my regex or default
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
    } else { //checks if <input> field is invalid against a my regex or default
        let children = input.parentElement.children[0].childNodes; //accesses NodeList of children of inputs upper sibling <svg>, skips <xml because it's a declaration
        children.forEach(child => { //loops through NodeList: <circle>; <line>; <path> etc.
          if (child.nodeType !== Node.TEXT_NODE) { //if child isn't a text node and contains fill or stroke color, changes it to opposite
            if(child.getAttribute('style').includes('fill: rgb(31, 52, 21);')) { //if has dark green fill
                child.style.fill = 'rgb(52, 26, 21)'; // change to dark red
            }
            if(child.getAttribute('style').includes('fill: rgb(141, 192, 116);')) { // if has light-green fill
                console.log(`${child} changed light-green to light-red fill`);
                child.style.fill = 'rgb(192, 129, 116)';
            }
            if(child.getAttribute('style').includes('stroke: rgb(31, 52, 21);')) { // if has dark-green fill
                child.style.stroke = 'rgb(52, 26, 21)'; // change to dark red
            }
            if(child.getAttribute('style').includes('stroke: rgb(141, 192, 116);')) { // if has light-green fill
                child.style.stroke = 'rgb(192, 129, 116)';
            }
          }
        });
    }
  });
});
