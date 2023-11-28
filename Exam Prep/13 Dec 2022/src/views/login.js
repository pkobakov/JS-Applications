import {html, render} from '../../node_modules/lit-html/lit-html.js';

import * as authService from '../services/auth_service.js';

const main = document.querySelector('main');


function loginTemplate(){
    // !!!!! Don't forget to set @submit to the form and set links to buttons !!!!!
   return html`        
<section id="login">
   <div class="form">
     <h2>Login</h2>
     <form class="login-form" @submit=${authService.loginHandler}>
       <input type="text" name="email" id="email" placeholder="email" />
       <input
         type="password"
         name="password"
         id="password"
         placeholder="password"
       />
       <button type="submit">login</button>
       <p class="message">
         Not registered? <a href="/register">Create an account</a>
       </p>
     </form>
   </div>
</section>`;
}

export function loginView(){
    render(loginTemplate(), main);
}