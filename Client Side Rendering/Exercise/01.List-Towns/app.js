import { html, render } from "../node_modules/lit-html/lit-html.js";

const root = document.getElementById('root');
const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

export function onSubmit(event){
    event.preventDefault();

    const formData = new FormData(event.target);
    const inputData = Object.fromEntries(formData);
    const towns = inputData.towns.split(', ');
    
    
    renderTemplate(createTemplate(towns));

}

function createTemplate(towns){
    return html`
                 <ul>
                    ${towns.map(town => html`<li>${town}</li>`)}
                 </ul>`
}

function renderTemplate(template){
    render(template,root);
}