import {html} from '../../node_modules/lit-html/lit-html.js';

import { dataService } from '../services/data_service.js';

const editTemp = (data) => html`
<section id="edit">
<div class="form">
  <img class="border" src="./images/border.png" alt="">
  <h2>Edit Character</h2>
  <form class="edit-form" @submit=${submitHandler}>
    <input
    type="text"
    name="category"
    id="category"
    placeholder="Character Type"
    value=${data.category}
  />
  <input
    type="text"
    name="image-url"
    id="image-url"
    placeholder="Image URL"
    value=${data.imageUrl}
  />
  <textarea
  id="description"
  name="description"
  placeholder="Description"
  rows="2"
  cols="10"
>${data.description}</textarea>
<textarea
  id="additional-info"
  name="additional-info"
  placeholder="Additional Info"
  rows="2"
  cols="10"
>${data.moreInfo}</textarea>
    <button type="submit">Edit</button>
  </form>
  <img class="border" src="./images/border.png" alt="">
</div>
</section>
`;

let context = null;

export async function showEdit(ctx){
    context = ctx;
    
    const id = context.params.id;
    const data = await dataService.getSingleCharacter(id);
    context.render(editTemp(data));
    console.log('Edit');
}

async function submitHandler(event){
    event.preventDefault();

    const formData = new FormData(event.target);
    const category = formData.get('category');
    const imageUrl = formData.get('image-url');
    const description = formData.get('description');
    const moreInfo = formData.get('additional-info');



    if (!category || !description || !imageUrl || !moreInfo) {
        return window.alert('Fields are required');
    }

    const id = context.params.id;
    await dataService.updateCharacter(id, {category, imageUrl, description, moreInfo});
    context.goTo(`/details/${id}`);

}