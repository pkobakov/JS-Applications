import page from '../../node_modules/page/page.mjs';

import * as authService from '../services/auth_service.js';


export function logoutView(){
    authService.logout()
    .then(() => {
        page.redirect('/');
    }).catch((err) => {
        page.redirect('/');
        console.log(err);
    })
}