import {html, nothing} from '../../node_modules/lit-html/lit-html.js';

import { dataService } from '../services/data_service.js';
import { userHelper } from '../services/user_helper.js';
import { likesService } from '../services/like_service.js';

const moreInfoTemp = (data, isOwner, guest, likesCount, userLikesCharacter) => html`
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
        <h3>Is This Useful:<span id="likes">${likesCount}</span></h3>
        <div id="action-buttons">
        ${isOwner ? html`
            <a href="/edit/${data._id}" id="edit-btn">Edit</a>
            <a href="" id="delete-btn" @click=${deleteEvent}>Delete</a>`
                  : nothing}  
        ${!isOwner && !guest && userLikesCharacter === 0 ? html`<a href="" id="like-btn" @click=${likeEvent}>Like</a>` : nothing }    
        </div>
    </div>        
</section>    
`;

let context = null;

export async function showDetails(ctx){
    context = ctx;
    const id = context.params.id;
    const data = await dataService.getSingleCharacter(id);
    const userId = await userHelper.getUserID();
    const isOwner = data._ownerId === userId;
    const guest = userId === null;
    const likesCount = await likesService.getLikesCount(id); 
    const userLikesCharacter = await likesService.getLikesbyIdAndUserId(id, userId)
    context.render(moreInfoTemp(data, isOwner, guest, likesCount, userLikesCharacter));
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

async function likeEvent(event){
   event.preventDefault();
  debugger
   const id = context.params.id;
   const data = {characterId: id}
   await likesService.posLike(data);
   context.goTo(`/details/${id}`);
}




