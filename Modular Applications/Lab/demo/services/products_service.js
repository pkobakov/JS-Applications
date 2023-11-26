import page from '../node_modules/page/page.mjs';


import { products_url } from '../constants/index.js';
import { getAuthState } from './auth_service.js';
import * as httpService from './http_service.js';


const getAllProducts = () => httpService.get(products_url);

const createProduct = (body, token) => httpService.post(products_url, body, token)

export const loadProducts = async (ctx, next) => {
    ctx.products = await getAllProducts();
    console.log(ctx.products);
    next();
}

export function createProductHandler(event){
    event.preventDefault();

    const formData = new FormData(event.target);
    
    const {make, img, description} = Object.fromEntries(formData);
    createProduct({make, img, description}, getAuthState().accessToken) .then(
        (res) => {
            console.log(res);
            page.redirect('/products');
        }
    );
}
    
