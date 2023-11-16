import {cats} from './catSeeder.js';
import { html, render } from '../node_modules/lit-html/lit-html.js';


const allCats = document.getElementById('allCats');
const catsList = html`
<ul>
     ${cats.map(cat => catTemplate(cat))}
</ul>`;

render(catsList, allCats);



function catTemplate(cat){ 
return html `
<li>
<img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
<div class="info">
    <button class="showBtn" @click=${toggleStatusCode}>Show status code</button>
    <div class="status" style="display: none" id="${cat.id}">
        <h4>Status Code: ${cat.statusCode}</h4>
        <p>Continue</p>
    </div>
</div>
</li>`};

function toggleStatusCode(event){
    const button = event.target;
    const div = button.parentElement.querySelector('div');
    const currentState = div.style.display;
    div.style.display = currentState === 'none' ? 'block' : 'none';
    button.textContent = currentState === 'none' ? 'Hide status code' : 'Show status code'
}