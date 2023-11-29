import {html} from '../node_modules/lit-html/lit-html.js';

import { dataService } from '../src/data_service.js';
import { userHelper } from '../src/user_helper.js';



const detailsTemplate = (product, isOwner) => html`
<section id="details">
<div id="details-wrapper">
  <img id="details-img" src=${product.imageUrl} alt="example1" />
  <p id="details-title">${product.name}</p>
  <div id="info-wrapper">
    <div id="details-description">
      <p>${product.description}</p>
          <p id="nutrition">Nutrition</p>
          <p id = "details-nutrition">${product.nutrition}</p>
    </div>
    ${isOwner ? html`<div id="action-buttons">
                    <a href="/edit/${product._id}" id="edit-btn">Edit</a>
                     <a @click=${deleteFruit} href="" id="delete-btn">Delete</a>
                </div>`
              : ''}
    
  </div>
</div>
</section>
`;

let context = null;


export async function showDetails(ctx){
  context = ctx;
  const id = context.params.id;
  const data = await dataService.getFruit(id);
  const isOwner = data._ownerId === userHelper.getUserID();
  ctx.render(detailsTemplate(data, isOwner));
}

async function deleteFruit(event){
    event.preventDefault();

    const id = context.params.id;
    await dataService.deleteFruit(id);
    context.goTo('/dashboard');

}