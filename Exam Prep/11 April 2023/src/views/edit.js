import {html} from '../../node_modules/lit-html/lit-html.js';
import { dataService } from '../data_service.js';

const editTemplate = (event) => html`
<section id="edit">
<div class="form">
  <h2>Edit Event</h2>
  <form class="edit-form" @submit=${submitHandler}>
    <input
      type="text"
      name="name"
      id="name"
      placeholder="Event"
      value=${event.name}
    />
    <input
      type="text"
      name="imageUrl"
      id="event-image"
      placeholder="Event Image"
      value=${event.imageUrl}
    />
    <input
      type="text"
      name="category"
      id="event-category"
      placeholder="Category"
      value=${event.category}
    />
    <textarea
      id="event-description"
      name="description"
      placeholder="Description"
      rows="5"
      cols="50"
    >${event.description}</textarea>
    
    <label for="date-and-time">Event Time:</label>
    <input
    type="text"
    name="date"
    id="date"
    placeholder="When?"
    value=${event.date}
  />

    <button type="submit">Edit</button>
  </form>
</div>
</section>
`;

let context = null;

async function submitHandler(event){
   event.preventDefault();

   const data = new FormData(event.target);
   const {name, imageUrl, category, description, date} = Object.fromEntries(data);
    
   if (!name || !imageUrl || !category || !description || !date) {
       return window.alert('Fields are required');
   }
   
   const id = context.params.id
   await dataService.updateEvent(id, {name, imageUrl, category, description, date});
   context.goTo('/dashboard');
}
export async function showEdit(ctx){
    context = ctx;
    const id = context.params.id;
    const data = await dataService.getSingleEvent(id);
    context.render(editTemplate(data));
}