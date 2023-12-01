import {html} from '../../node_modules/lit-html/lit-html.js';

import { dataService } from '../data_service.js';
import { userHelper } from '../user_helper.js';

const detailsTemplate = (data, isCreator) => html`
<section id="details">
        <div id="details-wrapper">
            <img id="details-img" src=${data.imageUrl} alt="example1" />
            <p id="details-title">${data.name}</p>
            <p id="details-category">
              Category: <span id="categories">${data.category}</span>
            </p>
            <p id="details-date">
              Date:<span id="date">${data.date}</span></p>
            <div id="info-wrapper">
              <div id="details-description">
                <span>${data.description}</span>
              </div>

            </div>
            ${isCreator ? html`            
            <div id="action-buttons">
                <a href="/edit/${data._id}" id="edit-btn">Edit</a>
                <a href="" @click=${deleteEvent} id="delete-btn">Delete</a>
            </div>`: ''}
        </div>
</section>
`;



let context = null;

async function deleteEvent(event){
    event.preventDefault();

    const id = context.params.id;
    await dataService.deleteEvent(id);
    context.goTo('/dashboard');


}

export async function showDetails(ctx){
    context = ctx;
    const id = context.params.id;
    const data = await dataService.getSingleEvent(id);
    
    const isCreator = data._ownerId === userHelper.getUserID();

    context.render(detailsTemplate(data, isCreator));
}