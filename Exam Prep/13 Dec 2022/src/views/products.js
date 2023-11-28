import {html, render} from '../../node_modules/lit-html/lit-html.js'

const main = document.querySelector('main');

function productTemp(product) {
    return html`
    <div class="product">
            <img src=${product.imageUrl} alt="example" />
            <p class="title">
              ${product.name}
            </p>
            <p><strong>Price:</strong><span class="price">${Number(product.price)}</span>$</p>
            <a class="details-btn" href="/products/${product._id}">Details</a>
          </div>
    `;
}
 
function productsSection(products) {
    return html`
    <section id="dashboard">
    ${products.map(product => productTemp(product))}
    </section>
    `;
}

function productsTemplate(products){
   return html`
   <h2>Products</h2>
   ${products && products.length > 0 ? productsSection(products): html`<h2>No products yet.</h2>`}
   `
}

export function productsView(ctx){
    render(productsTemplate(ctx.products), main);
}