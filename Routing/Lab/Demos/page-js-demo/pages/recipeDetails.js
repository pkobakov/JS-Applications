import{html,render} from '../node_modules/lit-html/lit-html.js';

const root = document.getElementById('root');

async function getRecipe(id){
    return await fetch(`http://localhost:3030/data/recipes/${id}`, {
        method: 'get',
    }).then(response => response.json());
}

function recipeTemplate(recipe){ 

    return html`
            <div class="card" style="width: 18rem;>
                <div class="card-body">
                  <h5 class="card-title">${recipe.name}</h5>
                  <p class="card-text">${recipe.ingredients.join(', ')}</p>
                </div>
            </div>
    `;
}
export async function loadRecipe(context, next){
    await getRecipe(context.params.recipeId).then(recipe => {
        render(recipeTemplate(recipe), root)});

        debugger
}