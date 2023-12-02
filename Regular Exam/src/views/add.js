import{html} from '../../node_modules/lit-html/lit-html.js';

import { dataService } from '../services/data_service.js';

const addCharacterTemp = () => html`
<section id="create">
<div class="form">
  <img class="border" src="./images/border.png" alt="">
  <h2>Add Character</h2>
  <form class="create-form" @submit=${submitHandler}>
    <input
      type="text"
      name="category"
      id="category"
      placeholder="Character Type"
    />
    <input
      type="text"
      name="image-url"
      id="image-url"
      placeholder="Image URL"
    />
    <textarea
    id="description"
    name="description"
    placeholder="Description"
    rows="2"
    cols="10"
  ></textarea>
  <textarea
    id="additional-info"
    name="additional-info"
    placeholder="Additional Info"
    rows="2"
    cols="10"
  ></textarea>
    <button type="submit">Add Character</button>
  </form>
  <img class="border" src="./images/border.png" alt="">
</div>
</section>
`;

let context = null;
export function showAdd(ctx){
    context = ctx;
    context.render(addCharacterTemp());
    console.log('Add');
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

    await dataService.addCharacter({category, imageUrl, description, moreInfo}); 
    context.goTo('/dashboard');

}