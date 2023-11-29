import {html} from '../node_modules/lit-html/lit-html.js';
import { dataService } from '../src/data_service.js';

const addTemplate = () => html `
<section id="create">
<div class="form">
  <h2>Add Fruit</h2>
  <form class="create-form" @submit=${submitHandler}>
    <input
      type="text"
      name="name"
      id="name"
      placeholder="Fruit Name"
    />
    <input
      type="text"
      name="imageUrl"
      id="Fruit-image"
      placeholder="Fruit Image"
    />
    <textarea
    id="fruit-description"
    name="description"
    placeholder="Description"
    rows="10"
    cols="50"
  ></textarea>
  <textarea
    id="fruit-nutrition"
    name="nutrition"
    placeholder="Nutrition"
    rows="10"
    cols="50"
  ></textarea>
    <button type="submit">Add Fruit</button>
  </form>
</div>
</section>
`;

let context = null;

async function submitHandler(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const {name, imageUrl, description, nutrition} = Object.fromEntries(formData);

    if (!name || !imageUrl || !description || !nutrition) {
        return window.alert('All fields are required')
    }

    await dataService.createFruit({name, imageUrl, description, nutrition});
    context.goTo('/dashboard');
}

export function showAdd(ctx){

    context = ctx;
    context.render(addTemplate());
}