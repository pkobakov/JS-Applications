import { createIdea } from "../api/data.js";
import { userInfo } from "../api/user_helper.js";

const create = document.getElementById('create-view');
const form = create.querySelector('form');
form.addEventListener('submit', onSubmit);

let context = null;

export function showCreate(ctx){
  context = ctx;
  context.renderer(create);
}

async function onSubmit(event){
    event.preventDefault();
debugger
    const formData = new FormData(event.target);

    const{title, description, imgURL} = Object.fromEntries(formData);

    if (title.length < 6 || description.length < 10 || imgURL < 5){
      return alert('Invalid Input!');
    }
    const userId = userInfo('get')._id;
    const img = imgURL
    createIdea ({title, description, img, userId});
    form.reset();
    context.goTo('/');

} 