import {html} from '../node_modules/lit-html/lit-html.js';
import { dataService } from '../src/data_service.js';

const editTemplate = (product) => html`
<section id="edit">
<div class="form">
  <h2>Edit Fruit</h2>
  <form class="edit-form" @submit=${submitHandler}>
    <input
      type="text"
      name="name"
      id="name"
      placeholder="Fruit Name"
      value=${product.name}
    />
    <input
      type="text"
      name="imageUrl"
      id="Fruit-image"
      placeholder="Fruit Image URL"
      value=${product.imageUrl}
    />
    <textarea
      id="fruit-description"
      name="description"
      placeholder="Description"
      rows="10"
      cols="50"
    >${product.description}</textarea>
    <textarea
      id="fruit-nutrition"
      name="nutrition"
      placeholder="Nutrition"
      rows="10"
      cols="50"
    >${product.nutrition}</textarea>
    <button type="submit">post</button>
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
    
    const id = context.params.id;
    await dataService.updateFruit(id, {name, imageUrl, description, nutrition});
    
    context.goTo(`/details/${id}`);
}

export async function showEdit(ctx){
    context = ctx;
    const id = context.params.id;
    const data = await dataService.getFruit(id)
    context.render(editTemplate(data));
}