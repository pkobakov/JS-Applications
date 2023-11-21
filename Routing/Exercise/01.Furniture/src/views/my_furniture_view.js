import { html,render } from "../../node_modules/lit-html/lit-html.js";
import { get } from "../api.js";
import { userData } from "../user-data-helper.js";


const root = document.querySelector('.container');

function furnitureTemplate(data){
    return html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>My Furniture</h1>
            <p>This is a list of your publications.</p>
        </div>
    </div>
    <div class="row space-top">
         ${data.map(item => cardTemplate(item))}
    </div>
    `;
}

function cardTemplate(item){
    return html`
    <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src=${item.img} />
                            <p>${item.description}</p>
                            <footer>
                                <p>Price: <span>${item.price} $</span></p>
                            </footer>
                            <div>
                                <a href="/details/${item._id}" class="btn btn-info">Details</a>
                            </div>
                    </div>
                </div>
            </div>
    `
}

export async function loadMyFurniture(){
    const userId = userData.getUserId();
    const data = await get(`data/catalog?where=_ownerId%3D%22${userId}%22`);
    
    render(furnitureTemplate(data), root);
} 