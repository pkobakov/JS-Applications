import {html} from '../node_modules/lit-html/lit-html.js';
import { userService } from '../src/user_service.js';

const registerTemplate = () => html`
<section id="register">
<div class="form">
  <h2>Register</h2>
  <form class="register-form" @submit=${submitHandler}>
    <input
      type="text"
      name="email"
      id="register-email"
      placeholder="email"
    />
    <input
      type="password"
      name="password"
      id="register-password"
      placeholder="password"
    />
    <input
      type="password"
      name="re-password"
      id="repeat-password"
      placeholder="repeat password"
    />
    <button type="submit">register</button>
    <p class="message">Already registered? <a href="/login">Login</a></p>
  </form>
</div>
</section
`;

let context = null;

export function showRegister(ctx){
    ctx.render(registerTemplate());
    context = ctx;

}

async function submitHandler(event){
   event.preventDefault();
   
   const formData =  new FormData(event.target);
   const email = formData.get('email');
   const password = formData.get('password');
   const repeatPassword = formData.get('re-password');

   if (!email || !password || !repeatPassword ) {
       return window.alert('All fields are required')
   }

   else if (password !== repeatPassword) {
       return window.alert('Passwords should match')
   }

   await userService.register(email, password);
   context.updateNav();
   context.goTo('/');
}