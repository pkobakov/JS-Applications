import {html, render} from '../node_modules/lit-html/lit-html.js';

import { products_url, rootElement } from '../constants/index.js';


/**
 product:
_ownerId: "35c62d76-8152-4626-8712-eeb96381bea8",
    			make: "Table",
    			model: "Swedish",
    			year: 2015,
    			description: "Medium table",
    			price: 235,
    			img: "./images/table.png",
    			material: "Hardwood",
    			_createdOn: 1615545143015,
    			_id: "53d4dbf5-7f41-47ba-b485-43eccb91cb95"
 **/

function productsTemplate(products){
    return html`
    <div>
    <h4 class="heading">Products</h4>
    <section class="section">
    ${products.map((p) => html`
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src=${p.img} alt="...">
            <div class="card-body">
                <h5 class="card-title">${p.make}</h5>
                <p class="card-text">${p.description}</p>
                <a href=${`${products_url}/${p._id}`} class="btn btn-primary">Details</a>
            </div>`)}
        </div>
    </section>
    `;
}

export function productsView (ctx){
    render(productsTemplate(ctx.products), rootElement);
    
    
}