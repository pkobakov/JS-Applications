import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { get, put } from '../api.js';
import page from '../../node_modules/page/page.mjs';

const root = document.querySelector('.container');

function editTemplate(item, error){
    return html `
    <div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${submitHandler}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control ${!!error ? error.make ? "is-invalid" : "is-valid": ""}" id="new-make" type="text" name="make" value="${item.make}">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control ${!!error ? error.model ? "is-invalid" : "is-valid": ""}" id="new-model" type="text" name="model" value="${item.model}">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control ${!!error ? error.year ? "is-invalid" : "is-valid": ""}" id="new-year" type="number" name="year" value="${item.year}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control ${!!error ? error.description ? "is-invalid" : "is-valid": ""}" id="new-description" type="text" name="description" value="${item.description}">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control ${!!error ? error.price ? "is-invalid" : "is-valid": ""}" id="new-price" type="number" name="price" value="${item.price}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control ${!!error ? error.img ? "is-invalid" : "is-valid": ""}" id="new-image" type="text" name="img" value="${item.img}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" value="${item.material}">
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>
    `;
}

let id = '';
export async function loadEdit(context){
    id = context.params.id;
    const data = await get(`data/catalog/${id}`);
    render(editTemplate(data), root); 
}

async function submitHandler(event){
    event.preventDefault();

    const formData = new FormData(event.target);
   
    const error = {}; 
    let hasError = false;
    const {make, model, year, description, price, img, material} = Object.fromEntries(formData);

    if (make.length < 4) {
        error.make = true;
        hasError = true;
    }

    if (model.length < 4) {
        error.model = true;
        hasError = true;
    }

    if (Number(year) <= 1950 || Number(year) >= 2050) {
        error.year = true;
        hasError = true;
    }

    if (description.length < 10) {
        error.description = true;
        hasError = true;
    }

    if (Number(price) <= 0) {
        error.price = true;   
        hasError = true;
    }

    if (!img) {
        error.img = true;
        hasError = true;
    }

    const data = {
        make,
        model,
        year,
        description,
        price,
        img, 
        material 
    }

    if (hasError) {
        return render(editTemplate(data, error), root)
    }
   
   await put(`data/catalog/${id}`, data);
   page.redirect('/');
}
    