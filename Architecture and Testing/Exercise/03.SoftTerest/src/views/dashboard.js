import { getAllIdeas } from "../api/data.js";

const dashboard = document.getElementById('dashboard-holder');

export async function showDashboard(context){
   
   dashboard.innerHTML = '';
   const ideas = await getAllIdeas();

   if (ideas.length === 0 ) {
      dashboard.innerHTML = '<h1>No ideas yet! Be the first one :)</h1>'
      return context.renderer(dashboard)
   }

   ideas.forEach(idea => {
      dashboard.innerHTML += createIdea(idea)
   });
   context.renderer(dashboard);
   
}

function createIdea (idea){
   return `
   <div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
      <div class="card-body">
         <p class="card-text">${idea.title}</p>
      </div>
      <img class="card-image" src="${idea.img}" alt="Card image cap">
      <a class="btn" href="/details/${idea._id}">Details</a>
   </div>`
}