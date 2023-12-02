import {html} from '../../node_modules/lit-html/lit-html.js';

import { dataService } from '../services/data_service.js';

const dashboardTemp = (data) => html`
<h2>Characters</h2>
${data.length > 0 ? html`<section id="characters">
                         ${data.map(x => characterCard(x))}
                         </section>`
                  : html`<h2>No added Heroes yet.</h2>`}

`;

const characterCard = (item) => html`
<div class="character">
    <img src=${item.imageUrl} />
    <div class="hero-info">
      <h3 class="category">${item.category}</h3>
      <p class="description">${item.description}</p>
      <a class="details-btn" href="/details/${item._id}">More Info</a>
    </div>
</div>
`;

let context = null;
export async function showDashboard(ctx){
    context = ctx;
    const data = await dataService.getAllCharacters(); 
    context.render(dashboardTemp(data));
    console.log('Dashboard');
}