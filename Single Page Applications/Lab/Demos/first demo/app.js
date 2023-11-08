import * as util from './util.js';


console.log('it works');

const element = document.getElementById('content');
console.log(element.textContent);

const paragraph = document.createElement('p');
paragraph.textContent = `The result from the sum function is: ${util.sum(5,3)}`;
element.appendChild(paragraph);



