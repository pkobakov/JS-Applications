import {html} from '../../node_modules/lit-html/lit-html.js';
import { dataService } from '../services/data_service.js';

const addAlbumTemplate = () => html`
<section id="create">
<div class="form">
  <h2>Add Album</h2>
  <form class="create-form" @submit=${submitHandler}>
    <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
    <input type="text" name="album" id="album-album" placeholder="Album" />
    <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
    <input type="text" name="release" id="album-release" placeholder="Release date" />
    <input type="text" name="label" id="album-label" placeholder="Label" />
    <input type="text" name="sales" id="album-sales" placeholder="Sales" />

    <button type="submit">post</button>
  </form>
</div>
</section>
`;

let context = null;

export function showAdd(ctx){
    context = ctx;
    context.render(addAlbumTemplate());
    
}

async function submitHandler(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const {singer, album, imageUrl, release, label, sales} = Object.fromEntries(formData);

    if (!singer || !album || !imageUrl || !release || !label || !sales) {
        return window.alert('Wrong input');
    }

    await dataService.addNewAlbum({singer, album, imageUrl, release, label, sales}); 
    context.goTo('/dashboard');
}