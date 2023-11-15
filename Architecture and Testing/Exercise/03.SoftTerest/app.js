import { showHome } from "./src/views/home.js";
import { showRegister } from "./src/views/register.js";
import { showLogin } from "./src/views/login.js";
import { showDashboard } from "./src/views/dashboard.js";
import { showCreate } from "./src/views/create.js";
import { showDetails } from "./src/views/details.js";
import { userInfo } from "./src/api/user_helper.js";
import { logout } from "./src/api/user_manager.js";

document.getElementById('section').remove();

const nav = document.querySelector('nav');
nav.addEventListener('click', onNavigate);
const main = document.getElementById('main');
updateNav();

const routes = {
    "/": showHome,
    "/dashboard": showDashboard,
    "/details": showDetails,
    "/create": showCreate,
    "/register": showRegister,
    "/login": showLogin,
    "/logout": async() => { 
        await logout();
        updateNav();
        goTo('/')
    }
}

const context = {
    renderer, 
    goTo, 
    updateNav, 
    
}

function renderer(section){
   main.replaceChildren(section);
}



function updateNav(){
    const user = userInfo('get');
    const users = nav.querySelectorAll('.user');
    const guests = nav.querySelectorAll('.guest');

    if (user) {
        users.forEach(u => u.style.display = 'block')
        guests.forEach(g => g.style.display = 'none')
    } else{
        users.forEach(u => u.style.display = 'none')
        guests.forEach(g => g.style.display = 'block')
        
    }
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
 

    const endpoint = new URL(target.href).pathname;
    goTo(endpoint);
}

function goTo(name, ...params){
   const handler = routes[name];
   handler(context, params);
}
