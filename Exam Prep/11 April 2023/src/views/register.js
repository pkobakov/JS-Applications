import {html} from '../../node_modules/lit-html/lit-html.js';
import { userService } from '../user_service.js';

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
        </section>
`;

let context = null;
export function showRegister(ctx){

    context = ctx;
    context.render(registerTemplate());
}

async function submitHandler(event){
    event.preventDefault();

    const data = new FormData(event.target);
    const email = data.get('email');
    const password = data.get('password');
    const rePassword = data.get('re-password');

    if (!email || !password || !rePassword) {
        return window.alert('Fields are required');
    }

    if (password !== rePassword) {
        return window.alert('Passwords should match')
    }

    await userService.register(email, password, rePassword);
    context.updateNav();
    context.goTo('/')
}