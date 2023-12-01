import {html} from '../../node_modules/lit-html/lit-html.js';

import { dataService } from '../services/data_service.js';


const editTemplate = (album) => html`
<section id="edit">
<div class="form">
  <h2>Edit Album</h2>
  <form class="edit-form" @submit=${submitHandler}>
    <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" value=${album.singer} />
    <input type="text" name="album" id="album-album" placeholder="Album" value=${album.album} />
    <input type="text" name="imageUrl" id="album-img" placeholder="Image url" value=${album.imageUrl} />
    <input type="text" name="release" id="album-release" placeholder="Release date" value=${album.release} />
    <input type="text" name="label" id="album-label" placeholder="Label" value=${album.label} />
    <input type="text" name="sales" id="album-sales" placeholder="Sales" value=${album.sales} />

    <button type="submit">post</button>
  </form>
</div>
</section>
`;

let context = null;

export async function showEdit(ctx){
    context = ctx;

    const id = context.params.id;
    const data = await dataService.getSingleAlbum(id);
    context.render(editTemplate(data));

}

async function submitHandler(event){
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const {singer, album, imageUrl, release, label, sales } = Object.fromEntries(formData);

      if (!singer || !album || !imageUrl || !release || !label || !sales) {
        return window.alert('Wrong input');
      }

      const id = context.params.id;
      await dataService.updateAlbum(id, {singer, album, imageUrl, release, label, sales});
      context.goTo(`/details/${id}`);
}



