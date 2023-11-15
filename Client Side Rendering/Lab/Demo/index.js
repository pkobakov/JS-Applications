import { getRecipes } from "./api.js";
import { appTemplate } from "./templates/app.js";

const root = document.getElementById('root');

function render(html, parentElement){
    const div = document.createElement('div');
    div.innerHTML = html;
    parentElement.replaceChildren(div);
}

const buttons = ['Home', 'About', 'Contacts'];

const recipes = await getRecipes();

render(appTemplate(buttons, recipes), root)