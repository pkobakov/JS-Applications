import page from '../../node_modules/page/page.mjs';

import { products_url } from "../constants/index.js";
import { getAuthData } from "./auth_service.js";

function createProduct(data){
    return fetch(products_url, {
        method: 'post',
        headers: {'Content-Type': 'application/json',
                  'X-Authorization': `${getAuthData().accessToken}`},
        body: JSON.stringify(data)          
    }); 
}

function editProduct(data, id){
    return fetch(`http://localhost:3030/data/products/${id}`, {
        method: 'put',
        headers: {'Content-Type': 'application/json',
                  'X-Authorization': `${getAuthData().accessToken}`},
        body: JSON.stringify(data)          
    });
}

export function getProduct(ctx, next){
    fetch(`http://localhost:3030/data/products/${ctx.params.id}`)
    .then((res) => {
      return res.json();
    }).then((data) => {
        ctx.product = data;
        next();
    })
}

export function getProducts(ctx, next){
    fetch(products_url)
    .then((res) => res.json())
    .then((data) => {
        ctx.products = data;
        next();
    })
}

export function createProductHandler(event){
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get('name');
    const imageUrl = formData.get('imageUrl');
    const category = formData.get('category');
    const description = formData.get('description');
    const price = formData.get('price');

    if (!name || !imageUrl || !category || !description || !price) {
        return alert('All fields are required');
    }

    const body = {
        name,
        imageUrl,
        category,
        description,
        price
    };

    createProduct(body).then((res) => {
        page.redirect('/products'); 
    }).catch((err) => {
        alert(err.message);
    });
}

export function editProductHandler(event, id){
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get('name');
    const imageUrl = formData.get('imageUrl');
    const category = formData.get('category');
    const description = formData.get('description');
    const price = formData.get('price');

    if (!name || !imageUrl || !category || !description || !price) {
        return alert('All fields are required');
    }

    const body = {
        name,
        imageUrl,
        category,
        description,
        price
    };

    editProduct(body, id).then((res) => {
        page.redirect('/products'); 
    }).catch((err) => {
        alert(err.message);
    });
}

export function deleteProduct(id){
    return fetch(`http://localhost:3030/data/products/${id}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `${getAuthData().accessToken}`
        }
    })
}


