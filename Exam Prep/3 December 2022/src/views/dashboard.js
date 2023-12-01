import {html} from '../../node_modules/lit-html/lit-html.js';

import { dataService } from '../services/data_service.js';

const dashboardTemplate = (albums) => html`
<section id="dashboard">
        <h2>Albums</h2>
    ${albums.length > 0 ? html`        
    <ul class="card-wrapper">
     ${albums.map(album => albumCard(album))}     
    </ul>` : html `<h2>There are no albums added yet.</h2>`}
        
</section>
`;

const albumCard = (album) => html`
<li class="card">
            <img src=${album.imageUrl} alt="travis" />
            <p>
              <strong>Singer/Band: </strong><span class="singer">${album.singer}</span>
            </p>
            <p>
              <strong>Album name: </strong><span class="album">${album.album}</span>
            </p>
            <p><strong>Sales:</strong><span class="sales">${album.sales}</span></p>
            <a class="details-btn" href="/details/${album._id}">Details</a>
</li>
`;

let context = null;

export async function showDashboard(ctx){
    context = ctx;
    const data = await dataService.getMusicLibrary();
    context.render(dashboardTemplate(data));
}