import page from '../../node_modules/page/page.mjs';

import { login_url, logout_url, register_url } from "../constants/index.js";



function register(body){
    return fetch(register_url, {
        method: 'post', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    }).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        setUserData(data);
    })
}

function login(body){
    return fetch(login_url, {
        method:'post',
        headers:{
            'Content-Type': 'application/json',
        },
        
        body: JSON.stringify(body)
    }).then((res) => {
        if (res.status === 403) {
            alert('Invalid credentials')
        }
        
        return res.json()
    }).then((data) => {
        setUserData(data);
    })
}

function setUserData (data){
    localStorage.setItem('userdata', JSON.stringify(data));
}

export function getAuthData(){
    return JSON.parse(localStorage.getItem('userdata'));
}

export function registerHandler(event){
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePassword = formData.get('re-password');

    if (!email || !password || !rePassword) {
        alert('All fields are required')
        return; 
    }

    if (password !== rePassword) {
        alert('Passwords should match')
        return; 
    }

    const body = {email, password};

    register(body)
    .then(() => {
        page.redirect('/products')
   })
   .catch((err) => {
    alert(err.message);
   });
}

export function loginHandler(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
        alert('All fields are required');
        return;
    }

    const body = {email, password};

    login(body).then(() => {page.redirect('/products')})
               .catch((err) => { 
               alert(err.message);   
               console.log(err)
            });
}

export function logout(){
    return fetch(logout_url, {
        method: 'get', 
        headers: {'X-Authorization': `Token ${getAuthData().accessToken}`},
    }).then(() => {

        localStorage.removeItem('userdata');
    });
}





