const home = document.getElementById('home-view');
const main = document.getElementById('main');

export function showHome(){
   main.replaceChildren(home);
}