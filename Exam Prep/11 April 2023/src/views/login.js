import {html} from '../../node_modules/lit-html/lit-html.js';
import { userService } from '../user_service.js';

const loginTemplate = () => html`
<section id="login">
          <div class="form">
            <h2>Login</h2>
            <form class="login-form" @submit=${submitHandler}>
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
        </section>
`;

let context = null;

export function showLogin(ctx){
    context = ctx;
    context.render(loginTemplate());
}

async function submitHandler(event){
    event.preventDefault();

    const data = new FormData(event.target);
    const email = data.get('email');
    const password = data.get('password');

    if (!email || !password) {
        return window.alert('Fields are required');
    }

    await userService.login(email, password);
    context.updateNav();
    context.goTo('/');

}