import{render, html} from '../../node_modules/lit-html/lit-html.js';

const loggedInTemplate = () => {
    return html`
    <div class="user">
            <a href="/create">Add Product</a>
            <a href="/logout">Logout</a>
    </div>
    `;
}

const guestTemplate = () => {
    return html`
    <div class="guest">
      <a href="/login">Login</a>
      <a href="/register">Register</a>
    </div>`
}; 


const header = document.querySelector('header');
const navbarTemplate = (isAuthenticated) =>{
   return html`
        <a id="logo" href="/"
          ><img id="logo-img" src="./images/logo.png" alt=""
        /></a>

        <nav>
          <div>
            <a href="/products">Products</a>
          </div>
          ${isAuthenticated ? loggedInTemplate() : guestTemplate()}
        </nav>
    `;
}

export function navbarView(ctx, next){
    
    const isAuthenticated = ctx.userdata;
    render(navbarTemplate(isAuthenticated), header);

    next();
}