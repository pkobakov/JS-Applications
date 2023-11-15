import { appTemplate } from "./templates/app.js";

const root = document.getElementById('root');

function render(html, parentElement){
    const div = document.createElement('div');
    div.innerHTML = html;
    parentElement.replaceChildren(div);
}

render(appTemplate(['Home', 'About', 'Contacts']), root)