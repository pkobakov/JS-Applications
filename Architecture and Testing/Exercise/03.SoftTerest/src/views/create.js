const create = document.getElementById('create-view');
const main = document.getElementById('main');

export function showCreate(){
   main.replaceChildren(create);
}