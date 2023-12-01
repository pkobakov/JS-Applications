import {html} from '../../node_modules/lit-html/lit-html.js';
import { dataService } from '../data_service.js';

const addEventTemplate = () => html `
<section id="create">
          <div class="form">
            <h2>Add Event</h2>
            <form class="create-form" @submit=${submitHandler}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image URL"
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
              />


              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
            />

              <button type="submit">Add</button>
            </form>
          </div>
        </section>

`;

async function submitHandler(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    const {name, imageUrl, category, description, date} = Object.fromEntries(data);
    
    if (!name || !imageUrl || !category || !description || !date) {
        return window.alert('Fields are required');
    }
    
    await dataService.createEvent({name, imageUrl, category, description, date});
    context.goTo('/dashboard');

}

let context = null;
export function showAdd(ctx){

    context = ctx;
    context.render(addEventTemplate());
    
}