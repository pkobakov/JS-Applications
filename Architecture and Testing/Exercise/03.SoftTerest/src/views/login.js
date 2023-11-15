import { login } from "../api/user_manager.js";

const loginView = document.getElementById('login-view');
const form = loginView.querySelector('form');

form.addEventListener('submit', onSubmit);

let context = null;

export function showLogin(ctx){
   context = ctx;
   context.renderer(loginView);
}

async function onSubmit(event) {
   event.preventDefault();
   
   const formData = new FormData(event.target);
   const {email, password} = Object.fromEntries(formData);

   if (!email || !password) {
      return alert('Error');
   }

   await login(email, password)
   context.updateNav();
   context.goTo('/')
}