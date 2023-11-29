import page from './node_modules/page/page.mjs';
import {render} from './node_modules/lit-html/lit-html.js';
import { userService } from './src/user_service.js';
import { userHelper } from './src/user_helper.js';
import { showHome } from './views/home.js';
import { showDashboard } from './views/dashboard.js';
import { showSearch } from './views/search.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showAdd } from './views/add.js';

const root = document.querySelector('main');
const loggedUser = document.querySelector('.user');
const guestUser = document.querySelector('.guest');


page(decorationContext);
page('/', showHome);
page('/dashboard', showDashboard);
page('/search', showSearch);
page('/login', showLogin);
page('/register', showRegister);
page('/details/:id', showDetails);
page('/add', showAdd);
page('/edit/:id', showEdit);
page('/logout', logout);

page.start();
updateNav();

async function logout(){
    await userService.logout();
    updateNav();
    goTo('/');
}

function renderer (template){
    render(template, root);
}

function updateNav(){
    const userdata = userHelper.getUserData();

    if (userdata) {
        loggedUser.style.display = 'block';
        guestUser.style.display = 'none';

    } else{
       loggedUser.style.display = 'none';
       guestUser.style.display = 'block';
    }

}

function goTo(path){
    page.redirect(path);
}

function decorationContext(ctx, next){
    ctx.render = renderer;
    ctx.updateNav = updateNav;
    ctx.goTo = goTo;

    next();
}