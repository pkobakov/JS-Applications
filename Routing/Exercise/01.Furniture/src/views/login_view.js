import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { userData } from "../user-data-helper.js";
import page from '../../node_modules/page/page.mjs';
import { updateNavbar } from "../app.js";
import { post } from "../api.js";

const root = document.querySelector('.container');

function loginTemplate(){
    return html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Login User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${loginHandler}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <input class="form-control" id="email" type="text" name="email">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="password">Password</label>
                    <input class="form-control" id="password" type="password" name="password">
                </div>
                <input type="submit" class="btn btn-primary" value="Login" />
            </div>
        </div>
    </form>    
    `
}

export function loadLogin(){
   render(loginTemplate(), root);
}

async function loginHandler(event){
   event.preventDefault();
   const formData = new FormData(event.target);
   const {email, password} = Object.fromEntries(formData);

   const data = post('users/login', {email, password});
   //userData.setUserData(data);

   const user = userData.getUserData(data);

   if (user) {
       updateNavbar();
       page.redirect('/'); 
    
   }
   
}

 