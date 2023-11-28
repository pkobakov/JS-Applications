import {html, render} from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

import { deleteProduct } from '../services/products_service.js';


export function deleteView(ctx){
    deleteProduct(ctx.params.id)
    .then(() => {
        page.redirect('/products');
    }).catch((err) => {
        alert(err.message);
        console.log(err);
    })
}