import { showHome } from "./src/views/home.js";
import { showRegister } from "./src/views/register.js";
import { showLogin } from "./src/views/login.js";
import { showDashboard } from "./src/views/dashboard.js";
import { showCreate } from "./src/views/create.js";
import { showDetails } from "./src/views/details.js";

document.getElementById('section').remove();
document.querySelector('nav').addEventListener('click', onNavigate);
const main = document.getElementById('main');


const routes = {
    "/": showHome,
    "/dashboard": showDashboard,
    "/create": showCreate,
    "/register": showRegister,
    "/login": showLogin,
    "/logout": () => {console.log('Logout')},
}

function renderer(section){
   main.replaceChildren(section);
}

function onNavigate(event){
    event.preventDefault();

    if (event.target.tagName !== 'A' && event.target.tagName !== 'IMG') {
        return; 
    }

    let target = event.target;
    
    if (target.tagName === 'IMG') {
        target = target.parentElement;
    }

    const context = {
        renderer
    }

    const endpoint = new URL(target.href).pathname;
    routes[endpoint](context);
}
