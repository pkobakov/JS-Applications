import {html} from '../../node_modules/lit-html/lit-html.js'
import { dataService } from '../data_service.js';

const dashboardTemplate = (events) => html `
<h2>Current Events</h2>
${events.length > 0 
? html `
<section id="dashboard">
   ${events.map(e => eventCard(e))}
</section>
`
: html`
<h4>No Events yet.</h4>
`}
`;

const eventCard = (event) => html `
<div class="event">
<img src=${event.imageUrl} alt="example1" />
<p class="title">
  ${event.name}
</p>
<p class="date">${event.date}</p>
<a class="details-btn" href="/details/${event._id}">Details</a>
</div>
`;

let context = null;

export async  function showDashboard(ctx){
    context = ctx;
    const data = await dataService.getAllEvents();
    context.render(dashboardTemplate(data));
}