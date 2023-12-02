import {html} from '../../node_modules/lit-html/lit-html.js';

import { dataService } from '../services/data_service.js';
import { userHelper } from '../services/user_helper.js';

const moreInfoTemp = (data, isOwner) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${data.imageUrl} alt="example1" />
        <div>
        <p id="details-category">${data.category}</p>
        <div id="info-wrapper">
            <div id="details-description">
                <p id="description">${data.description}</p>
                <p id ="more-info">${data.moreInfo}</p>
            </div>
        </div>
        ${isOwner ? html`            
            <div id="action-buttons">
                <a href="/edit/${data._id}" id="edit-btn">Edit</a>
                <a href="" id="delete-btn" @click=${deleteEvent}>Delete</a>
            </div>`: ''}
        </div>
    </div>        
</section>    
`;

let context = null;

export async function showDetails(ctx){
    context = ctx;
    debugger
    const id = context.params.id;
    const data = await dataService.getSingleCharacter(id);
    const userId = await userHelper.getUserID();
    
    const isOwner = data._ownerId === userId;
    context.render(moreInfoTemp(data, isOwner));
    console.log('Details');
}

async function deleteEvent(event){
    event.preventDefault();

    const id = context.params.id;

    if (confirm('Are you sure?')) {
        await dataService.deleteCharacter(id);
        context.goTo('/dashboard')
    }


}