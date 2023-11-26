import{html, render} from '../node_modules/lit-html/lit-html.js';

const header = document.querySelector('#nav-root');

function navbarTemplate(authState){
   return html`
<nav class="navbar navbar-expand-lg bg-body-tertiary">
   <div class="container-fluid">
     <a class="navbar-brand" href="/">My Shop</a>
     <div class="collapse navbar-collapse" id="navbarNav">
       <ul class="navbar-nav">
         <li class="nav-item">
           <a class="nav-link active" aria-current="page" href="/products">Products</a>
         </li>
         ${authState 
        ? html`
        <li class="nav-item">
           <a class="nav-link" href="/logout">Logout</a>
        </li>`
        : html`
        <li class="nav-item">
           <a class="nav-link" href="/login">Login</a>
        </li>
        <li class="nav-item">
           <a class="nav-link" href="/register">Register</a>
        </li>`}
       </ul>
     </div>
   </div>
</nav>
   `;
}

export function navbarView(ctx, next){
    render(navbarTemplate(ctx.authState), header)
    next();
}