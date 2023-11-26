import page from '../node_modules/page/page.mjs';

import { login_url, logout_url } from '../constants/index.js';
import * as httpService from './http_service.js';

//API Calls
const login  = (body) => httpService.post(login_url, body);
export const logout = () => httpService.get(logout_url).then(() => {
    localStorage.removeItem('userData');
});

//Event Handlers
export function loginHandler(event){
   event.preventDefault();

   const formData = new FormData(event.target);
   const email = formData.get('email');
   const password = formData.get('password');

   login({email, password})
   .then((res) => {
    console.log(res);
    if (res.accessToken) {
        localStorage.setItem('userData', JSON.stringify(res));
        page.redirect('/products')
    }
   }).catch((err) => {alert(err.message)});
}

// Helper funcs
export function getAuthState(){
    return JSON.parse(localStorage.getItem('userData'));
    
}