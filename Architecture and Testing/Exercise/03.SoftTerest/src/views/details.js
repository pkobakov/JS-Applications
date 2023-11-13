const details = document.getElementById('home-view');
const main = document.getElementById('main');

export function showDetails(){
   main.replaceChildren(details);
}