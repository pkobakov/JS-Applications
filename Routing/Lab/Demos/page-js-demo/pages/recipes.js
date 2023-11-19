import{html,render} from '../node_modules/lit-html/lit-html.js';

const root = document.getElementById('root');

async function getRecipes(){
    return await fetch('http://localhost:3030/data/recipes', {
        method: 'get',
    }).then(response => response.json());
}

function recipesTemplate(recipes){
    return html`
    <section style="display: flex; justify-content: space-around;">
        ${recipes.map(
            recipe => html`
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${recipe.img}" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">${recipe.name}</h5>
                  <p class="card-text">${recipe.ingredients.join(', ')}</p>
                  <a href="${`recipes/${recipe._id}`}" class="btn btn-primary">View More</a>
                </div>
            </div>
            `
        )}
    </section>
    `;
}
export async function loadRecipes(){
    await getRecipes().then(recipes => {
        render(recipesTemplate(recipes), root);
    })
}