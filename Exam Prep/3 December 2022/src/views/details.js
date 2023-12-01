import {html} from '../../node_modules/lit-html/lit-html.js';

import { dataService } from '../services/data_service.js';
import { userHelper } from '../services/user_helper.js';

const detailsTemplate = (album, isCreator) => html`
<section id="details">
<div id="details-wrapper">
  <p id="details-title">Album Details</p>
  <div id="img-wrapper">
    <img src=${album.imageUrl} alt="example1" />
  </div>
  <div id="info-wrapper">
    <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
    <p>
      <strong>Album name:</strong><span id="details-album">${album.album}</span>
    </p>
    <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
    <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
    <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
  </div>
  <div id="likes">Likes: <span id="likes-count"></span></div>
  ${isCreator ? html` 
    <div id="action-buttons">
        <a href="/edit/${album._id}" id="edit-btn">Edit</a>
        <a href="" id="delete-btn" @click=${deleteEvent}>Delete</a>
    </div>` : ''}
</div>
</section>
`;

let context = null;

export async function showDetails(ctx){
    context = ctx;

    const id = context.params.id;
    const data = await dataService.getSingleAlbum(id);
    
    const isCreator = data._ownerId === userHelper.getUserID();
    context.render(detailsTemplate(data, isCreator));
}

async function deleteEvent(event) {
    event.preventDefault();

    const id = context.params.id;

    if (confirm('are you sure?')) {
      await dataService.deleteAlbum(id);
      context.goTo('/dashboard');
      
    }
}

