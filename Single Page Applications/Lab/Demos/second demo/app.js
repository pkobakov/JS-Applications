// Manipulation via CSS

// document.getElementById('home-link').addEventListener('click', () => {
//     document.querySelectorAll('section').forEach(s => s.style.display = 'none');
//     document.getElementById('home').style.display = 'block';
// })

// document.getElementById('catalog-link').addEventListener('click', () => {
//     document.querySelectorAll('section').forEach(s => s.style.display = 'none');
//     document.getElementById('catalog').style.display = 'block';
// })

// document.getElementById('login-link').addEventListener('click', () => {
//     document.querySelectorAll('section').forEach(s => s.style.display = 'none');
//     document.getElementById('login').style.display = 'block';
// })
//---------------------------------------------------------------------------------
// Manipulate the DOM
// const main = document.getElementById('main');
// const views = {
//     home : document.getElementById('home'),
//     catalog: document.getElementById('catalog'),
//     login: document.getElementById('login')
// };

// Object.values(views).forEach(v => v.remove());

// main.replaceChildren(views.home);

// document.getElementById('home-link').addEventListener('click', ()=>{
//     main.replaceChildren(views.home)
// });

// document.getElementById('catalog-link').addEventListener('click', ()=>{
//     main.replaceChildren(views.catalog)
// });

// document.getElementById('login-link').addEventListener('click', ()=>{
//     main.replaceChildren(views.login)
// });

import { showHome } from "./home.js";
import { showCatalog } from "./catalog.js";
import { showLogin } from "./login.js";

document.getElementById('views').remove();

document.getElementById('home-link').addEventListener('click', ()=>{
    showHome();
})

document.getElementById('catalog-link').addEventListener('click', () => {
    showCatalog();
})

document.getElementById('login-link').addEventListener('click', () => {
    showLogin();
})
