import page from '../../node_modules/page/page.mjs';
import{get} from '../api.js';
import { updateNavbar } from '../app.js';
import { userData } from '../user-data-helper.js';


export async function loadLogout(){
    await get('users/logout');
    userData.clearUserData()
    updateNavbar();

    page.redirect('/');

    
} 