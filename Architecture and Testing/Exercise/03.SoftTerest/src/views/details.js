import { getIdeaById, deleteIdea } from "../api/data.js";
import { userInfo } from "../api/user_helper.js";

const details = document.getElementById('details-view');


export async function showDetails(context, params){  
   
   const idea = await getIdeaById(params[0]);
   const user = userInfo('get');
   const isOwner = user._id === idea._ownerId;
   details.innerHTML = createTemplate(idea, isOwner);

   context.renderer(details);
}
details.querySelector('a').addEventListener('click', onDelete);

export async function onDelete(event){
   event.preventDefault();
   debugger
   const idea = await getIdeaById()
}

function createTemplate(idea, isOwner){
   return `<img class="det-img" src="${idea.img}" />
               <div class="desc">
                  <h2 class="display-5">${idea.title}</h2>
                  <p class="infoType">Description:</p>
                  <p class="idea-description">${idea.description}
                  </p>
               </div>
               <div class="text-center">
                  ${isOwner ? '<a class="btn detb" href="">Delete</a>':''}
               </div>`;
}
   
