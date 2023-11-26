import {render, html} from '../node_modules/lit-html/lit-html.js';

import { rootElement } from '../constants/index.js';
import { loginHandler } from '../services/auth_service.js';


function loginTemplate(){
    return html` 
<div class="login-container">
    <h4 class="heading">Login</h4>    
    <form @submit=${loginHandler}>
      <div class="form-outline mb-4">
        <label class="form-label" for="form2Example1" for="email">Email address</label>
        <input type="email" id="email" class="form-control" name="email"/>
      </div>
      <div class="form-outline mb-4">
        <label class="form-label" for="form2Example2" for="password">Password</label>
        <input type="password" id="password" class="form-control" name="password"/>
      </div>

     <!-- Submit button -->
      <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>
    </form>
</div>    
    `;
}



export function loginView(){
    render(loginTemplate(), rootElement);
}