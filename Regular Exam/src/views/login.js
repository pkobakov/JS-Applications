import{html} from '../../node_modules/lit-html/lit-html.js';

import { userService } from '../services/user_service.js';

const loginTemp = () => html`
<section id="login">
<div class="form">
  <img class="border" src="./images/border.png" alt="">
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
  <img class="border" src="./images/border.png" alt="">
</div>
</section>
`;

let context = null;

export function showLogin(ctx){
    context = ctx;
    context.render(loginTemp());
    console.log('Login');
}

async function submitHandler(event){
    event.preventDefault();

    const formData = new FormData(event.target);

    const {email, password} = Object.fromEntries(formData);
    
    if (!email || !password) {
        return alert('Fields are required');
    }

    await userService.login(email, password);
    context.updateNav();
    context.goTo('/');


}