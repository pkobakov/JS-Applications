import page from '../node_modules/page/page.mjs';
import { userData } from './user-data-helper.js';
import { loadCatalog } from './views/catalog_view.js';
import { loadCreate } from './views/create_view.js';
import { loadDetails } from './views/details_view.js';
import { loadEdit } from './views/edit_view.js';
import { loadLogin } from './views/login_view.js';
import { loadLogout } from './views/logout.js';
import { loadMyFurniture } from './views/my_furniture_view.js';
import { loadRegister } from './views/register_view.js';

const userNavigation = document.getElementById('user');
const guestNavigation = document.getElementById('guest');

page('/', loadCatalog);
page('/catalog', loadCatalog);
page('/register', loadRegister);
page('/login', loadLogin);
page('/logout', loadLogout);
page('/create', loadCreate);
page('/myFurniture', loadMyFurniture);
page('/details/:id', loadDetails);
page('/edit/:id', loadEdit);


updateNavbar();
page.start();

export function updateNavbar(){
    const userInfo = userData.getUserData();

    if (userInfo) {
        userNavigation.style.display = 'inline';
        guestNavigation.style.display = 'none';
    } else{
        userNavigation.style.display = 'none';
        guestNavigation.style.display = 'inline';
    }
}