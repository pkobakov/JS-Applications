import {html} from '../../node_modules/lit-html/lit-html.js';
import { userService } from '../services/user_service.js';


const registerTemplate = () => html`
<section id="register">
        <div class="form">
          <h2>Register</h2>
          <form class="login-form" @submit=${submitHandler}>
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
          </form>
        </div>
      </section>
`;

let context = null;

export function showRegister(ctx){
    context = ctx;
    context.render(registerTemplate());
}

async function submitHandler(event) {
   event.preventDefault();

   const formData = new FormData(event.target);
   const email = formData.get('email');
   const password = formData.get('password');
   const repeatPassword= formData.get('re-password');

   if (!email || !password || !repeatPassword) {
       return window.alert('Wrong input');
   }

   if (password !== repeatPassword) {
       return window.alert('Passwords error');
   }

   await userService.register(email, password, repeatPassword);
   context.updateNav();
   context.goTo('/');
}