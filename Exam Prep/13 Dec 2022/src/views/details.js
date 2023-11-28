import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getAuthData } from '../services/auth_service.js';
import page from '../../node_modules/page/page.mjs';

const main = document.querySelector('main');

function detailsTemplate(product){
    return html`
<section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${product.imageUrl} alt="example1" />
      <p id="details-title">${product.name}t</p>
      <p id="details-category">
        Category: <span id="categories">${product.category}</span>
      </p>
      <p id="details-price">
        Price: <span id="price-number">${product.price}</span>$</p>
      <div id="info-wrapper">
        <div id="details-description">
          <h4>Bought: <span id="buys">0</span> times.</h4>
          <span>${product.description}</span
          >
        </div>
      </div>
      <!--Edit and Delete are only for creator-->
     ${product._ownerId === getAuthData()._id && 
      html`
      <div id="action-buttons">
          <a href=${`/edit/${product._id}`} id="edit-btn">Edit</a>
          <a href="" id="delete-btn" @click=${(event) => onDelete(event, product._id)}>Delete</a>
       </div>
     `}

    </div>
</section>
    `;
}

function onDelete(event, id){
  event.preventDefault();
  if (confirm('Are you sure?')) {
    page.redirect(`/delete/${id}`)
    
  }
  
}

export function productDetailsView(ctx){
    console.log(ctx.product); 
    render(detailsTemplate(ctx.product), main);
}