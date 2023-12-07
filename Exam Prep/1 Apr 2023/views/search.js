import {html} from '../node_modules/lit-html/lit-html.js';
import { dataService } from '../src/data_service.js';

const searchTemplate = (data, isResult) => html `
<section id="search">   
    <div class="form">
      <h2>Search</h2>
      <form class="search-form" @submit=${submitHandler}>
        <input
          type="text"
          name="search"
          id="search-input"
        />
        <button class="button-list">Search</button>
      </form>
    </div>
    ${isResult && result(data)}
</section>
`
const result = (fruits) => html`
<h4>Results:</h4>
<div class="search-result">
${fruits.length === 0 ? html `<p class="no-result">No result.</p>`
                      : fruits.map((fr)  => fruitCard(fr))}
                      
</div>`;


const fruitCard = (data) =>                      
html `
    <div class="fruit">
        <img src=${data.imageUrl} alt="example1" />
        <h3 class="title">${data.name}</h3>
        <p class="description">${data.description}</p>
        <a class="details-btn" href="/details/${data._id}">More Info</a>
   </div>`;

function submitHandler(event){
    event.preventDefault();
    debugger
    const formData = new FormData(event.target);
    const search = formData.get('search');

    if (!search) {
        return window.alert('Query is undefined')
    }

   searchManager(search);
}

let context = null;

async function searchManager(search){
   if (search) {
       const data = await dataService.searchFruit(search);
       return context.render(searchTemplate(data, true));
   }
   
   context.render(searchTemplate());

}

export function showSearch(ctx){
    context = ctx;
    searchManager();
}